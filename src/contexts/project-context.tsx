import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';
import type { AxiosResponse, AxiosError } from 'axios';

import axios from '../services/api';
import ws from '../services/websocket';

interface IProjectProviderProps {
  children: ReactNode;
}

interface IRoleProjectProps {
  id: string;
  slug: string;
}

interface IProjectProps {
  id: string;
  title: string;
  my_role: IRoleProjectProps;
  allow_exec: boolean;
}

export interface ICardProps {
  id: string;
  title: string;
  created_at: string;
}

export interface IListProps {
  id: string;
  title: string;
  create_cards: boolean;
  cards?: ICardProps[];
}

interface IApiErrorResponse {
  field: string;
  message: string;
}

interface IContextProps {
  getCurrentProject: (projectId: string) => void;
  addNewList: (title: string) => void;
  addNewCard: (title: string) => void;
  project: IProjectProps;
  lists: IListProps[];
}

const ProjectContext = createContext({} as IContextProps);

function ProjectProvider({ children }: IProjectProviderProps) {
  const [project, setProject] = useState({} as IProjectProps);
  const [lists, setLists] = useState([] as IListProps[]);

  function addCardInList(card: ICardProps) {
    const alreadyExists = lists[0].cards?.find((item) => item.id === card.id);

    if (alreadyExists) return;

    const findList = lists.find((list) => list.create_cards === true);
    findList?.cards?.push(card);

    const newBoard = Object.assign(lists, findList);

    setLists([...newBoard]);
  }

  function listenWebsocketEvents(channel: any) {
    channel.on('new:card', addCardInList);
  }

  function connectWebsocket() {
    const channel = `projectRoom:${project.id}`;
    const projectRoom = ws.getSubscription(channel) || ws.subscribe(channel);
    listenWebsocketEvents(projectRoom);
  }

  useEffect(() => {
    if (project) connectWebsocket();
  }, [project]);

  async function getCurrentProject(projectId: string) {
    const response = await axios.get(`projects/${projectId}`);

    setLists(response.data.lists);
    setProject({ ...response.data, lists: undefined });
  }

  async function addNewList(title: string) {
    try {
      const response: AxiosResponse<IListProps> = await axios.post('projects/lists', {
        title,
        project_id: project.id,
      });

      setLists([...lists, response.data]);
    } catch (_error) {
      const { response }: AxiosError<IApiErrorResponse[]> = _error;

      toast.error(response?.data[0].message);
    }
  }

  async function addNewCard(title: string) {
    await axios.post('/projects/lists/cards', {
      title,
      project_id: project.id,
    });
  }

  return (
    <ProjectContext.Provider value={{
      getCurrentProject,
      addNewList,
      addNewCard,
      project,
      lists,
    }}
    >
      { children }
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;

export const useProject = () => useContext(ProjectContext);
