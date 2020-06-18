import React from "react";
import cx from "classnames";
import { blockTitle } from "./title.module.scss";

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <header className={cx(blockTitle, className)}>
      <h3>{title}</h3>
    </header>
  );
};

export default Title;
