const express = require('express')
const busboy = require('busboy')

const logic = require('./logic')

const app = express()

app.use(express.static('public'))

app.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) =>
        logic.saveFile(file, info.filename, error => {
            if (error) {
                res.status(500).json({ error: 'SystemError', message: error.message })

                return
            }

            res.send()
        }))

    // bb.on('error', error => res.status(500).json({ error: 'SystemError', message: error.message }))

    req.pipe(bb)
})

app.get('/download/:file', (req, res) => {
    logic.loadFile(req.params.file, (error, file) => {
        if (error) {
            res.status(500).json({ error: 'SystemError', message: error.message })

            return
        }

        file.pipe(res)
    })
})

app.listen(8080, () => console.log('upload server is up'))