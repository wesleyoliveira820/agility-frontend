import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { createContext } from 'use-context-selector';

import api from '../../services/api';
import ws from '../../services/websocket';
import { getToken } from '../../utils/auth-methods';

import {
  addCardInListAction,
  addListInBoardAction,
  loadingProjectAction,
  progressLoadingProjectAction,
  setupProjectAction,
} from './actions';

import { projectReducer } from './reducer';

import {
  Card,
  List,
  Params,
  ProjectProviderProps,
  StateProps,
} from './types';

const intialState = {
  isLoading: true,
  progress: 0,
} as StateProps;

const ProjectContext = createContext(intialState);

let wsConnected = false;

function ProjectProvider({ children }: ProjectProviderProps) {
  const { projectId } = useParams<Params>();
  const [state, dispatch] = useReducer(projectReducer, intialState);

  async function getCurrentProject() {
    dispatch(progressLoadingProjectAction(20));

    const response = await api.get(`/projects/${projectId}`);
    dispatch(setupProjectAction(response.data));

    setTimeout(() => {
      dispatch(loadingProjectAction(false));
    }, 800);
  }

  function listenWebsocketEvents(channel: any) {
    ws.on('open', () => {
      wsConnected = true;
    });

    ws.on('close', () => {
      wsConnected = false;
    });

    channel.on('new:list', (list: List) => dispatch(addListInBoardAction(list)));
    channel.on('new:card', (card: Card) => dispatch(addCardInListAction(card)));
  }

  function connectWebsocket() {
    const token = getToken();

    ws.withJwtToken(token).connect();

    const channel = `projectRoom:${state.project.id}`;
    const projectRoom = ws.getSubscription(channel) || ws.subscribe(channel);

    listenWebsocketEvents(projectRoom);
  }

  useEffect(() => {
    getCurrentProject();
  }, []);

  useEffect(() => {
    if (!state.project?.id) return;

    connectWebsocket();

    return () => {
      if (wsConnected) ws.close();
    };
  }, [state.project]);

  return (
    <ProjectContext.Provider value={state}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectContext, ProjectProvider };
