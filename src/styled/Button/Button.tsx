import React from "react";

interface ButtonProps {
  text: string;
  className: string;
  id?: string;
  onClick(e: React.MouseEvent): void;
}

const Button: React.FC<ButtonProps> = ({ onClick, id, className, text }) => (
  <button id={id} className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;
