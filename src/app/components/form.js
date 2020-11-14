import React from 'react'
import { LinearProgress } from '@material-ui/core'
import config from '../../config'
import { DataContext } from '../containers/data-context'
import MapController from '../controllers/map-controller'
import PaperTextAndButtons from './paper-text-and-buttons'
import PaperSelectAndButtons from './paper-select-and-buttons'
import Toast from './toast'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      url: '', 
      selected: '', 
      history: false, 
      loading: false,
      alert: undefined,
      message: ''
    }
  }
  
  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alert: undefined })
  };

  startLoading() {
    this.setState({ loading: true })
  }

  stoptLoading(status, message) {
    this.setState({ 
      loading: false,
      alert: status, 
      message: message
    })
  }

  showHistory = () => {
    this.startLoading()

    fetch(config.API_FILES_ENDPOINT, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.data) {
          this.setState({ history: true })
          this.setState({ data: result.data })
          this.stoptLoading('info', `${result.data.length} records found on history`)
        } else {
          this.stoptLoading('info', 'The history is empty')
        }
      })
      .catch(error => this.stoptLoading('error', `An error has occurred: ${error.message}`) );
  }

  hideHistory = () => {
    this.setState({ history: false })
  }

  fetchOne = (id) => {
    this.startLoading()

    fetch(`${config.API_FILES_ENDPOINT}/${id}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.data && result.data.points) {
          const markers = MapController.updateMarkers(
            this.context.map,
            result.data.points,
            this.state.markers
          )
          this.setState({markers: markers})
          this.stoptLoading('success', 'The markers have been updated!')
        } else {
          this.stoptLoading('warning', 'The requested record was not found')
        }
      })
      .catch(error => this.stoptLoading('error', `An error has occurred: ${error.message}`) );
  }

  handleSelect = (event) => {
    if (event.target.value && event.target.value.id) {
      this.fetchOne(event.target.value.id)
    }
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    this.startLoading()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams()
    urlencoded.append('url', this.state.url)

    fetch(config.API_FILES_ENDPOINT, {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result && result.data && result.data.points) {
          const markers = MapController.updateMarkers(
            this.context.map,
            result.data.points,
            this.state.markers
          )
          this.setState({markers: markers})
          this.stoptLoading('success', 'The data has been sent successfully and the markers updated!')
        } else {
          this.stoptLoading(result.status, result.message)
        }
      })
      .catch(error => this.stoptLoading('error', `An error has occurred: ${error.message}`) );

    event.preventDefault()
  }

  render() {
    return (
      <div>  
        { !this.state.history ? 
          <PaperTextAndButtons 
            onSubmit={this.handleSubmit} 
            onInputChange={this.handleInputChange}
            onHistoryClick={this.showHistory}
            data={this.state.url}
          /> : 
          <PaperSelectAndButtons 
            onSelect={this.handleSelect} 
            onCloseClick={this.hideHistory} 
            closeButton="Close History"
            data={this.state.data}
          />
        }
        { this.state.loading && <LinearProgress color="secondary" /> }
        { 
          this.state.alert && 
          <Toast severity={this.state.alert} 
            message={this.state.message}
            closeHandle={this.handleCloseAlert} /> 
        }
      </div>
    );
  }
}

Form.contextType = DataContext

export default Form