import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { DataContext } from '../containers/data-context'
import './map.css'

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      center: [-56, -14.5]
    }
    this.handleMap = this.handleMap.bind(this) 
  }
  
  componentDidMount(){
    const { container, style, zoom, accessToken } = this.props
    const { center } = this.state
    this.handleMap(container, style, center, zoom, accessToken)
  }

  handleMap(container, style, center, zoom, accessToken){
    mapboxgl.accessToken = accessToken
    const map = new mapboxgl.Map({
      container: container,
      style: style,
      center: center,
      zoom: zoom
    })
    this.setState({
      map: map
    })
    this.context.map = map
  }

  render(){
    const { container, classNameStyle } = this.props
    return(
      <div id={container} className={classNameStyle} />
    )
  }
}

Map.contextType = DataContext

const { string, number } = PropTypes
Map.propTypes = {
  container: string.isRequired,
  style: string.isRequired,
  classNameStyle: string.isRequired,
  zoom: number.isRequired,
  accessToken: string.isRequired
}
export default Map