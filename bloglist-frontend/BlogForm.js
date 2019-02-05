import React from 'react'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title: <input
            name='newTitle'
            value={title}
            onChange={handleChange} />
        </div>
        <div>
          author: <input
            name='newAuthor'
            value={author}
            onChange={handleChange} />
        </div>
        <div>
          url: <input
            name='newUrl'
            value={url}
            onChange={handleChange} />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
