import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { todoTasks, statuses } from "reducers";
import { History } from "history";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    todoTasks,
    statuses,
  });
export default createRootReducer;
