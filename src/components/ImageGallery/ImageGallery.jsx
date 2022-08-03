import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => toggleModal(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
