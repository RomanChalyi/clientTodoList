import { put, takeEvery, call, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  loadingStart,
  loadingEnd,
  showMessage,
  signInSuccess,
  loadUserDataSuccess,
  logoutSuccess,
} from "action";
import {
  SIGN_UP,
  SIGN_IN,
  LOGIN_PATH,
  LOAD_USER_PATH,
  AUTHENTICATION_PATH,
  LOGOUT_PATH,
  TOKEN_PATH,
  LOAD_USER_DATA,
  LOGOUT,
} from "constant";
import { callApi } from "utils";
import { socket } from "App";

interface onSignUpParams {
  type: string;
  payload: { login: string; password: string };
}

export function* watchResponse(
  url: string,
  option?: { method: string; body: any }
) {
  try {
    const response = yield call(callApi, url, option);
    if (response.status === 401) {
      const accessToken = window.localStorage.getItem("accessToken");
      const refreshToken = window.localStorage.getItem("refreshToken");

      if (refreshToken === null || accessToken === null) {
        throw Error("badToken");
      }

      const response = yield call(callApi, TOKEN_PATH, {
        method: "post",
        body: { refreshToken },
      });

      if (response.ok === false) {
        throw Error("badToken");
      }
      const token = yield response.json();
      window.localStorage.setItem("accessToken", token.accessToken);
      window.localStorage.setItem("refreshToken", token.refreshToken);
      const responseApi = yield call(callApi, url, option);

      const dataApi = yield responseApi.json();
      return dataApi;
    }

    const data = yield response.json();

    if (response.ok) {
      return data;
    }
  } catch (err) {
    if (err.message === "badToken") {
      yield all([put(push("/login/sign_in")), put(loadingEnd())]);
    } else {
      yield all([put(loadingEnd()), put(showMessage({ text: err.message }))]);
    }
  }
}

function* onSignUp(action: onSignUpParams) {
  try {
    yield put(loadingStart());
    const { login, password } = action.payload;

    yield call(callApi, LOGIN_PATH, {
      method: "post",
      body: { login, password },
    });

    yield all([put(loadingEnd()), yield put(push("/login/sign_in"))]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage({ text: err.message }))]);
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGN_UP, onSignUp);
}

function* onSignIn(action: onSignUpParams) {
  try {
    yield put(loadingStart());
    const { login, password } = action.payload;
    const response = yield call(callApi, AUTHENTICATION_PATH, {
      method: "post",
      body: { login, password },
    });

    if (!response.ok) {
      throw Error("Bad Request");
    }
    const data = yield response.json();

    yield all([put(loadingEnd()), put(signInSuccess(data)), put(push("/"))]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage({ text: err.message }))]);
  }
}

export function* watchSignIn() {
  yield takeEvery(SIGN_IN, onSignIn);
}

function* onLoadUserData() {
  try {
    yield put(loadingStart());
    const payload = yield watchResponse(LOAD_USER_PATH);
    if (payload) {
      socket.emit("user logged in", localStorage.getItem("accessToken"));
      yield all([put(loadingEnd()), put(loadUserDataSuccess(payload))]);
    }
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage({ text: err.message }))]);
  }
}

export function* watchLoadUserData() {
  yield takeEvery(LOAD_USER_DATA, onLoadUserData);
}

function* onLogout() {
  try {
    yield put(loadingStart());
    yield call(callApi, LOGOUT_PATH, {
      method: "post",
      body: { token: localStorage.getItem("refreshToken") },
    });
    localStorage.clear();

    yield all([
      put(loadingEnd()),
      put(logoutSuccess()),
      put(push("/login/sign_in")),
    ]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage({ text: err.message }))]);
  }
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, onLogout);
}
