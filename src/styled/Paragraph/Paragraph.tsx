import React from "react";
import cx from "classnames";
import { margin } from "./paragraph.module.scss";

interface Paragraph {
  text: string;
  className?: string;
}

const Paragraph: React.FC<Paragraph> = ({ text, className }) => (
  <p className={cx(margin, className)}>{text}</p>
);

export default Paragraph;
