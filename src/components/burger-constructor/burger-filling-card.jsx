import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

import IngredientCardContent from './ingredient-card-content';

const BurgerFillingCard = ({ data, index, handleRemove, handleMove }) => {
  const {
    name,
    price,
    image_mobile,
    key,
  } = data;

  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'fillingItem',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      item.index = hoverIndex;
      handleMove(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'fillingItem',
    item: { key, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleRemoveItem = () => handleRemove(data);

  dragRef(dropRef(ref));

  return (
    <li
      className={`${styles['order-item']} mb-4`}
      ref={ref}
      style={{opacity: isDragging ? 0 : 1}}
    >
      <IngredientCardContent
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={handleRemoveItem}
        dragable={true}
      />
    </li>
  );
};

BurgerFillingCard.propTypes = {
  data: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
};

export default BurgerFillingCard;
