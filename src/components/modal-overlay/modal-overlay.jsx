import React from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ closeModal }) => (
  <div
    className={styles.overlay}
    onClick={closeModal}
  />
);

export default ModalOverlay;
