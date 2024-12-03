import { useState } from 'react'

function App() {
  const [images, setImages] = useState([])

  const handleImageChange = event => {
    const { files } = event.target

    const images = Array.prototype.map.call(files, file => URL.createObjectURL(file))

    setImages(images)
  }

  return <>
    <h2>upload image</h2>

    <form>
      <label htmlFor="image">image</label>
      <input type="file" name="image" id="image" onChange={handleImageChange} multiple />

      <button type="submit">upload</button>
    </form>

    {images.map(image => <img src={image} />)}
  </>
}

export default App
