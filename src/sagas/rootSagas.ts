import { all } from "redux-saga/effects";
import watchTodoTask from "./todoTasks";
import authorizationWatch from "./authorization";

export default function* rootSaga() {
  yield all([watchTodoTask(), authorizationWatch()]);
}
