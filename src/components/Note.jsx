import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'

const Note = () => {
    const { user, logout } = useAuth()
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState({ title: '', content: '' })
    const [editingNote, setEditingNote] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        //loads notes from local storage specific to the logged in user
        if (user) {
            const userNotes = JSON.parse(localStorage.getItem(`notes_${user.username}`)) || []
            setNotes(userNotes)
        }
    }, [user])

    // handle saving the note
    const saveNote = (updatedNotes) => {
        setNotes(updatedNotes)
        localStorage.setItem(`notes_${user.username}`, JSON.stringify(updatedNotes))
    }

    const handleCreateOrUpdateNote = (e) => {
        e.preventDefault()

        //check if we are editing an existing note
        if (editingNote) {
            // if `editingNote` exists , this is the update logic.
            //.map() creates a new array by iterating over the existing 'notes` array
            const updatedNotes = notes.map((note) => {
                return note.id === editingNote.id
                    //if true , it returns a new object . It copies the new title and content from newNote state
                    ? { ...newNote, id: editingNote.id } : note
            })
            saveNote(updatedNotes)
            setEditingNote(null) //reset editing state
        }
        else {
            // Creates a simple , unique id using the current timestamp
            const newId = Date.now()
            //creates a new array . It uses the spread operator to copy all existing notes
            const updatedNotes = [...notes, { ...newNote, id: newId }];
            saveNote(updatedNotes)
        }
        //reset newNote state to clear the form
        setNewNote({ title: '', content: '' })
    }

    const handleEdit = (note) => {
        setNewNote({ title: note.title || '', content: note.content || '' })
        setEditingNote(note)
    }

    const handleDelete = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id) // ! ==
        saveNote(updatedNotes)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Welcome ,{user?.username}</h2>
            <button onClick={handleLogout}
                className='px-4 py-2 bg-red-400 text-white'>Logout</button>

            <form onSubmit={handleCreateOrUpdateNote} className='flex items-center justify-center py-10 px-4'>
                <input type="text" placeholder='Title'
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className='w-full p-2 bg-gray-200 rounded-md border border-gray-300' required></input>

                <textarea placeholder='contents'
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    required></textarea>

                <button type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    {editingNote ? "Update Note" : "Add Note"}
                </button>

                {editingNote && <button type="button" onClick={() => setEditingNote(null)}>Cancel</button>}
            </form>


            <h3>Your Notes:</h3>
            <ui>
                {notes.map((note, index) => (
                    <li key={index} className='bg-gray-200 py-4 px-2 m-5 list-none rounded-md'>
                        <h4 className='text-2xl font-bold'>{note.title || "untitled"}</h4>
                        <p>{note.content}</p>
                        <button className='bg-blue-300 px-4 mx-2 py-2 rounded-full'
                            onClick={() => handleEdit(note)}>Edit</button>

                        <button className='bg-red-300 mx-2 px-4 py-2 rounded-full'
                            onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ui>
        </div >
    )
}

export default Note