import React from 'react'
import PaperTextAndButtons from './paper-text-and-buttons'
import PaperSelectAndButtons from './paper-select-and-buttons'
import config from '../../config'
import { DataContext } from '../containers/data-context'
import MapController from '../controllers/map-controller'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { url: '', selected: '', history: false }
  }

  showHistory = () => {
    fetch(config.API_FILES_ENDPOINT, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.data) {
          this.setState({ history: true })
          this.setState({ data: result.data })
        }
      })
      .catch(error => console.log('error', error));
  }

  hideHistory = () => {
    this.setState({ history: false })
  }

  fetchOne = (id) => {
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
        }
      })
      .catch(error => console.log(error));
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
        if (result && result.data && result.data.points) {
          const markers = MapController.updateMarkers(
            this.context.map,
            result.data.points,
            this.state.markers
          )
          this.setState({markers: markers})
        }
      })
      .catch(error => console.log(error));

    event.preventDefault()
  }

  render() {
    return (
      !this.state.history ? 
        <PaperTextAndButtons 
          onSubmit={this.handleSubmit} 
          onInputChange={this.handleInputChange}
          onHistoryClick={this.showHistory} 
        /> : 
         <PaperSelectAndButtons 
          onSelect={this.handleSelect} 
          onCloseClick={this.hideHistory} 
          closeButton="Fechar histórico"
          data={this.state.data}
        />
    );
  }
}

Form.contextType = DataContext

export default Form