import { ReactNode } from 'react';

export type Card = {
  id: string;
  title: string;
  position: number;
  created_at: string;
}

export type List = {
  id: string;
  title: string;
  create_cards: boolean;
  cards?: Card[];
}

type RoleProject = {
  id: string;
  slug: string;
}

export type Project = {
  id: string;
  title: string;
  my_role: RoleProject;
}

export type Params = {
  projectId: string;
}

export interface StateProps {
  project: Project;
  lists: List[];
  progress: number;
  isLoading: boolean;
}

export interface ActionProps<T = any> {
  type: string;
  payload: T;
}

export interface ProjectProviderProps {
  children: ReactNode;
}

export interface getProjectResponse extends Project {
  lists: List[];
}

export interface ActionsFN {
  [key: string]: (state: StateProps, action: ActionProps) => StateProps;
}

export interface ContextProps extends StateProps {
  dispatch: (action: ActionProps) => void;
}

type ListPosition = {
  list_id: string;
  position: number;
}

export interface MoveCardProps {
  from_list: ListPosition;
  to_list: ListPosition;
  card_id: string;
}
