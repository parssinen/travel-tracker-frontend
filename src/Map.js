import React from 'react'
import Logout from './Logout'
import GoogleApiWrapper from './GoogleApiWrapper'

const Map = () => (
  <div>
    <GoogleApiWrapper
      apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
      language={'en'}
    />
    <Logout />
  </div>
)

export default Map
