import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD_ITEM": {
      const item = action.payload;
      const found = state.items.find((i) => i.id === item.id);
      if (found) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, qty: item.qty || 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      throw new Error("Unknown action");
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("cart_v1");
    if (saved) dispatch({ type: "INITIALIZE", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(state));
  }, [state]);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
