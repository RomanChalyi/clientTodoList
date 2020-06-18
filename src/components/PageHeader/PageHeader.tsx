import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "selectors";
import { Button } from "styled";
import { RootState } from "types";
import {
  pageHeader,
  link,
  title,
  linkGroup,
  userClass,
  btnLogOff,
  avatar,
} from "./pageHeader.module.scss";

const PageHeader: React.FC = () => {
  const user = useSelector((state: RootState) => getUser(state));
  const username = user.login.substring(0, 1);
  const handleClick = () => console.log("click");
  const renderAvatar = (
    <>
      <div className={userClass}>
        <div className={avatar}>
          <h4>{username}</h4>
        </div>
        <Button onClick={handleClick} className={btnLogOff} text="Log off" />
      </div>
    </>
  );
  const links = (
    <div className={linkGroup}>
      <Link className={link} to={"/login/sign_in"}>
        Sign In
      </Link>
      <Link className={link} to="/login/sign_up">
        Sign up
      </Link>
    </div>
  );

  return (
    <header className={pageHeader}>
      <h3 className={title}>Todo List</h3>
      {user.login ? renderAvatar : links}
    </header>
  );
};

export default PageHeader;
