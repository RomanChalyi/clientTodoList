import { all } from "redux-saga/effects";

import {
  watchLoadTasks,
  watchAddTask,
  watchDeleteTask,
  watchChangeTask,
  watchChangeVisibleTaskStatuses,
  watchDeleteCompletedTasks,
  watchUpdateTasks,
} from "./todoTasks";
import {
  watchSignUp,
  watchSignIn,
  watchLoadUserData,
  watchLogout,
} from "./authorization";

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
    watchLoadUserData(),
    watchLogout(),
    watchUpdateTasks(),
  ]);
}
