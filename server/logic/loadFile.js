import fs from 'fs'

export default function loadFile(filename, callback) {
    if (typeof filename !== 'string') throw new TypeError('filename is not a string')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    try {
        const file = fs.createReadStream(`files/${filename}`)

        callback(null, file)
    } catch (error) {
        callback(error)
    }
}