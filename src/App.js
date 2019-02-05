import React, { Component } from 'react'
import GoogleApiWrapper from './GoogleApiWrapper'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Divider } from 'semantic-ui-react'
import dataService from './services/Data'
import AddMenu from './components/AddMenu'
import AddRouting from './components/AddRouting'
import LoginForm from './LoginForm'

export class App extends Component {
  state = {
    loggedIn: true
  }

  render() {
    return this.state.loggedIn ? (
      <GoogleApiWrapper
        apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
        language={'en'}
      />
    ) : (
      <LoginForm />
    )
  }
}

/*class App extends Component {
  state = {
    english: false,
    data: {
      en: { bio: [], skills: [], experience: [] },
      fi: { bio: [], skills: [], experience: [] }
    }
  }

  async componentWillMount() {
    const data = await dataService.getData()
    this.setState({ data })
  }

  changeLanguage = () => this.setState({ english: !this.state.english })

  render() {
    return (
      <Router>
        <Container>
          <Divider hidden />
          <AddMenu en={this.state.english} change={this.changeLanguage} />
          <Divider hidden />
          <Divider hidden />
          <AddRouting en={this.state.english} data={this.state.data} />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </Container>
      </Router>
    )
  }
}*/

export default App
