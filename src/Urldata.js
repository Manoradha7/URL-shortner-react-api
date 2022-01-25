import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

export function Urldata() {
  const URL = `https://url--shortner--app.herokuapp.com`;
//   const { data, setData } = useState("");

  const getUrl = () => {
    fetch(`${URL}/url/urldata`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((a) => console.log(a));
  };
  // eslint-disable-next-line
  useEffect(getUrl, []);
  return (
    <div className="card-container">
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography component="p">Total click :</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ShortUrl :
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            LongUrl :
          </Typography>
        </CardContent>
        F{" "}
      </Card>
    </div>
  );
}
