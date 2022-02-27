import React from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = props => {
  const { closeModal } = props;

  return (
    <div
      className={styles.overlay}
      onClick={closeModal}
    />
  );
};

export default ModalOverlay;