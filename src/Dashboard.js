import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useState } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const formValidationSchema = yup.object({
  longUrl: yup.string().required("Required Field"),
  customUrl: yup
    .string()
    .matches(/^[A-Za-z0-9 ]+$/, "Special Characters Not Allowed")
    .min(5, "Minimum 5 Characters Required"),
});

export function Dashboard() {
  const URL = `https://url--shortner--app.herokuapp.com`;
  const [count, setCount] = useState(0);
  const [shortUrl, setShortUrl] = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //to copy the Shorten Url
  const [text, setText] = useState("Copy");
  const copy = () => {
    setTimeout(() => {
      setText("Copy");
    }, 1000);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { longUrl: "", customUrl: "" },
      validationSchema: formValidationSchema,
      onSubmit: (urlData) => {
        createUrl(urlData)}
    });

    const createUrl = (urlData)=>{
      fetch(`${URL}/url/createUrl`,{
        method:'POST',
        body: JSON.stringify(urlData),
      headers: { "Content-Type": "application/json" },
      }).then(getUrl());
    }

    const getUrl = ()=>{
      fetch(`${URL}/url/urldata`,{
        method:'GET'
      }).then((data)=>data.json())
      .then(a=>setShortUrl(a.shortUrl))
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="url-input">
          <TextField
            type="text"
            className="input"
            variant="outlined"
            label="Paste The URL"
            name="longUrl"
            id="longUrl"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.longUrl && touched.longUrl}
            value={values.longUrl}
            helperText={errors.longUrl && touched.longUrl && errors.longUrl}
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
      </form>
      <div className="url-input2">
        <div className="short-url">
          <TextField
            
            variant="outlined"
            label="Short Url"
            color="warning"
            className="input"
            type="text"
            value={shortUrl}
            readOnly
            placeholder="Short Url"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
      {count && (
        <div className="url-input">
          <TextField
            type="text"
            label="Custom URL"
            className="input"
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
    </div>
  );
}
