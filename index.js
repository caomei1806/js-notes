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
        if (newNote.pinned) this.notes.unshift(createdNote);
        else this.notes.push(createdNote);
        this.drawNotes();
    }

    deleteNote(deletedIndex) {
        console.log(deletedIndex)
        const newNoteList = this.notes.filter((n, index) => index != deletedIndex);
        this.notes = newNoteList;
        this.drawNotes();
    }

    parseNote(note, index) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;
        const noteBodyElement = document.createElement('div');
        noteBodyElement.classList.add('note-body-element');
        noteElement.appendChild(noteBodyElement);
        const tagsList = note.tags.split(' ');
        let parsedTags = '';
        tagsList.forEach(tag => parsedTags += tag ? '<span class="tag">' + tag + '</span>' : '');
        console.log(parsedTags)

        noteBodyElement.innerHTML = `
                <div class="reminder">
                    ${note.reminderDate ? '<span class="created">' + new Date(note.reminderDate).toLocaleDateString() + '</span>' : ''}
                    ${note.pinned ? '<span class="pinned"><i class="bx bxs-pin"></i></span>' : ''
            }
                </div>
                <h2 class="title">${note.title}</h2>
                <p class="body">${note.noteText}</p>
                <div class="tags">${parsedTags}</div>
                <button class="del-btn" onclick="notesList.deleteNote(${index})" style="background-color:${note.color}"><i class="bx bx-x"></i></button>
        `;
        return noteElement;
    }

    filterNotes() {
        const filterQuery = document.getElementById('note-search').value;
        const filteredNotes = this.notes.filter(n => n.title.search(filterQuery) > -1 || n.noteText.search(filterQuery) > -1 || n.tags.search(filterQuery) > -1);
        return filteredNotes;
    }

    drawNotes() {
        this.rootElement.innerHTML = '';
        this.filterNotes().forEach((note, i) => {
            this.rootElement.appendChild(this.parseNote(note, i));
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
    if (newNoteTitle != '') {
        document.getElementById('new-note-title').classList.remove("error");
        document.querySelector(".error-message").classList.remove("error-displayed");
        notesList.createNote({
            title: newNoteTitle,
            noteText: newNoteBody,
            color: newNoteColor,
            pinned: newNotePinned,
            reminderDate: newNoteReminder,
            tags: newNoteTags
        })
    } else {
        document.getElementById('new-note-title').classList.add("error");
        document.querySelector(".error-message").classList.add("error-displayed");
    }
});

document.getElementById('note-search').addEventListener('keyup', (e) => {
    notesList.drawNotes();
});