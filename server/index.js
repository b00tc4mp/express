import 'dotenv/config'
import express from 'express'
import busboy from 'busboy'
import logic from './logic/index.js'

const { PORT } = process.env

const server = express()

server.use(express.static('public'))

server.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) =>
        logic.saveFile(file, info.filename, error => {
            if (error) {
                res.status(500).json({ error: 'SystemError', message: error.message })

                return
            }

            res.status(201).send('file uploaded')
        }))

    // bb.on('error', error => res.status(500).json({ error: 'SystemError', message: error.message }))

    req.pipe(bb)
})

server.get('/download/:file', (req, res) => {
    logic.loadFile(req.params.file, (error, file) => {
        if (error) {
            res.status(500).json({ error: 'SystemError', message: error.message })

            return
        }

        file.pipe(res)
    })
})

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))