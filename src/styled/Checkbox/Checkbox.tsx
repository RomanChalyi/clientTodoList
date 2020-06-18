import React from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  className?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  onChange,
  className,
  checked,
}) => (
  <>
    <input
      onChange={onChange}
      type="checkbox"
      id={id}
      className={className}
      checked={checked}
    />
    <label htmlFor={id} />
  </>
);

export default Checkbox;
