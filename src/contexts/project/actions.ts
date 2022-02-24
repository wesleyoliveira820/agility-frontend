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
  Card,
  getProjectResponse,
  List,
  MoveCardProps,
} from './types';

export function setupProjectAction(project: getProjectResponse): ActionProps {
  return {
    type: setupProjectLabel,
    payload: project,
  };
}

export function loadingProjectAction(isLoading: boolean): ActionProps {
  return {
    type: loadingProjectLabel,
    payload: {
      isLoading,
    },
  };
}

export function progressLoadingProjectAction(progress: number): ActionProps {
  return {
    type: progressLoadingProjectLabel,
    payload: {
      progress,
    },
  };
}

export function addCardInListAction(card: Card): ActionProps {
  return {
    type: addCardInListLabel,
    payload: card,
  };
}

export function addListInBoardAction(list: List): ActionProps {
  return {
    type: addListInBoardLabel,
    payload: list,
  };
}

export function moveCardAction({ from_list, to_list, card_id }: MoveCardProps): ActionProps {
  return {
    type: moveCardLabel,
    payload: {
      from_list,
      to_list,
      card_id,
    },
  };
}
