import React from "react";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getShowMessage, getIsError, getMessage } from "selectors";
import { RootState } from "types";
import { Button } from "styled";
import {
  messageWrapp,
  message,
  iconInfo,
  deleteBtn,
  error,
  info,
} from "./message.module.scss";
import { hideMessage } from "action";

const Message: React.FC = () => {
  const showMessage = useSelector((state: RootState) => getShowMessage(state));
  const isError = useSelector((state: RootState) => getIsError(state));
  const MessageInfo = useSelector((state: RootState) => getMessage(state));
  const dispatch = useDispatch();
  const handleHideMessage = () => dispatch(hideMessage());

  if (!showMessage) {
    return null;
  }

  const iconElement = isError ? (
    <svg
      className={iconInfo}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
  ) : (
    <svg
      className={iconInfo}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
    </svg>
  );
  return (
    <div className={cx(messageWrapp)}>
      <div className={cx(message, { [error]: isError })}>
        {iconElement}
        <p className={info}>{MessageInfo}</p>
        <Button text="×" onClick={handleHideMessage} className={deleteBtn} />
      </div>
    </div>
  );
};

export default Message;
