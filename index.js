const express = require('express')
const fs = require('fs')
const busboy = require('busboy')

const app = express()

app.use(express.static('public'))

app.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) => file.pipe(fs.createWriteStream(`files/${info.filename}`)))

    bb.on('finish', () => res.send('uploaded\n'))

    req.pipe(bb)
})

app.get('/download/:file', (req, res) => {
    fs.createReadStream(`files/${req.params.file}`).pipe(res)
})

app.listen(8080, () => console.log('upload server is up'))