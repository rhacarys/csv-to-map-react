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

export default function PaperTextAndButtons({onSubmit, onInputChange, onHistoryClick}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} elevation={0} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Caminho do Arquivo CSV"
        inputProps={{ 'aria-label': 'caminho do arquivo csv' }}
        name="url"
        onChange={onInputChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="upload" title="Enviar">
        <CloudUpload />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="history" title="Ver histórico" onClick={onHistoryClick}>
        <History />
      </IconButton>
    </Paper>
  );
}

const { func } = PropTypes
PaperTextAndButtons.propTypes = {
  onSubmit: func.isRequired,
  onInputChange: func.isRequired,
  onHistoryClick: func.isRequired
}