import * as React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
//snack bar
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const history = useHistory();
  // formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      //get initialvalues empty
      initialValues: {
        fname: "",
        lname:"",
        username:"",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      //validate the input
      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        Register(values)
        console.log("onSubmit", values);
      },
    });
    //url for backend
  const URL = `https://url--shortner--app.herokuapp.com`;

  const Register = async (values) => {
    await fetch(`${URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setMsg({
          Message: "Activation link sent to Your Mail",
          status: "success",
        });
        setTimeout(()=>history.push("/"),5000);
      } else {
        setMsg({ Message: "Credentials already exists", status: "error" });
      }
      setOpen(true);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Msg.status}
          sx={{ width: "100%" }}
        >
          {Msg.Message}
        </Alert>
      </Snackbar>
    </div>
  );
}
