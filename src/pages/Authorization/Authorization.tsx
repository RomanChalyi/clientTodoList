import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "action";
import { Message } from "styled";
import {
  authorization,
  authorizationWrapp,
  input,
  title,
  inputGroup,
  submitButton,
  errorMessage,
} from "./authorization.module.scss";

interface AuthorizationProps {
  isSignIn?: Boolean;
}

const Authorization: React.FC<AuthorizationProps> = ({ isSignIn }) => {
  const dispatch = useDispatch();
  const SignUpValidation = Yup.object().shape({
    login: Yup.string().email("Invalid login").required("Required field"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must be 40 characters or less.")
      .required("Required field"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Password confirm is required"),
  });

  const SignInValidation = Yup.object().shape({
    login: Yup.string().email("Invalid login").required("Required field"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must be 40 characters or less.")
      .required("Required field"),
  });

  const initialValues = isSignIn
    ? { login: "", password: "" }
    : { login: "", password: "", passwordConfirm: "" };

  return (
    <div className="content">
      <div className={authorizationWrapp}>
        <Formik
          initialValues={initialValues}
          validationSchema={isSignIn ? SignInValidation : SignUpValidation}
          onSubmit={(values, { resetForm }) => {
            dispatch(isSignIn ? signIn(values) : signUp(values));
            resetForm({});
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {() => (
            <Form className={authorization}>
              <h1 className={title}>
                {isSignIn ? "Sign In Form" : "Sign Up Form"}
              </h1>
              <div className={inputGroup}>
                <Field
                  className={input}
                  type="login"
                  name="login"
                  placeholder="Login"
                />
                <ErrorMessage
                  className={errorMessage}
                  name="login"
                  component="p"
                />
              </div>
              <div className={inputGroup}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={input}
                />
                <ErrorMessage
                  className={errorMessage}
                  name="password"
                  component="p"
                />
              </div>
              {!isSignIn && (
                <div className={inputGroup}>
                  <Field
                    className={input}
                    type="password"
                    name="passwordConfirm"
                    placeholder="Repeat password"
                  />
                  <ErrorMessage
                    className={errorMessage}
                    name="passwordConfirm"
                    component="p"
                  />
                </div>
              )}

              <Field
                className={submitButton}
                type="submit"
                name={isSignIn ? "Sign In" : "Sign Up"}
                value={isSignIn ? "Sign In" : "Sign Up"}
              />
            </Form>
          )}
        </Formik>
      </div>
      <Message />
    </div>
  );
};

export default Authorization;
