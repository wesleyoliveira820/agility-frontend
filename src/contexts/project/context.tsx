import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { createContext } from 'use-context-selector';

import api from '../../services/api';
import ws from '../../services/websocket';

import {
  addCardInListAction,
  addListInBoardAction,
  loadingProjectAction,
  moveCardAction,
  progressLoadingProjectAction,
  setupProjectAction,
} from './actions';

import { projectReducer } from './reducer';

import {
  Card,
  ContextProps,
  List,
  MoveCardProps,
  Params,
  ProjectProviderProps,
  StateProps,
} from './types';

const intialState = {
  isLoading: true,
  progress: 0,
} as StateProps;

const ProjectContext = createContext({} as ContextProps);

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
    channel.on('new:list', (list: List) => dispatch(addListInBoardAction(list)));
    channel.on('new:card', (card: Card) => dispatch(addCardInListAction(card)));
    channel.on('move:card', (newPos: MoveCardProps) => dispatch(moveCardAction(newPos)));
  }

  function connectWebsocket() {
    const channel = `projectRoom:${state.project.id}`;
    const projectRoom = ws.getSubscription(channel) || ws.subscribe(channel);

    listenWebsocketEvents(projectRoom);

    return projectRoom;
  }

  useEffect(() => {
    getCurrentProject();
  }, []);

  useEffect(() => {
    if (!state.project?.id) return;

    const channel = connectWebsocket();

    return () => {
      channel.close();
    };
  }, [state.project?.id]);

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectContext, ProjectProvider };
