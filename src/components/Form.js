import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import "../styles/form.css"
import "../styles/buttons.css"



function Form() {
  const [titel, setTitel] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [blogText, setBlogText] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("title", titel);
    formData.append("category_id", categorie);
    formData.append("content", blogText);
    formData.append("image", image.raw);
    console.log(formData)
    axios.post("https://frontend-case-api.sbdev.nl/api/posts", formData, {
      headers: {
        "token": "pj11daaQRz7zUIH56B9Z"
      }
    })
    .then((res) => {
      alert("File upload ging toppie")
    })
    .catch((err) => alert("File Upload Error"));
  }


  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Plaats een Blog bericht</h1>
        <label>Berichtnaam
        <div>
        <input 
          type="text" 
          name="Berichtnaam" 
          value={titel} 
          onChange={(e) => setTitel(e.target.value)}
          placeholder="geen text"
          maxLength={30}
        />
        </div>
        </label>
        <label>Categorie
        <div>
          <select 
            value={categorie} 
            onChange={(e) => setCategorie(e.target.value)}
            required
            >
          <option value="" selected disabled hidden>Geen categorie</option>
            <option value="2">Nieuws</option>
            <option value="1">Tech</option>
            <option value="4">Lokaal</option>
            <option value="3">Sports</option>
          </select>
        </div>
        </label>
        <label htmlFor="upload-button">
          <p>Header afbeelding</p>
          {image.preview ? (
            <img 
              className='upload-image-preview'
              src={image.preview} 
              alt="dummy" 
              />
              ) : (
            <div>
              <div className="upload-wrapper">
                <FontAwesomeIcon id='camera-ic' icon={faCamera} />
                <div className='upload-btn'><p>Kies bestand</p></div>
              </div>
            </div>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <label>Bericht:
        <div>
        <textarea 
          className='big-text'
          name="Bericht" 
          value={blogText} 
          onChange={(e) => setBlogText(e.target.value)}
        />
        </div>
        </label>
          <button className='btn-load' type="submit">Bericht aanmaken</button>
      </form>
    </div>
    )
  }
  
  export default Form;