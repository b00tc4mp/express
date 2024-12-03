export default (text, files) => {
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!(files instanceof Array)) throw new TypeError('files is not an array')
    files.forEach(file => {
        if (typeof file !== 'string') throw new TypeError('file is not String')
    })

    return fetch('http://localhost:8080/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, files })
    })
        .catch(error => { throw new Error(error.message) })
        .then(res => {
            if (res.status === 200)
                return

            return res.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })

}