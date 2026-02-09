const express = require('express');
const chalk = require('chalk')
const path = require('path');
const {addNote, getNotes, removeNoteById, updateNoteById} = require('./notes.controller')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true

    })
})

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.title;

    await updateNoteById(id, newTitle);

    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.delete('/:id', async (req, res) => {
    await removeNoteById(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false

    })
})

app.listen(port, () => {
    console.log(chalk.default.blue(`Server has been started on port ${port}...`))
})