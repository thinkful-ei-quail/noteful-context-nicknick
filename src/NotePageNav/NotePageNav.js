import { React, Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotesContext from '../NotesContext'
import { findNote, findFolder } from '../notes-helpers'

export default class NotePageNav extends Component {

  render() {

    const {notes, folders} = this.context


    const {noteId} = notes.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId)

    return (
      <div className='NotePageNav'>
        <NotesContext.Consumer>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => folders.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </NotesContext.Consumer>
      </div>
    )
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
