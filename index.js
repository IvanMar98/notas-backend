require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

require('./mongo') // importando la conexion a mongo

app.use(cors())
app.use(express.json())

const Note = require('./models/Note')

app.get('/notes', (reques, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/notes/important', (request, response) => {
    
    Note.find({important: true}).then(notes => {
        if(notes){
            response.json(notes)
        }else{
            response.status(400).end()
        }
    })
})

app.get('/notes/:id', (request, response, next) => {
    const id = request.params.id

    Note.findById(id).then(note => {
        if(note){
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        next(error)
    })
})

app.delete('/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndRemove(id).then(result => {
        response.json(result)
    }).catch(error => {
        next(error)
    })
})

app.post('/notes', (request, response) => {
    const note = request.body

    if(!note.content){
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const newNote = Note({
        content: note.content,
        important:  note.important || false,
        date: new Date()
    })

    newNote.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/notes/:id', (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        date: new Date(),
        important: note.important || false
    }
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true}).then(result => {
        response.json(result)
    }).catch(error => {
        next(error)
    })
})
app.use((error, request, response) => {
    response.status(404).end()
})

app.use((error, request, response, next) => {
    console.error(error)
    if(error.name === 'CastError'){
        response.status(400).send({error: 'id used is malformed'})
    }else {
        response.status(500).end()
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Port running on port ${PORT}`)
})
