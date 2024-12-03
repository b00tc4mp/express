import { useState } from 'react'

import logic from './logic'

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

function App() {
  const [images, setImages] = useState([])

  const handleImageChange = event => {
    const { files } = event.target

    const images = Array.prototype.map.call(files, file => URL.createObjectURL(file))

    setImages(images)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    const form = event.target

    const title = form.title.value
    const files = form.images.files
    const fileToB64Conversions = Array.prototype.map.call(files, toBase64)

    Promise.all(fileToB64Conversions)
      .then(filesB64 => {
        try {
          logic.createAlbum(title, filesB64)
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
      })
      .catch(error => {
        alert(error.message)

        console.error(error)
      })
  }


  return <>
    <h2>create album</h2>

    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">title</label>
      <input type="text" name="title" id="title" />

      <label htmlFor="images">images</label>
      <input type="file" name="images" id="images" onChange={handleImageChange} multiple />

      <button type="submit">create album</button>
    </form>

    {images.map(image => <img key={image} src={image} />)}
  </>
}

export default App
