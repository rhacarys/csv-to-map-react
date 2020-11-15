import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core'
import { CloudUpload, History } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    backgroundColor: theme.palette.background.default,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/**
 * Formulary with a text field, a submit button and a hystory button.
 */
export default function PaperTextAndButtons({onSubmit, onInputChange, onHistoryClick, data}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} elevation={0} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="CSV File Path"
        inputProps={{ 'aria-label': 'csv file path' }}
        name="url"
        onChange={onInputChange}
        value={data}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="send" title="Send">
        <CloudUpload />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="show history" title="Show History" onClick={onHistoryClick}>
        <History />
      </IconButton>
    </Paper>
  );
}

const { func, string } = PropTypes
PaperTextAndButtons.propTypes = {
  /**
   * Function to handle form submit event.
   */
  onSubmit: func.isRequired,
  /**
   * Function to handle textfield change event.
   */
  onInputChange: func.isRequired,
  /**
   * Function to handle history button click event.
   */
  onHistoryClick: func.isRequired,
  /**
   * Initial value of the textfield.
   */
  data: string
}