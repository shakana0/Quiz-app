import { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = () => {
    // You can perform further actions with the selectedImage
    console.log('Selected Image:', selectedImage);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button className='add-file-btn' onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
