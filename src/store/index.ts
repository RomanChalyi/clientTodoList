import createSagaMiddleware from "redux-saga";
import rootSaga from "sagas";
import { createStore, compose, applyMiddleware } from "redux";
import { createBrowserHistory, History } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./rootReducer";

export const history: History = createBrowserHistory();
export const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history))
  )
);

sagaMiddleware.run(rootSaga);

export default store;
