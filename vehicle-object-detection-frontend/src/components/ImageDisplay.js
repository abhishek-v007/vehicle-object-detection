import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/image');

        // Get the processed image URL from the response
        setProcessedImage(response.data.processedImage);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="mt-4">
      <h5 className="text-secondary">Original Image</h5>
      {/* Add code to display the original image */}

      <h5 className="text-secondary">Processed Image</h5>
      {processedImage && (
        <img
          src={processedImage}
          alt="Processed Image"
          className="img-fluid w-25 m-auto d-block"
        />
      )}
    </div>
  );
};

export default ImageDisplay;