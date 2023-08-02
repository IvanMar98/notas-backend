const mongoose = require('mongoose')

const connectingString = 'mongodb+srv://ivanmar:CAqriRAyrvbjGq1Z@cluster0.97imj8g.mongodb.net/'

mongoose.connect(connectingString) //devuelve una promesa
    .then(()=> {
        console.log('Database connected')
    }).catch(err => {
        console.error(err)
    })



