import React from 'react'
import { Link } from 'react-router-dom'

const CreateForm = () => {
  return (
    <div>
      Create an account!
      <Link to={'/login'}>Return</Link>
    </div>
  )
}

export default CreateForm
