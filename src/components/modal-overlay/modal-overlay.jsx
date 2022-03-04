import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ closeModal }) => (
  <div
    className={styles.overlay}
    onClick={closeModal}
  />
);

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
