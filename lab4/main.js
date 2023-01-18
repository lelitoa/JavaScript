import View from "./view.js";
import API from "./api.js";

export default class Main {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new View(root, this._handlers());
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = API.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "Title",
                    body: "Description"
                };

                API.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                API.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                    // color
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                API.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
