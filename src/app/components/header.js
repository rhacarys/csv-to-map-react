import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Form from './form'

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  }
}));

const Header = ({title}) => {
  const classes = useStyles();

  return(
    <AppBar>
      <Toolbar>
        <Typography variant="h6">
          {title}
        </Typography>
        <div className={classes.grow} />
        <Form />
      </Toolbar>
    </AppBar>
  )
}

const { string } = PropTypes
Header.propTypes = {
  title: string.isRequired
}

export default Header