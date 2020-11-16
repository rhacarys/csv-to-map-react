import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    minWidth: 400,
  },
}));

/**
 * Component to show alert messages on screen and auto hide after a while.
 */
export default function Toast(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={props.timeout || 6000}
      onClose={props.closeHandle}
      className={classes.root}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity}
        className={classes.alert}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}

const { string, number, func, oneOf } = PropTypes;
Toast.propTypes = {
  /**
   * Message to show.
   */
  message: string.isRequired,
  /**
   * Severity of the alert popup to define his color and icon.
   */
  severity: oneOf(["success", "info", "warning", "error"]),
  /**
   * Function to handle close toast event on toast timeout.
   */
  closeHandle: func.isRequired,
  /**
   * Toast timeout, in miliseconds. The default value is 6000.
   */
  timeout: number,
};
