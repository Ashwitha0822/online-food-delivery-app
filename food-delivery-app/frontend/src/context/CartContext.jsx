import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);

  const addToCart = (item, restaurant) => {
    if (cartRestaurant && cartRestaurant.id !== restaurant.id) {
      if (!window.confirm('Clear current cart and add from new restaurant?')) return;
      setCart([]);
    }
    setCartRestaurant(restaurant);
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => { setCart([]); setCartRestaurant(null); };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartRestaurant, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
