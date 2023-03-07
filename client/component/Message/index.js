import { Alert, Snackbar } from "@mui/material";
import React, { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  const [state, setState] = React.useState({
    open: false,
    message: "",
    severity: "success"
  });

  const { open, message, severity } = state;

  const handleClick = (message, severity) => {
    setState({ open: true, message, severity });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useImperativeHandle(ref, () => ({
    error: (message) => {
      handleClick(message, "error");
    },
    warning: (message) => {
      handleClick(message, "warning");
    },
    info: (message) => {
      handleClick(message, "info");
    },
    success: (message) => {
      handleClick(message, "success");
    }
  }));

  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
});
