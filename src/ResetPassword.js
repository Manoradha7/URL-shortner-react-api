import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be 8 Character")
    .max(12, "Too Much Password")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

export function ResetPassword() {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { password: "", passwordConfirmation: "", token: id },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Changepassword(values);
        console.log("onSumit", values);
      },
    });

  const URL = `https://url--shortner--app.herokuapp.com`;
  const Changepassword = async (values) => {
    fetch(`${URL}/users/resetpassword`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.status)
      .then((status) => (status === 200 ? history.push("/successMessage") : null));
  };
  return (
    <div className="signin-signup">
        <div className="app-title">
            <h2 className="app-name">URL SHORTNER</h2>
            <span>➖➖➖☢➖➖➖</span>
            <p>Share Links,Boost contents,Track Results</p>
        </div>
      <form className="signin-signup-form" onSubmit={handleSubmit}>
        <header className="login-header">Reset Password</header>
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
        <Button
          type="submit"
          value="signin"
          className="btn"
          variant="contained"
        >
          <LoginIcon />
          Submit
        </Button>
      </form>
    </div>
  );
}
