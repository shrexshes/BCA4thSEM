import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/Auth'

const Note = () => {
    const { user, login, logout } = useAuth()
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState({ title: '', content: '' })
    const [editingNote, setEditingNote] = useState(null)

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
                note.id === editingNote.id
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
        setNewNote({ title: note.title, content: note.content })
        setEditingNote(note)
    }

    const handleDelete=(id)=>{
        const updatedNotes=notes.filter(note=>note.id !==id) // ! ==
        saveNote(updatedNotes) 
    }

    const handleLogout=()=>{
        logout()
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Welcome ,{user?.username}</h2>

            <form className='flex items-center justify-center py-10 px-4'>
                <input type="text" placeholder='Title' value={ } onChange={ } className='w-full p-2 bg-gray-200 rounded-md border border-gray-300'></input>
                <textarea placeholder='contents' value={ } onChange={ }></textarea>
                <button type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default Note