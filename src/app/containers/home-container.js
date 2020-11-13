import React, { Component } from 'react'
import Header from '../components/header'
import Map from '../components/map'
import { DataContext } from './data-context'


class Home extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render(){
    return(
      <DataContext.Provider value={{map: undefined}}>
        <div>
          <Header
            title='Cyan Challenge'
          />
          <Map
            container='map'
            style='mapbox://styles/mapbox/outdoors-v11'
            zoom={4}
            classNameStyle='mapContainer'
            accessToken='pk.eyJ1IjoicmhhY2FyeXMiLCJhIjoiY2toZXRtYnVrMGJrYzMwcGZjc253bm9nNCJ9.KVVmCmK7jRebcW5TTBZIyg'
          />
        </div>
      </DataContext.Provider>
    )
  }
}

export default Home