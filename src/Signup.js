import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useHistory } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useFormik } from "formik";
import * as yup from "yup";

// validate form
const formValidationSchema = yup.object({
  // validate first name
  fname: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Name is Required"),
    // validate last name
  lname: yup
  .string()
  .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
  .max(40)
  .required("Name is Required"),
  // validate first name
  username: yup
    .string()
    // .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Name is Required"),
  // validate email
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  // validate password
  password: yup
    .string()
    .min(8, "Password must be 8 Character")
    .max(12, "Too Much Password")
    .required("Password is required"),
  // validate confirm password
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is Requred"),
});

export function Signup() {
  const history = useHistory();
  // formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        fname: "",
        lname:"",
        username:"",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Register(values).then( history.push("/signin"));
        console.log("onSubmit", values);
      },
    });
  const URL = `http://localhost:8000`;

  const Register = async (values) => {
    await fetch(`${URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="signin-signup">
        <div className="app-title">
            <h1 className="app-name">URL SHORTNER</h1>
            <span>➖➖➖☢➖➖➖</span>
            <p>Share Links,Boost contents,Track Results</p>
        </div>
      <form className="signin-signup-form" onSubmit={handleSubmit}>
        <header className="login-header">Sign Up</header>
        <div className="input">
        <TextField
          id="fname"
          name="fname"
          value={values.fname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fname && touched.fname}
          type="text"
          label="First name"
          variant="standard"
          helperText={errors.fname && touched.fname && errors.fname}
          required
        />
        <TextField
          id="lname"
          name="lname"
          value={values.lname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lname && touched.lname}
          type="text"
          label="Last name"
          variant="standard"
          helperText={errors.lname && touched.lname && errors.lname}
          required
        />
        <TextField
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username && touched.username}
          type="text"
          label="UserName"
          variant="standard"
          helperText={errors.username && touched.username && errors.username}
          required
        />
        <TextField
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email}
          type="email"
          label="Email"
          variant="standard"
          helperText={errors.email && touched.email && errors.email}
          required
        />
        <TextField
          id="password"
          name="password"
          value={values.password}
          error={errors.password && touched.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          label="Password"
          variant="standard"
          helperText={errors.password && touched.password && errors.password}
          required
        />
        <TextField
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          value={values.passwordConfirmation}
          error={errors.passwordConfirmation && touched.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Confirm Password"
          variant="standard"
          helperText={
            errors.passwordConfirmation &&
            touched.passwordConfirmation &&
            errors.passwordConfirmation
          }
          required
        />
        </div>
        <Button
          type="submit"
          value="signin"
          className="btn"
          variant="contained"
        >
          <PersonAddAltIcon /> Sign Up
        </Button>
        {/* <p className="social-text">---Or Sign up with Social platforms---</p>
        <div className="social-media">
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <FacebookOutlinedIcon />
          </Button>
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <GoogleIcon />
          </Button>
        </div> */}
        <p className="social-text">---Or Aldready Have an Account---</p>
        <Button
          type="submit"
          value="signin"
          className="btn"
          variant="contained"
          onClick={() => history.push("/signin")}
        >
          <LoginIcon /> Sign in
        </Button>
      </form>
    </div>
  );
}
