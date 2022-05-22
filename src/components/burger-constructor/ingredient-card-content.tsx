import React from 'react';
import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientCardContentProps = {
  dragable?: boolean;
} & React.ComponentProps<typeof ConstructorElement>;

const IngredientCardContent: React.FC<TIngredientCardContentProps> = ({
  dragable,
  type,
  isLocked,
  handleClose,
  text,
  thumbnail,
  price,
}) => {
  const constructorElementProps = {
    type,
    isLocked,
    handleClose,
    text,
    thumbnail,
    price,
  };

  return (
    <>
      {
        dragable
        && (
          <span
            className={`${styles['drag-icon']} mr-2`}
            data-testid="orderItemDragIcon"
          >
            <DragIcon type="primary" />
          </span>
        )
      }
      <ConstructorElement { ...constructorElementProps }/>
    </>
  );
};

export default IngredientCardContent;
