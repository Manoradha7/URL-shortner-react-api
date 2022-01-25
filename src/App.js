import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { Dashboard } from "./Dashboard";
import { Message } from "./Message";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Urldata } from "./Urldata";


// const URL=`https://url--shortner--app.herokuapp.com`
function App() {
  return (
    <div className="App">
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/activationmessage">
            <Message msg="Account Activated" />
          </Route>
          <Route path="/resetpassword/:id">
            <ResetPassword />
          </Route>

          {/* dashboard */}
          <Route path="/dashboard">
            <Container />
            <Dashboard />
          </Route>
          <Route path="/urldata">
            <Container />
            <Urldata />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Container() {
  const history = useHistory();
  return (
    <div className="container">
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={() => history.push("/dashboard")} color="inherit">
              Home
            </Button>
            <Button onClick={() => history.push("/urldata")} color="inherit">
              URL
            </Button>
            <Button
              onClick={() => history.push("/")}
              color="inherit"
              style={{ marginLeft: "auto" }}
            >
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default App;



