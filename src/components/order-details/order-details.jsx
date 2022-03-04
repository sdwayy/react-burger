import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';

import DoneIcon1x from '../../images/done.png';
import DoneIcon2x from '../../images/done@2x.png';

const text = {
  orderIdDescription: 'идентификатор заказа',
  orderAccepted: 'Ваш заказ начали готовить',
  description: 'Дождитесь готовности на орбитальной станции',
};

const OrderDetails = ({ id }) => (
  <>
    <p className={`${styles['order-id']} pt-10 pb-7`}>
      <span className="text text_type_digits-large mb-8">
        {id}
      </span>
      <span className="text text_type_main-medium mb-8">
        {text.orderIdDescription}
      </span>
    </p>
    <img
      className="mb-15"
      src={DoneIcon1x}
      width="120"
      height="120"
      alt="done icon"
      srcSet={`${DoneIcon2x} 2x`}
    />
    <span className="text text_type_main-default mb-2">
      {text.orderAccepted}
    </span>
    <span className="text text_type_main-default text_color_inactive">
      {text.description}
    </span>
  </>
);

OrderDetails.propTypes = {
  id: PropTypes.number.isRequired,
};

export default OrderDetails;
