import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import socketIOClient from "socket.io-client";
import { history } from "store";
import App from "App";
import store from "store";
import { SOCKET_PATH } from "constant";

export const socket = socketIOClient(SOCKET_PATH);

socket.on("update task", () => {
  console.log("++++");
});

socket.emit("user connected", localStorage.getItem("accessToken"));

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
