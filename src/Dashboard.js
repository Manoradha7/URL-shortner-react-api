import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useState ,useEffect} from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";



const formValidationSchema = yup.object({
  url: yup.string().required("Required Field"),
  customUrl: yup
    .string()
    .matches(/^[A-Za-z0-9 ]+$/, "Special Characters Not Allowed")
    .min(5, "Minimum 5 Characters Required"),
});

export function Dashboard() {
  const URL = `https://url--shortner--app.herokuapp.com`;
  const [count, setCount] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [responseData, setResponseData] = useState(null);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const token = localStorage.getItem("token");

   // Snackbar
   const [Message, setMessage] = useState(""); // Server Message
   const [open, setOpen] = useState(false); // Snackbar Open/close status
 
   // Snackbar Open
   const handleClick = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };

  //to copy the Shorten Url
  const [text, setText] = useState("Copy");
  const copy = () => {
    setTimeout(() => {
      setText("Copy");
    }, 1000);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { url: "", customUrl: "" },
      validationSchema: formValidationSchema,
      onSubmit: (urlData) => {
        callDB(urlData);}
    });
    const getData = () => {
      fetch(`${URL}/users/getdata`, {
        method: "GET",
        headers: { "x-auth-token": token },
      })
        .then((responsebody) => responsebody.json())
        .then((data) => {
          // console.log(data);
          setResponseData(data);
        });
    };
  
    // eslint-disable-next-line
    useEffect(getData, []);

    // To create Short URL
  const getUrl = (userData) => {
    fetch(`${URL}/url`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((x) => {
        // console.log(x);
        setShortUrl(x.shortUrl);
        setMessage({ msg: x.Msg, result: "success" });
      })
      .catch((error) => setMessage({ msg: error.Msg, result: "error" }))
      .then(handleClick);
  };

    const callDB = (urlData) => {
      if (responseData) {
        const { email } = responseData;
        const { url, customUrl } = urlData;
        // console.log(email, url, customUrl);
        getUrl({ email, url, customUrl });
      }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="url-input">
            <TextField
              type="text"
              variant="outlined"
              label="Paste The URL"
              name="url"
              id="url"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.url && touched.url}
              value={values.url}
              className="input"
              helperText={errors.url && touched.url && errors.url}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ height: "3.5rem" }}
              color="primary"
            >
              Create
            </Button>{" "}
          </div>
          <div className="url-input2">
            <div className="short-url">
            <TextField
              variant="outlined"
              label="Short Url"
              color="warning"
              className="urlbox2"
              type="text"
              value={values.shortUrl}
              readOnly
              placeholder="Short Url"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Tooltip title={text}>
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(shortUrl);
                          setText((text) => text === "Copy" && "Copied");
                          copy();
                        }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                setShortUrl("");
              }}
            >
              Clear Data
            </Button>
            </div>
            <div>
              <Checkbox
                {...label}
                onChange={() => setCount((count) => !count)}
                className="customcheckbox"
              />{" "}
              {/* Checkbox */}
              <label className="checkboxtext">Create Custom URL </label>
            </div>
          </div>
        </div>
        {count && (
          <div className="url-input">
            <TextField
              type="text"
              label="Custom URL"
              className="urlbox2"
              placeholder="Custom URL"
              name="customUrl"
              id="customUrl"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.customUrl && touched.customUrl}
              value={values.customUrl}
              helperText={
                errors.customUrl && touched.customUrl && errors.customUrl
              }
            />
          </div>
        )}
      </form>
      {/* Snack Bar */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert severity={Message.result} sx={{ width: "100%" }}>
            {Message.msg}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});