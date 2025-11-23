import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { Auth } from './auth/Auth'
import Note from './components/Note'

function App() {
  return (
    <>
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Note />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </>
  )
}

export default App
