import React, { Component } from 'react'
import GoogleApiWrapper from './GoogleApiWrapper'
import { Segment, Embed, List, Header, Card, Menu, Dropdown, Grid, Container, Image, Flag, Icon, Item } from 'semantic-ui-react'
import LoginForm from './LoginForm'
//import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom'

export class App extends Component {
  state = {
    loggedIn: true
  }

  render() {
    return (
      this.state.loggedIn ?
          <GoogleApiWrapper apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE' language={'en'} />
        : <LoginForm />
    )
  }
}

export default App
