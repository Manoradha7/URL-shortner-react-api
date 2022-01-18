import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

// form validation using yup
const formValidationSchema = yup.object({
  //validate email field
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    //.matches(!/^[A-Z0-9._%+-]+@[A-Z0-9+=]+\.[A-Z]{2,}$/i, "Pattern not matched")
    .required("Email is required"),

  // validte password field
  password: yup
    .string()
    .min(8, "Password must be 8 character")
    .max(12, "Too much Password")
    .required("Password is required"),
});

//signin
export function Signin() {
  const history = useHistory();

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      // give initial value as empty
      initialValues: { email: "", password: "" },
      //  validation
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Login(values);
      },
    });

  const URL = `http://localhost:8000`;
  const Login = async (values) => {
    await fetch(`${URL}/users/signin`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response)=>{
      console.log(response.status)
      if(response.status === 200){
      history.push('/dashboard')
    }})
  };
  return (
    <div className="signin-signup">
      <div className="app-title">
            <h1 className="app-name">URL SHORTNER</h1>
            <span>➖➖➖☢➖➖➖</span>
            <p>Share Links,Boost contents,Track Results</p>
        </div>
      <form className="signin-signup-form" onSubmit={handleSubmit}>
        <header className="login-header">Sign in</header>
        <TextField
          id="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email && touched.email}
          type="email"
          label="E-mail"
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
        <Button
          type="submit"
          value="signin"
          className="btn"
          variant="contained"
        >
          <LoginIcon /> Sign in
        </Button>
        <Button varient="text" onClick={() => history.push("/forgotpassword")}>
          Forget password?
        </Button>
        {/* <p className="social-text">---Or Sign in with Social platforms---</p>
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
        <p> Not a member?</p>
        <Button
          type="submit"
          value="signin"
          className="btn"
          onClick={() => history.push("/signup")}
          variant="contained"
        >
          <PersonAddAltIcon /> Sign up
        </Button>
      </form>
    </div>
  );
}
