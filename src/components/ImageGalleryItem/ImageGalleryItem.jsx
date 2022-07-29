import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, tags, webformatURL, onClick }) => {
  return (
    <>
      <li id={id} className={s.ImageGalleryItem} onClick={onClick}>
        <img src={webformatURL} alt={tags} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
