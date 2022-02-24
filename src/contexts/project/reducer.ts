import produce from 'immer';

import {
  addCardInListLabel,
  addListInBoardLabel,
  loadingProjectLabel,
  moveCardLabel,
  progressLoadingProjectLabel,
  setupProjectLabel,
} from './constants';

import {
  ActionProps,
  ActionsFN,
  MoveCardProps,
  StateProps,
} from './types';

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

function moveCard(state: StateProps, action: ActionProps<MoveCardProps>): StateProps {
  return produce(state, (draft) => {
    const { from_list, to_list, card_id } = action.payload;

    const fromListIndex = draft.lists.findIndex((list) => list.id === from_list.list_id);
    const toListIndex = draft.lists.findIndex((list) => list.id === to_list.list_id);

    const card = draft.lists[fromListIndex].cards?.find((item) => item.id === card_id);

    if (!card) return;

    draft.lists[fromListIndex].cards?.splice(from_list.position, 1);
    draft.lists[toListIndex].cards?.splice(to_list.position, 0, card);
  });
}

const actions: ActionsFN = {
  [setupProjectLabel]: setupProject,
  [loadingProjectLabel]: loadingProject,
  [progressLoadingProjectLabel]: progressLoadingProject,
  [addCardInListLabel]: addCardInList,
  [addListInBoardLabel]: addListInBoard,
  [moveCardLabel]: moveCard,
};

function projectReducer(state: StateProps, action: ActionProps): StateProps {
  if (!actions[action.type]) return state;
  return actions[action.type](state, action);
}

export { projectReducer };
