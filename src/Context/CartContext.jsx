import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [uid, setUid] = useState(null);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        setCartItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid) {
      const savedCart = localStorage.getItem(`cart_${uid}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      localStorage.setItem(`cart_${uid}`, JSON.stringify(cartItems));
    }
  }, [cartItems, uid]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      if (exists) return prevItems;
      return [...prevItems, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (uid) {
      localStorage.removeItem(`cart_${uid}`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

