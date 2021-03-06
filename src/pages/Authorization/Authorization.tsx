import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PageContainer } from "styled";
import { useDispatch } from "react-redux";
import { signIn } from "action";
import {
  form,
  input,
  title,
  inputGroup,
  submitButton,
  errorMessage,
} from "./authorization.module.scss";

const Authorization: React.FC = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    login: Yup.string().email("Invalid login").required("Required field"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must be 40 characters or less.")
      .required("Required field"),
  });

  const initialValues = { login: "", password: "" };

  return (
    <PageContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(signIn(values));
          resetForm({});
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form className={form}>
            <h1 className={title}>Sign In Form</h1>
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

            <Field
              className={submitButton}
              type="submit"
              name="Sign In"
              value="Sign In"
            />
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
};

export default Authorization;
