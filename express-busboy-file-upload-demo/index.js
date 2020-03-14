const express = require('express')
const fs = require('fs')
const Busboy = require('busboy')

const app = express()

app.post('/upload', (req, res) => {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => file.pipe(fs.createWriteStream(`uploads/${filename}`)))

    busboy.on('finish', () => res.send('uploaded\n'))

    req.pipe(busboy)
})

app.listen(8080)