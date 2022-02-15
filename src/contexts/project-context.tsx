import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

import axios from '../services/api';
import ws from '../services/websocket';

interface ProjectProviderProps {
  children: ReactNode;
}

interface RoleProjectProps {
  id: string;
  slug: string;
}

interface ProjectProps {
  id: string;
  title: string;
  my_role: RoleProjectProps;
  allow_exec: boolean;
}

export interface CardProps {
  id: string;
  title: string;
  created_at: string;
}

export interface ListProps {
  id: string;
  title: string;
  create_cards: boolean;
  cards?: CardProps[];
}

interface ApiErrorResponse {
  field: string;
  message: string;
}

interface IContextProps {
  getCurrentProject: (projectId: string) => void;
  addNewList: (title: string) => void;
  addNewCard: (title: string) => void;
  project: ProjectProps;
  lists: ListProps[];
  progress: number;
  isLoading: boolean;
}

const ProjectContext = createContext({} as IContextProps);

function ProjectProvider({ children }: ProjectProviderProps) {
  const [project, setProject] = useState({} as ProjectProps);
  const [lists, setLists] = useState([] as ListProps[]);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  function addCardInList(card: CardProps) {
    const alreadyExists = lists[0].cards?.find((item) => item.id === card.id);

    if (alreadyExists) return;

    const findList = lists.find((list) => list.create_cards === true);
    findList?.cards?.push(card);

    const newBoard = Object.assign(lists, findList);

    setLists([...newBoard]);
  }

  function addListInBoard(list: ListProps) {
    const findList = lists.find((item) => item.id === list.id);

    if (findList) return;

    const board = lists;

    board.push(list);

    setLists([...board]);
  }

  function listenWebsocketEvents(channel: any) {
    channel.on('new:card', addCardInList);
    channel.on('new:list', addListInBoard);
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

    setProgress(100);

    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }

  async function addNewList(title: string) {
    try {
      await axios.post('projects/lists', {
        title,
        project_id: project.id,
      });
    } catch (error: any) {
      const { response }: AxiosError<ApiErrorResponse[]> = error;

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
      progress,
      isLoading,
    }}
    >
      { children }
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;

export const useProject = () => useContext(ProjectContext);
