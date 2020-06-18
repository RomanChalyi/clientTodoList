import React from "react";
import Title from "styled/Title";
import Router from "Router";
import { Loader } from "styled";
import { PageHeader } from "components";
import "styles/global.scss";

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
