import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(id);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  return (
    <div>
      {order && (
        <>
          <h2>Order #{order._id}</h2>
          <p>Status: {order.status}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>
                {item.name} (x{item.qty}) - ₹{item.price * item.qty}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
