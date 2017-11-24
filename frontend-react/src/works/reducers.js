import {SET_WORKS} from "./actions";

export const workReducers = (state = [], action) => {
  const filteredWorks = state.filter(work => {
    return action.works.filter(actionWork => actionWork.id === work.id).length === 0;
  });
  switch (action.type) {
    case SET_WORKS:
        return [...action.works, ...filteredWorks];
    default:
      return state;
  }
};
