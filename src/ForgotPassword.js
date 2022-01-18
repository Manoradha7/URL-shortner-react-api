import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

// validate form using yup
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});
// forgetpassword
export function ForgotPassword() {
  const history = useHistory();
  //
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        forgot(values);
        console.log("onSubmit", values);
      },
    });
  const URL = `http://localhost:8000`;
  const forgot = (values) => {
    fetch(`${URL}/users/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((response) =>{
      if(response.status===200){
        history.push("/mailsentmessage")
      }
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
        <header className="login-header">Forgot Password</header>
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
