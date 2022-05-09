import React, { useEffect } from "react";

import Orders from "../../components/orders/orders";
import { closeUserOrdersConnection, initUserOrders } from "../../services/store/slices/userOrders";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.userOrders);

  useEffect(() => {
    dispatch(initUserOrders());

    return () => {
      dispatch(closeUserOrdersConnection());
    };
  }, []);

  if (!data.length) return null;

  const reversedData = data.slice().reverse();

  return (
    <Orders orders={reversedData} withStatus />
  );
};

export default UserOrders;