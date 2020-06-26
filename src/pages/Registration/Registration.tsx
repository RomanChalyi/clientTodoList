import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signUp } from "action";
import { PageContainer } from "styled";
import {
  form,
  input,
  formTitle,
  inputGroup,
  submitButton,
  errorMessage,
} from "./registration.module.scss";

const Registration: React.FC = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    login: Yup.string().email("Invalid login").required("Required field"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must be 40 characters or less.")
      .required("Required field"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Password confirm is required"),
  });

  const initialValues: {
    login: string;
    password: string;
    passwordConfirm: string;
  } = { login: "", password: "", passwordConfirm: "" };

  return (
    <PageContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { login, password } = values;
          dispatch(signUp({ login, password }));
          resetForm();
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form className={form}>
            <h1 className={formTitle}>Sign Up Form</h1>
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
            <Field
              className={submitButton}
              type="submit"
              name="Sign Up"
              value="Sign Up"
            />
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
};

export default Registration;
