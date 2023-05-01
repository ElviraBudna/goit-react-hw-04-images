import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <DivOverlay onClick={handleBackdropClick}>
      <DivModal>{children}</DivModal>
    </DivOverlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
