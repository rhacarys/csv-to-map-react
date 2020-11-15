import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Select, MenuItem, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

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
  }
}));

/**
 * Formulary with a selectable list and a close button.
 */
export default function PaperSelectAndButtons({onSelect, onCloseClick, closeButton, data}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      <Select 
        name="selected" 
        className={classes.input} 
        onChange={onSelect}
        defaultValue="none"
      >
        <MenuItem value="none" disabled >File History</MenuItem>
        { 
          data ? data.map((file) => 
            <MenuItem value={file} key={file.id}>{file.filename}</MenuItem>
          ) : ""
        }
      </Select>
      <IconButton 
        className={classes.iconButton} 
        aria-label="close" 
        title={closeButton} 
        onClick={onCloseClick}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}

const { string, func, array } = PropTypes
PaperSelectAndButtons.propTypes = {
  /**
   * Function to handle item selection event.
   */
  onSelect: func.isRequired,
  /**
   * Function to handle close button click event.
   */
  onCloseClick: func.isRequired,
  /**
   * Close button title.
   */
  closeButton: string,
  /**
   * Data to show in the list. The objects must have "id" and "filename" atributes.
   */
  data: array
}