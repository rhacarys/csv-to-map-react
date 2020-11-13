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
    this.handleFlyToAPosition = this.handleFlyToAPosition.bind(this)
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

/*E finalmente a função que vai fazer esse 'flyTo', ela apenas pega as informações que jogamos no estado e executa
a ação, veja que aqui precisamos usar a constante 'map', pois quando voce usa o metodo 'new mapboxgl.Map'
somente essa constante possui os metodos para lidarmos com ações no mapa, por isso jogamos ela no estado para nao ficarmos gerando objetos globais.*/  
  handleFlyToAPosition(){
    const { center, map } = this.state
    map.flyTo({
      center: center
    })
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