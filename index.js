const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
    {
        'id': 1,
        'content': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        'important': true,
        'date': '2023-07-22T06:52:49.432Z'
    },
    {
        'id': 2,
        'content': 'comprar cosas',
        'important': false,
        'date': '2023-07-22T06:52:49.432Z'
    },
    {
        'id': 3,
        'content': 'aprender react',
        'important': true,
        'date': '2023-07-24T06:52:49.432Z'
    },
]

app.get('/notes', (reques, response) => {
    response.send(notes)
})

app.get('/notes/important', (request, response) => {
    const notesImportants = notes.filter(note => note.important === true)
    console.log(notesImportants)
    if(notesImportants){
        response.send(notesImportants)
    }else{
        response.status(400).end()
    }
})

app.get('/notes/:id', (request, response) => {
    const id =Number(request.params.id)
    const showNotes = notes.find(note => note.id === id)
    if(showNotes){
        response.json(showNotes)
    } else {
        response.status(404).end()
    }
})

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/notes', (request, response) => {
    const note = request.body
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important:  note.important !== undefined ? note.important : false,
        date: new Date().toISOString()
    }
    notes = [newNote, ...notes]
    response.json(newNote)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Port running on port ${PORT}`)
})
