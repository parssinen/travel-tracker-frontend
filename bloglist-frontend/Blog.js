import React from 'react'
import blogService from '../../src/services/travels'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.likes,
      open: false
    }
  }

  likeBlog = async () => {
    const id = this.props.id
    const update = {
      user: this.props.user.id,
      likes: this.props.likes + 1,
      author: this.props.author,
      title: this.props.title,
      url: this.props.url
    }

    await blogService.update(id, update)
    this.setState({ likes: this.state.likes + 1 })
    window.location.reload()
  }

  removeBlog = async () => {
    if (window.confirm(`delete blog ${this.props.title}?`)) {
      await blogService.remove(this.props.id)
      window.location.reload()
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 6,
      paddingLeft: 3,
      border: 'solid',
      borderWidth: 1.5,
      marginBottom: 5,
      paddingBottom: 3
    }

    return (
      <div onClick={() => { this.setState({ open: !this.state.open }) }} style={blogStyle}>
        <div style={{ fontWeight: "bold" }}>{this.props.author} : {this.props.title}</div>
        {this.state.open ?
          <div>
            <div>{this.props.url}</div>
            <div>{this.props.likes} likes <button onClick={() => { this.likeBlog() }}>like</button></div>
            <div>added by {this.props.user.name}</div>
            {this.props.user.username === JSON.parse(window.localStorage.getItem('loggedInUser')).username ?
              <button onClick={() => { this.removeBlog() }}>delete</button> : null}
          </div> : null}
      </div>
    )
  }
}

export default Blog
