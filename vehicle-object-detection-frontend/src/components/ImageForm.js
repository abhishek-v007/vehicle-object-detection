import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageForm = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploading(false);
      // Handle the response and display the processed image
      console.log(response.data);
    } catch (error) {
      setUploading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile02"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            Choose file
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {uploading ? 'Processing...': 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ImageForm;