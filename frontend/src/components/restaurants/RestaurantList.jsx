import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../services/restaurantService";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
