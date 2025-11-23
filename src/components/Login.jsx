import React, { useState } from 'react'
import { useAuth } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the default form submission submission
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      login(user)
      alert("Login successful!")
      navigate('/') // Redirect to home or dashboard after login
    }
    else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className='m-5'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-5 gap-4 bg-green-300 mx-auto rounded-2xl max-w-[600px]'>
        <h2 className='font-sans text-2xl font-bold'>Login</h2>
        <input type='text' value={username} placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-2 bg-gray-200 rounded-md border border-gray-300'></input>
        <input type='password' value={password} placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 bg-gray-200 rounded-md border border-gray-300'></input>
        <button type='submit'
          className='text-sm bg-green-500 text-white px-4 py-2 rounded-full'>
          Login
        </button>
        <p className='text-white'>Don't have an account?
          <a href='/register' className='text-blue-500 underline'>
          </a></p>
        {error && <p className='text-red-700'>{error}</p>}
      </form>
    </div>
  )
}

export default Login