import { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface CartItem {
  id: string; // Unique ID for cart item (e.g. productId-size)
  productId: string;
  name: string;
  color: string;
  colorHex?: string;
  size: string;
  price: number;
  qty: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  checkout: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, "id" | "qty">) => {
    setItems((prev) => {
      const id = `${newItem.productId}-${newItem.size}`;
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...newItem, id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = async (name: string, email: string) => {
    if (items.length === 0) return { success: false, error: "Cart is empty" };

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: name,
        customer_email: email,
        total_price: `IDR ${cartTotal.toLocaleString("id-ID")}`,
        items: items,
      },
    ]);

    if (error) {
      console.error("Checkout error:", error);
      return { success: false, error: error.message };
    }

    setItems([]);
    return { success: true };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
