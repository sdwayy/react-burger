import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  closeModal: () => void;
};

const ModalOverlay: React.FC<TModalOverlayProps> = ({ closeModal }) => (
  <div
    className={styles.overlay}
    onClick={closeModal}
  />
);

export default ModalOverlay;
