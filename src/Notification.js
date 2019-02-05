import React from 'react'

const Notification = ({ message, color }) => {
  if (message) {
    return (
      <div className={color}>
        {message}
      </div>
    )
  }
  return null
}

export default Notification
