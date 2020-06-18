import React from "react";
import { useSelector } from "react-redux";
import { getLoading } from "selectors";
import { RootState } from "types";
import { loader, wrapper } from "./loader.module.scss";

const Loader: React.FC = () => {
  const loading = useSelector((state: RootState) => getLoading(state));
  if (!loading) {
    return null;
  }

  return (
    <div className={wrapper}>
      <div className={loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
