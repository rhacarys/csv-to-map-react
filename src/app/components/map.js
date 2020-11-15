import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { DataContext } from '../containers/data-context'
import './map.css'

/**
 * Component to render a simple map using mapbox-gl library.
 */
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      center: [-56, -14.5]
    }
    this.handleMap = this.handleMap.bind(this) 
  }
  
  componentDidMount(){
    const { container, mapStyle, zoom, accessToken } = this.props
    const { center } = this.state
    this.handleMap(container, mapStyle, center, zoom, accessToken)
  }

  handleMap(container, mapStyle, center, zoom, accessToken){
    mapboxgl.accessToken = accessToken
    const map = new mapboxgl.Map({
      container: container,
      style: mapStyle,
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
  /**
   * The map container id.
   */
  container: string.isRequired,
  /**
   * The style of the mapbox-gl map.
   * 
   * @see {@link https://docs.mapbox.com/help/glossary/style/}
   */
  mapStyle: string.isRequired,
  /**
   * The map container css class.
   */
  classNameStyle: string.isRequired,
  /**
   * The map initial zoom level
   */
  zoom: number.isRequired,
  /**
   * The mapbox-gl access token, required to render the map.
   * 
   * @see {@link https://docs.mapbox.com/help/glossary/access-token/}
   */
  accessToken: string.isRequired
}

export default Map