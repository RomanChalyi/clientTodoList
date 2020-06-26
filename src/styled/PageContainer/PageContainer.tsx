import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "selectors";
import { hideMessage } from "action";
import { RootState } from "types";
import { Message } from "styled";

const PageContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => getMessages(state));
  const onHideMessage = (id: string) => dispatch(hideMessage(id));

  return (
    <div className="content">
      <div className="g-container">{children}</div>
      <div
        style={{
          position: "fixed",
          bottom: "5px",
          left: "5px",
          zIndex: 2222,
        }}
      >
        {messages.map((message) => (
          <Message
            text={message.text}
            key={message.id}
            id={message.id}
            isError={message.isError}
            hideMessage={onHideMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default PageContainer;
