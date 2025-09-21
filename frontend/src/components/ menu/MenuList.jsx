import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuByRestaurant } from "../../services/menuService";
import { addToCart } from "../../services/cartService";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function MenuList() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMenuByRestaurant(id);
        setMenu(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  if (loading) return <Typography align="center">Loading menu...</Typography>;
  if (error)
    return (
      <Typography align="center" color="error">
        {error}
      </Typography>
    );
  if (!menu.length)
    return <Typography align="center">No menu items found.</Typography>;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Menu
      </Typography>
      <Grid container spacing={3}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={item.imageUrl}
                  alt={item.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description || "Delicious food item"}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                  ₹{item.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  fullWidth
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
