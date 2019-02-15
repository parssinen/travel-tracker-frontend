import React from 'react'
import Application from './Application'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { connect } from 'react-redux'
//import { anecdoteInitialization } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount() {
    //this.props.anecdoteInitialization()
  }

  render() {
    return (
      <Router>
        <Application />
      </Router>
    )
  }
}

export default connect(null /*,
  { anecdoteInitialization }*/)(App)
