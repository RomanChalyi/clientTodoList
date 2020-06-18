import { all } from "redux-saga/effects";

import {
  watchLoadTasks,
  watchAddTask,
  watchDeleteTask,
  watchChangeTask,
  watchChangeVisibleTaskStatuses,
  watchDeleteCompletedTasks,
} from "./todoTasks";
import { watchSignUp, watchSignIn } from "./authorization";

export default function* rootSaga() {
  yield all([
    watchLoadTasks(),
    watchAddTask(),
    watchDeleteTask(),
    watchChangeTask(),
    watchChangeVisibleTaskStatuses(),
    watchDeleteCompletedTasks(),
    watchSignUp(),
    watchSignIn(),
  ]);
}
