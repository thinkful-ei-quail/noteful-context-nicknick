import React from 'react'

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    deleteNotes: () => {},
});

export default NotesContext;