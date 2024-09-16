import React from 'react';

const ImagePreview = ({ imagePath }) => { 
  const imageUrl = `${process.env.REACT_APP_BACKEND}/${imagePath}`; 
  return (
    <img
      src={imageUrl}
      alt="OMR Sheet"
      className="img-fluid"
      style={{ maxWidth: '100%', height: 'auto' }}  
    />
  );
};

export default ImagePreview;
