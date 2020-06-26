import React from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "styled";
import { noMatchPage, title, info, btn } from "./NoMatchPage.module.scss";

const NoMatchPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <div className={noMatchPage}>
        <h1 className={title}>Page not found!</h1>
        <p className={info}>
          Maybe the page you are looking for has been removed, or you typed in
          the wrong URL!
        </p>
        <Link className={btn} to="/">
          GO HOME
        </Link>
      </div>
    </PageContainer>
  );
};

export default NoMatchPage;
