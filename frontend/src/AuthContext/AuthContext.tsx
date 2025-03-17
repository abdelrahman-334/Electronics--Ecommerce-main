import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface AuthContextProps {
  token: string | null;
  cart: Product[];
  showLoginAlert: boolean;
  setToken: (token: string | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setShowLoginAlert: (value: boolean) => void;
  decreaseQuantity: (productId: string) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  token: null,
  cart: [],
  showLoginAlert: false,
  setToken: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  setShowLoginAlert: () => {},
  decreaseQuantity: (productId: string) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );
  const [cart, setCart] = useState<Product[]>([]);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(() => {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...cart, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId: string) => {
    setCart(() =>
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        cart,
        showLoginAlert,
        setToken,
        addToCart,
        removeFromCart,
        clearCart,
        setShowLoginAlert,
        decreaseQuantity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
