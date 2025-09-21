import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../../services/restaurantService";
import { getMenuByRestaurant } from "../../services/menuService";

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const restaurantData = await getRestaurantById(id);
      setRestaurant(restaurantData);
      const menuData = await getMenuByRestaurant(id);
      setMenu(menuData);
    };
    fetchRestaurantData();
  }, [id]);

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <h3>Menu</h3>
      <ul>
        {menu.map((item) => (
          <li key={item._id}>{item.name} - ₹{item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetail;
