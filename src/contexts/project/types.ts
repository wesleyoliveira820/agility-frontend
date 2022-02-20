import { ReactNode } from 'react';

export type Card = {
  id: string;
  title: string;
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

export interface ActionProps {
  type: string;
  payload?: any;
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
