import React, { Component, createContext, useContext, useEffect, useState } from 'react'

/* Context API : The Context api is a built-in react feature that allows you to pass
data through the component tree without having to manually pass props down through 
every level. We create an AuthContext specifically for authentication because the user's 
login status is a piece of data that many different components often need.
*/

// Create a new context object this will be used to provide and consume the auth state
const AuthContext=createContext(null)

export const Auth = ({ children }) => {
    // useState to manage the user state
    const [user, setUser] = useState(null)

    /* useEffect to run once while reloading to check for a 
     logged-in user in local storage
    */
    useEffect(() => {
        const loggedInUser = localStorage.getItem("currentUser")
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser))
        }
    }, []) // empty dependencies to ensure that the effect only runs once 

    // The login function. It takes user data, sets the state and saves the user to localstorage
    const login = (userData) => {
        // A simple login function that saves the user to local storage
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('currentUser');
    }

    //the register function. It takes new user data. 
    //checks for an existing user, and saves the new user to local storage 
    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const userExists = users.find(u => u.username === userData.username)
        if (userExists) {
            return { success: false, message: "Username already exists." }
        }
        users.push(userData)
        localStorage.setItem('users', JSON.stringify(users))
        return { success: true, message: "User registered successfully" }
    }

    // The props of AuthContext.Provider makes the user state and functions available
    //to all child Component
    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)



