import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';

import IngredientCardContent from './ingredient-card-content';
import { TIngredient } from '../../utils/types';

type TBurgerFillingCardProps = {
  data: TIngredient;
  index: number;
  handleRemove: Function;
  handleMove: Function;
};

type TDragItem = {
  key: string;
  index: number;
};

const BurgerFillingCard: React.FC<TBurgerFillingCardProps> = ({ data, index, handleRemove, handleMove }) => {
  const {
    name,
    price,
    image_mobile,
    key,
    type,
  } = data;

  const ref = useRef<HTMLLIElement>(null);

  const [, dropRef] = useDrop<TDragItem>({
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

      if (!clientOffset) return;

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
      data-testid="orderItem"
      data-type={type}
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

export default BurgerFillingCard;
