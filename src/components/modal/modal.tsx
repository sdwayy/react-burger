import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

type TModalProps = {
  title?: string;
  closeModal: () => void;
  className?: string;
};

const Modal: React.FC<TModalProps> = ({
  title,
  children,
  closeModal,
  className,
}) => {
  const onDocumentKeydown = (event: KeyboardEvent) => {
    const { key } = event;

    switch (key) {
      case 'Escape':
        event.preventDefault();
        closeModal();
        break;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onDocumentKeydown);

    return () => {
      document.removeEventListener('keydown', onDocumentKeydown);
    };
  }, []);

  if (!modalRoot) return null;

  return createPortal((
    <>
      <div className={`${styles.modal} pl-10 pr-10 pt-10 pb-15 ${className}`}>
        <header>
          {title && <h1 className="text text_type_main-large pt-3 pb-3">{title}</h1>}
          <button className={styles['close-btn']} type="button" onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </header>
        <div className={`${styles['modal-body']}`}>
          {children}
        </div>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>
  ), modalRoot);
};

export default Modal;
