import React from 'react'
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LoginForm = ({ onSubmit, handleChange, username, password }) => {
  return (
    <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Icon name='plane' /> Log in to account
          </Header>
          <Form
            onSubmit={onSubmit}
            size='large' /*loading success error field error*/
          >
            <Segment>
              <Form.Input
                fluid
                icon='user'
                name='username'
                iconPosition='left'
                placeholder='Username'
                value={username}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                name='password'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={handleChange}
              />
              <Button color='blue' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/create'>Create Account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}
export default LoginForm

/*import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      blogs: [],
      user: null,
      loginVisible: false,
      message: '',
      color: ''
    }
  }

    const data = await blogService.getAll()
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

    this.setState({ blogs })

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => this.setState({ [event.target.name]: event.target.value })

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user: user })
      this.notify(`${this.state.user.username} logged in succesfully!`, 'green')
    } catch (exception) {
      console.log(exception)
      this.notify('invalid username or password!', 'red')
    }
  }

  logout = () => () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.notify(`${this.state.user.username} logged out succesfully!`, 'green')
    this.setState({ user: null })
  }

  addBlog = () => () => {
    const newBlog = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
    blogService.create(newBlog)
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

  render() {
    return (
      <div>
        <h1>BLOG LIST</h1>
        <Notification message={this.state.message} color={this.state.color} />
        {this.state.user === null ?
          <div>
            <Togglable buttonLabel="login">
              <LoginForm
                onSubmit={this.login}
                handleChange={this.handleFieldChange}
                username={this.state.username}
                password={this.state.password} />
            </Togglable>
          </div> :
          <div>
            <h2>{this.state.user.username} logged in <button onClick={this.logout()}>logout</button></h2>
            <Togglable buttonLabel="new blog">
              <BlogForm
                onSubmit={this.addBlog()}
                handleChange={this.handleFieldChange}
                title={this.state.newTitle}
                author={this.state.newAuthor}
                url={this.state.newUrl} />
            </Togglable>
            <h2>Blogs</h2>
            {this.state.blogs}
          </div>}
      </div>
    )
  }
}

export default App
*/
