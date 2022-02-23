import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderItemContent = props => {
  const {
    dragable,
    ...constructorElementProps
  } = props;

  return (
    <>
      {
        dragable
        && <span className={`${styles['drag-icon']} mr-2`}><DragIcon type="primary" /></span>
      }
      <ConstructorElement { ...constructorElementProps }/>
    </>
  );
};

OrderItemContent.propTypes = {
  dragable: PropTypes.bool,
  type: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderItemContent;