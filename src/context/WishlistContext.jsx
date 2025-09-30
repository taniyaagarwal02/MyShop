import React, { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD_ITEM": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) return state; // avoid duplicates
      return { ...state, items: [...state.items, item] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "CLEAR_WISHLIST":
      return { ...state, items: [] };
    default:
      throw new Error("Unknown action");
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist_v1");
    if (saved) dispatch({ type: "INITIALIZE", payload: JSON.parse(saved) });
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist_v1", JSON.stringify(state));
  }, [state]);

  const addToWishlist = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeFromWishlist = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" });

  return (
    <WishlistContext.Provider
      value={{ state, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
