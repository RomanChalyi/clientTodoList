import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "selectors";
import { loadUserData, logout } from "action";
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
  const dispatch = useDispatch();
  const username = user.login && user.login.substring(0, 1);
  const handleClick = () => dispatch(logout());

  useEffect(() => {
    dispatch(loadUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAvatar = (
    <>
      <div className={userClass}>
        <div className={avatar}>
          <h4>{username}</h4>
        </div>
        <Button onClick={handleClick} className={btnLogOff} text="Logout" />
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
