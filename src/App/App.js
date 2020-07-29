import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
// import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import NotesContext from '../NotesContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };




    componentDidMount() {
        console.log('compDidMount ran');
        // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
        fetch('http://localhost:9090/folders')
            .then(res => res.json())
            .then(data => this.setState({
                folders: data
            }))
            .catch(err => console.log(err.message))

        fetch('http://localhost:9090/notes')
            .then(res => res.json())
            .then(data => this.setState({
                notes: data
            }))
            .catch(err => console.log(err.message))
    }

    deleteNote = noteId => {
        const newNotes = this.state.notes.filter(note =>
            note.id !== noteId
        )
        this.setState({
            notes: newNotes
        })
    }


    renderNavRoutes() {
        console.log('renderNav ran');
        const { notes, folders } = this.state;


        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        console.log('renderMain ran');
        const { notes } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        console.log('render ran');
        return (

            <div className="App">
                <NotesContext.Provider value={
                    {deleteNotes:this.deleteNotes, 
                    notes: this.state.notes, 
                    folders: this.state.folders }}>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </NotesContext.Provider>
            </div>

        );
    }
}

export default App;
