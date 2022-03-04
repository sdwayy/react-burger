import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCardContent = ({
  src,
  title,
  price,
  count,
}) => (
  <>
    <img src={src} alt={title} />
    <p className={`${styles.price} text text_type_digits-default mb-1 mt-1`}>
      <span className="mr-2">{price}</span>
      <CurrencyIcon type='primary' />
    </p>
    <p className="text text_type_main-default">{title}</p>
    {
      count > 0 && (
        <span className={styles.counter}>
          <Counter count={count} size="default" />
        </span>
      )
    }
  </>
);

IngredientCardContent.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientCardContent;
