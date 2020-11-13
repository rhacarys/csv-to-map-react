import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from './app/themes'
import Home from './app/containers/home-container'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    )
  }
}