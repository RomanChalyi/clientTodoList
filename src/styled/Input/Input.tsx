import React, { useRef, useEffect } from "react";

interface InputProps {
  className?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void;
  value: string;
  placeholder?: string;
  onBlur?(): void;
  ref?: any;
  disabled?: boolean;
  tabIndex?: any;
}

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  onKeyDown,
  value,
  placeholder,
  onBlur,
  disabled,
  tabIndex,
}) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [disabled]);

  return (
    <input
      tabIndex={tabIndex || null}
      ref={inputRef}
      className={className}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default Input;
