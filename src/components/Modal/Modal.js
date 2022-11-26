import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, closeModal }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) closeModal();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};
