import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, tags, webformatURL, onClick }) => {
  return (
    <>
      <li key={id} className={s.ImageGalleryItem} onClick={onClick}>
        <img src={webformatURL} alt={tags} />
      </li>
    </>
  );
};

export default ImageGalleryItem;
