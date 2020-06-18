import { put, takeEvery, call, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import jwt from "jsonwebtoken";
import { loadingStart, loadingEnd, showMessage, signInSuccess } from "action";
import {
  SIGN_UP,
  SIGN_IN,
  LOGIN_PATH,
  AUTHENTICATION_PATH,
  JWT_SECRET,
} from "constant";
import { callApi } from "utils";

interface onSignUpParams {
  type: string;
  payload: { login: string; password: string };
}

function* onSignUp(action: onSignUpParams) {
  try {
    yield put(loadingStart());
    const { login, password } = action.payload;

    yield call(callApi, LOGIN_PATH, {
      method: "post",
      body: {
        user: jwt.sign({ login, password }, JWT_SECRET),
      },
    });

    yield all([put(loadingEnd()), yield put(push("/login/sign_in"))]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err.message, true))]);
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGN_UP, onSignUp);
}

function* onSignIn(action: onSignUpParams) {
  try {
    yield put(loadingStart());
    const { login, password } = action.payload;

    const { payload } = yield call(callApi, AUTHENTICATION_PATH, {
      method: "post",
      body: { user: jwt.sign({ login, password }, JWT_SECRET) },
    });

    const userToken = jwt.verify(payload, JWT_SECRET);

    // window.localStorage.setItem("test", encode.);
    // setTimeout(() => {
    //   const time = Math.floor(Date.now() / 1000);
    //   console.log(time < encode.exp);
    // }, 2000);

    yield all([
      put(loadingEnd()),
      put(signInSuccess(userToken)),
      yield put(push("/")),
    ]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err.message, true))]);
  }
}

export function* watchSignIn() {
  yield takeEvery(SIGN_IN, onSignIn);
}
