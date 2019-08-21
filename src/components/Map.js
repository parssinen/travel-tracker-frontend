import React from 'react'
import GoogleMaps from './GoogleMaps'
import Logout from './Logout'

const Map = ({ logout }) => (
  <div>
    <GoogleMaps apiKey={process.env.REACT_APP_MAPS_API_KEY} language={'fi'} />
    <Logout logout={logout} />
  </div>
)

export default Map
