import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Errors from "../../components/ErrorsForAuth/ErrorsForAuth";
import backImg from "../../Image/backgroundForRegister.jpg";

import { getFromStorage, passwordExp, setToStorage } from "../../utils/helpers";
import { AuthFormData } from "../../utils/interface";

import classes from "./styles.module.css";

const initialValues: AuthFormData = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Required"),
  password: Yup.string()
    .min(6, "It`s too short")
    .max(6, "It`s too long")
    .matches(
      passwordExp,
      "Password length - 6, must have one uppercase, lowercase, number"
    )
    .required("Required"),
});

const LoginPage = () => {
  let navigate = useNavigate();

  function redirectToRegisterPage() {
    navigate(`/register`);
  }

  function redirectToMainPage() {
    navigate(`/home`);
  }

  function deepEqual(obj1: AuthFormData, obj2: string) {
    return JSON.stringify(obj1) === obj2;
  }

  function startLogin(values: AuthFormData) {
    const infoAboutRegister = getFromStorage("isRegister");
    let identity;
    if (!infoAboutRegister) {
      alert("You need to registry");
    }
    if (infoAboutRegister) {
      identity = deepEqual(values, infoAboutRegister);
    }
    if (identity) {
      setToStorage(true, "isAuth");
      redirectToMainPage();
    }
  }

  const onSubmit = (
    values: AuthFormData,
    props: FormikHelpers<AuthFormData>
  ) => {
    startLogin(values);
    props.resetForm();
  };

  return (
    <div className={classes.container}>
      <img src={backImg} alt="/" className={classes.backFont} />
      <div className={classes.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {({ errors, values, handleChange, isValid, dirty }) => (
            <Form>
              <h3>Login</h3>

              <label htmlFor="username">Name</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
              {!!errors.name && <Errors errors={errors.name} />}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={values.email}
                onChange={handleChange}
                required
              />
              {errors.email !== "Required" && <Errors errors={errors.email} />}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password !== "Required" && (
                <Errors errors={errors.password} />
              )}
              <div
                style={{ paddingTop: "20px", color: "red", fontSize: "20px" }}
              >
                {(errors.password === "Required" ||
                  errors.email === "Required") &&
                  "All fields must be filled"}
              </div>

              <button type="submit" disabled={!(isValid && dirty)}>
                Login
              </button>
              <button
                className={classes.redirectToLogin}
                onClick={redirectToRegisterPage}
              >
                Not register yet?
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
