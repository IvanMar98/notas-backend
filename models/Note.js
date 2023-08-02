const mongoose = require('mongoose')
const {  Schema, model } = mongoose

/* creamos un nuevo schema para las notas es decir que campos y de que tipo deben tener las colecciones de datos */
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

/* Con el schema que se ha definido, creamos un model,
    al cual le pasaremos el nombre del modelo que por regla general debe ser en plurar es decir Note => Notes
    tambien le pasaremos el squema que debe segur
    Un modelo es una clase que podremos utilizar despues crear instancias de esa clase*/
const Note = model('Notes', noteSchema)

/* Note.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
}) */

/* const note = new Note({
    content: 'Mi primer nota guardada en mongodb',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(error => {
        console.error(error)
    }) */

module.exports = Note