class Note {

    title; // note title
    noteText; // note text
    color; // note bg color
    pinned; // is pinned on top of noteslist
    creationDate; // date when note was created
    reminderDate; // date when note should be reminded
    tags; // array of notes tags 

    constructor(newNote = { title, noteText, color: "#eee", pinned: false, reminderDate, tags: [] }) {
        this.title = newNote.title;
        this.noteText = newNote.noteText;
        this.color = newNote.color;
        this.pinned = newNote.pinned;
        this.creationDate = Date.now();
        this.reminderDate = newNote.reminderDate;
        this.tags = newNote.tags;
    }
}

class NotesList {

    notes; // array of all notes [type: Note[]]
    rootElement; // element where all notes will be drawn

    constructor() {
        this.notes = [];
        this.rootElement = document.getElementById('notes');
    }

    createNote(newNote = { title, noteText, color: "#eee", pinned: false, reminderDate, tags: [] }) {
        const createdNote = new Note(newNote);
        this.notes.push(createdNote);
        this.drawNotes();
    }

    parseNote(note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;
        const tagsList = note.tags.split(' ');
        let parsedTags = '';
        tagsList.forEach(tag => parsedTags += `<span class="tag">${tag}</span>`)

        noteElement.innerHTML = `
                <h2 class="title">${note.title}</h2>
                <p class="body">${note.noteText}</p>
                <div class="tags">${parsedTags}</div>
            `;
        return noteElement;
    }

    drawNotes() {
        this.rootElement.innerHTML = '';
        this.notes.filter(n => n.pinned == true).forEach(note => {
            this.rootElement.appendChild(this.parseNote(note));
        });
        this.notes.filter(n => n.pinned == false).forEach(note => {
            this.rootElement.appendChild(this.parseNote(note));
        });
    }
}

const notesList = new NotesList();

document.getElementById('create-new-note').addEventListener('click', () => {
    const newNoteTitle = document.getElementById('new-note-title').value;
    const newNoteBody = document.getElementById('new-note-body').value;
    const newNoteColor = document.getElementById('new-note-color').value;
    const newNotePinned = document.getElementById('new-note-pinned').checked;
    const newNoteReminder = document.getElementById('new-note-reminder').value;
    const newNoteTags = document.getElementById('new-note-tags').value;

    notesList.createNote({
        title: newNoteTitle,
        noteText: newNoteBody,
        color: newNoteColor,
        pinned: newNotePinned,
        reminderDate: newNoteReminder,
        tags: newNoteTags
    })
});