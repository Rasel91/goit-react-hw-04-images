import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ previewImage, largeImage, tags }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <li className={css.imageGalleryItem} onClick={toggleModal}>
        <img
          className={css.imageGalleryItemImage}
          src={previewImage}
          alt={tags}
        />
      </li>
      {modalIsOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImage} alt={tags} />
          <p className={css.imageTitle}>{tags}</p>
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
