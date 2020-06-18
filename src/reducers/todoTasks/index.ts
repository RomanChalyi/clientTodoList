import { ActionTypesTodoTasks, StateTodoTasks } from "types";
import { ALL, LOADING_TASKS_SUCCESS } from "constant";

import { onLoadingTasksSuccess } from "./reducers";

const initialState = {
  filter: window.localStorage.getItem("filter") || ALL,
  tasks: [],
  totalElements: 0,
  offset: "1",
  limit: "5",
};

export const todoTasks = (
  state: StateTodoTasks = initialState,
  action: ActionTypesTodoTasks
) => {
  switch (action.type) {
    case LOADING_TASKS_SUCCESS: {
      return onLoadingTasksSuccess(state, action);
    }

    default: {
      return state;
    }
  }
};
