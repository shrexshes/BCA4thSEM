import React, { useState } from 'react'
import { useAuth } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('') //to show error or success message
    const { register } = useAuth()
    const navigate=useNavigate();

    const handleRegister = (e) => {
        e.preventDefault() 
        const result = register({ username, password })
        if (result.success === true) {
            setMessage("Registration successful! redirecting to login..")
            navigate('/login')
        } else {
            setMessage(result.message)
        }
    }
    console.log(username)
    return (
        <div>
            <h3 className='text-3xl text-center'>Registration Form</h3>
            <form className='bg-black flex flex-col items-center gap-5 py-10 my-10'>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='px-10 py-2 bg-gray-200 rounded-md'
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='px-10 py-2 bg-gray-200 rounded-md'
                />
                {message && <p>{message}</p>}
                <button className='bg-green-300 py-2 px-4 rounded-full text-black' 
                 onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default Register