import React from 'react';
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    minWidth: 400
  },
}));

export default function Toast(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={props.timeout || 6000} onClose={props.closeHandle} className={classes.root}>
        <Alert onClose={handleClose} severity={props.severity} className={classes.alert}>
            {props.message}
        </Alert>
    </Snackbar>
  );
}

const { string, func } = PropTypes
Toast.propTypes = {
    message: string.isRequired,
    severity: string.isRequired,
    closeHandle: func.isRequired
}