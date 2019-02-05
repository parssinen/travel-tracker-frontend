import React from 'react'

const LoginForm = ({ onSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input
                        value={username}
                        onChange={handleChange}
                        name='username' />
                </div>
                <div>
                    password: <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange} />
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default LoginForm
