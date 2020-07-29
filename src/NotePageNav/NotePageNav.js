import  React  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
// import NotesContext from '../NotesContext'
// import { findNote, findFolder } from '../notes-helpers'

export default function NotePageNav(props)   {

  

  
    
    // const {notes, folders} = this.context
    // console.log(notes)
    // const {noteId} = notes.match.params;
    // const note = findNote(notes, noteId) || {};
    // const folder = findFolder(folders, note.folderId)

    return (
      <div className='NotePageNav'>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
          {props.folder && (
            <h3 className='NotePageNav__folder-name'>
              {props.name}
            </h3>
          )}
        
      </div>
    )
  
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
