import React from 'react'
import { LinearProgress } from '@material-ui/core'
import config from '../../config'
import { DataContext } from '../containers/data-context'
import MapController from '../controllers/map-controller'
import PaperTextAndButtons from './paper-text-and-buttons'
import PaperSelectAndButtons from './paper-select-and-buttons'
import Toast from './toast'

/**
 * Component to handle with the backend api, submitting forms and retrieving data.
 */
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
  
  /**
   * Settes the alert state to undefined, witch closes the toast alert popup.
   */
  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alert: undefined })
  };

  /**
   * Shows the loading bar.
   */
  startLoading() {
    this.setState({ loading: true })
  }

  /**
   * Hides the loading bar and settes the alert message to show in the toast popup. 
   * Also opens the toast alert popup if the param status is not undefined.
   * 
   * @param status Alert severity to fire the toast alert popup. If undefined, the toast will not be fired.
   *               Expected: [undefined | 'success' | 'info' | 'warning' | 'error']
   * @param message The message to show in the toast alert popup.
   */
  stoptLoading(status, message) {
    this.setState({ 
      loading: false,
      alert: status, 
      message: message
    })
  }

  /**
   * Getts the hole history in the API and setts it in the state, witch opens the history select panel.
   */
  showHistory = () => {
    this.startLoading()

    fetch(config.API_FILES_ENDPOINT, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.data) {
          this.setState({ history: true, data: result.data })
          this.stoptLoading('info', `${result.data.length} records found on history`)
        } else {
          this.stoptLoading('info', 'The history is empty')
        }
      })
      .catch(error => this.stoptLoading('error', `An error has occurred: ${error.message}`) );
  }

  /**
   * Closes the history select panel.
   */
  hideHistory = () => {
    this.setState({ history: false })
  }

  /**
   * Fetches the full data of one history entry. Then, updates the markers on the map.
   * 
   * @param id The entry ID to fetch
   */
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

  /**
   * Handles the history item select event.
   */
  handleSelect = (event) => {
    if (event.target.value && event.target.value.id) {
      this.fetchOne(event.target.value.id)
    }
  }

  /**
   * Updates this component state with any onChange event.
   * 
   * @param event The onChange event with a target to update the component state.
   */
  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  /**
   * Sends the url of the csv file to the API. Then, updates the markers on the map if successful.
   * 
   * @param submit The submit event.
   */
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