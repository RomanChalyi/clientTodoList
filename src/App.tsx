import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import Title from "styled/Title";
import Router from "Router";
import { Loader } from "styled";
import { PageHeader } from "components";
import "styles/global.scss";
import { SOCKET_PATH } from "constant";

export const socket = socketIOClient(SOCKET_PATH);

const App: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Router />
      <Loader />
      <Title title="version: 0.0.0" />
    </>
  );
};

export default App;
