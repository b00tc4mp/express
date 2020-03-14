const express = require('express')
const fs = require('fs')

const app = express()

app.get('/download/:file', (req, res) => {
    fs.createReadStream(`downloads/${req.params.file}`).pipe(res)
})

app.listen(8080)