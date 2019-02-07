import React, { Component } from 'react'
import GoogleApiWrapper from './GoogleApiWrapper'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import {
  Container,
  Divider,
  Modal,
  Header,
  Link,
  Image,
  Grid,
  Form,
  Segment,
  Icon,
  Button,
  Message
} from 'semantic-ui-react'
import dataService from './services/Data'
import AddMenu from './components/AddMenu'
import AddRouting from './components/AddRouting'
import LoginForm from './LoginForm'
import CreateForm from './CreateForm'
import travelService from './services/travels'
import loginService from './services/login'
import Notification from './Notification'

const inlineStyle = {
  modal: {
    marginTop: '-250px',
    display: 'fixed !important'
  }
}

export class App extends Component {
  state = {
    user: null,
    username: '',
    password: '',
    color: '',
    message: ''
  }

  handleFieldChange = event => {
    console.log('here')
    this.setState({ [event.target.name]: event.target.defaultValue })
  }
  componentDidMount = async () => {
    /*const data = await blogService.getAll()
    const blogs = data
      .sort(compare)
      .map(blog =>
        <Blog
          key={blog.id}
          id={blog.id}
          user={blog.user}
          likes={blog.likes}
          author={blog.author}
          title={blog.title}
          url={blog.url}
        />
      )

    this.setState({ blogs })*/

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      travelService.setToken(user.token)
    }
  }

  logout = () => () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.notify(`${this.state.user.username} logged out succesfully!`, 'green')
    this.setState({ user: null })
  }

  notify = (message, color) => {
    this.setState({ message, color })
    setTimeout(() => {
      this.setState({
        message: null,
        color: null
      })
    }, 2000)
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.setState({ username: '', password: '', user: user })
      this.notify(`${this.state.user.username} logged in succesfully!`, 'green')
    } catch (exception) {
      console.log(exception)
      this.notify('invalid username or password!', 'red')
    }
  }

  render() {
    console.log(this.state.username, this.state.password)
    return (
      <Router>
        {/*this.state.user !== null ? (
          <GoogleApiWrapper
            apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
            language={'en'}
          />
        ) : (
          <div>
            <Notification
              message={this.state.message}
              color={this.state.color}
            />
            <LoginForm
              onSubmit={this.login}
              handleChange={this.handleFieldChange}
              username={this.state.username}
              password={this.state.password}
            />
          </div>
        )*/}

        <Container>
          <Route exact path='/' render={() => <Redirect to='/login' />} />
          <Route
            path='/login'
            render={() => (
              <LoginForm
                onSubmit={this.login}
                handleChange={this.handleFieldChange}
                username={this.state.username}
                password={this.state.password}
              />
            )}
          />
          <Route path='/create' render={() => <CreateForm />} />
        </Container>
      </Router>
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
