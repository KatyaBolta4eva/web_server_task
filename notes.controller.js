const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString(),
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2), 'utf8');
    console.log(chalk.default.green('Note was added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.default.bgBlue('Here is the list of notes:'))

    notes.forEach(note => {
        console.log(chalk.default.blue(`${note.id} ${note.title}`));
    })
}

async function removeNoteById(id) {
    const notes = await getNotes();
    const initialLength = notes.length;

    const filteredNotes = notes.filter(note => note.id !== id);


    if (initialLength === filteredNotes.length) {
        console.log(chalk.default.red(`Note with id ${id} not found!`));
        return false;
    }


    await fs.writeFile(notesPath, JSON.stringify(filteredNotes, null, 2), 'utf8');
    console.log(chalk.default.yellow(`Note with id ${id} was removed!`));
    return true;
}


async function updateNoteById(id, newTitle) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        console.log(chalk.default.red(`Note with id ${id} not found!`));
        return false;
    }

    notes[noteIndex].title = newTitle;

    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2), 'utf8');
    console.log(chalk.default.green(`Note with id ${id} was updated!`));
    return true;
}


module.exports = {
    addNote, removeNoteById, getNotes, updateNoteById
}

