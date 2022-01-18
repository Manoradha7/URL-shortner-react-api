import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";

export function Message({ msg }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(handleClickOpen, []);
  return (
    <div id="message">
      <Dialog open={open} keepMounted>
        <DialogTitle>
          Message <InfoIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{msg}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
