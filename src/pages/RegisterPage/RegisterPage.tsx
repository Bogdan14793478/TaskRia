import React from "react";
import backImg from "../../Image/backgroundForRegister.jpg";
import classes from "./styles.module.css";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Errors from "../../components/ErrorsForAuth/ErrorsForAuth";
import { passwordExp, setToStorage } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { AuthFormData } from "../../utils/interface";

const initialValues: AuthFormData = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Required"),
  password: Yup.string()
    .min(6, "It`s to short")
    .max(6, "It`s to lond")
    .matches(
      passwordExp,
      "Password length - 6, must have one Upper, lower case, number"
    )
    .required("Required"),
});

const RegisterPage = () => {
  let navigate = useNavigate();

  async function redirectToLoginPage() {
    navigate(`/login`);
  }

  async function startRegistr(values: AuthFormData) {
    const personInfo = JSON.stringify(values);
    setToStorage(personInfo, "isRegister");
    redirectToLoginPage();
  }

  const onSubmit = (
    values: AuthFormData,
    props: FormikHelpers<AuthFormData>
  ) => {
    startRegistr(values);
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
              <h3>Register</h3>

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
                Register
              </button>
              <button
                className={classes.redirectToLogin}
                onClick={redirectToLoginPage}
              >
                Redirect to Login page
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
