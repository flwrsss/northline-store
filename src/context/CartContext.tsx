import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  promoCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

const MAX_QUANTITY = 10;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(() => {
    return localStorage.getItem('promoCode');
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (promoCode) {
      localStorage.setItem('promoCode', promoCode);
    } else {
      localStorage.removeItem('promoCode');
    }
  }, [promoCode]);

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item
        );
      }

      return [...prev, { product, size, color, quantity: Math.min(quantity, MAX_QUANTITY) }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discount = (() => {
    if (promoCode === 'NORTH10') return subtotal * 0.1;
    if (promoCode === 'FIRST15') return subtotal * 0.15;
    return 0;
  })();

  const shipping = subtotal - discount > 100 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const applyPromoCode = (code: string) => {
    const normalizedCode = code.trim().toUpperCase();

    if (normalizedCode === 'NORTH10') {
      setPromoCode('NORTH10');
      return { success: true, message: 'Promo code applied: 10% off' };
    }
    if (normalizedCode === 'FIRST15') {
      setPromoCode('FIRST15');
      return { success: true, message: 'Promo code applied: 15% off' };
    }

    return { success: false, message: 'Invalid promo code' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        applyPromoCode,
        removePromoCode,
        promoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};