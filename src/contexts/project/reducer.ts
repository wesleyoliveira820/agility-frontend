import produce from 'immer';

import {
  addCardInListLabel,
  addListInBoardLabel,
  loadingProjectLabel,
  progressLoadingProjectLabel,
  setupProjectLabel,
} from './constants';

import { ActionProps, ActionsFN, StateProps } from './types';

function setupProject(state: StateProps, action: ActionProps): StateProps {
  const {
    id, title, my_role, lists,
  } = action.payload;

  return {
    ...state,
    progress: 100,
    lists,
    project: {
      id, title, my_role,
    },
  };
}

function loadingProject(state: StateProps, action: ActionProps): StateProps {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

function progressLoadingProject(state: StateProps, action: ActionProps): StateProps {
  return {
    ...state,
    progress: action.payload.progress,
  };
}

function addCardInList(state: StateProps, action: ActionProps): StateProps {
  return produce(state, (draft) => {
    draft.lists[0].cards?.push(action.payload);
  });
}

function addListInBoard(state: StateProps, action: ActionProps): StateProps {
  return produce(state, (draft) => {
    draft.lists.push(action.payload);
  });
}

const actions: ActionsFN = {
  [setupProjectLabel]: setupProject,
  [loadingProjectLabel]: loadingProject,
  [progressLoadingProjectLabel]: progressLoadingProject,
  [addCardInListLabel]: addCardInList,
  [addListInBoardLabel]: addListInBoard,
};

function projectReducer(state: StateProps, action: ActionProps): StateProps {
  if (!actions[action.type]) return state;
  return actions[action.type](state, action);
}

export { projectReducer };
