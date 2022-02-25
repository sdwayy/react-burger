import PropTypes from 'prop-types';
  
export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const ingredientListPropTypes = PropTypes.arrayOf(ingredientPropTypes.isRequired);

export const burgerPropTypes = PropTypes.shape({
  bun: PropTypes.oneOfType([PropTypes.object, ingredientPropTypes]).isRequired,
  filling: ingredientListPropTypes.isRequired,
});
