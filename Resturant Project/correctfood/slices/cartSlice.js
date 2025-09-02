import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('Adding to cart:', action.payload);
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      console.log('Removing item with id:', action.payload.id);
      const initialLength = state.items.length;
      state.items = state.items.filter(item => item.id !== action.payload.id);
      if (state.items.length === initialLength) {
        console.warn(`Item with id ${action.payload.id} not found in cart!`);
      }
    },
    emptyCart: (state) => {
      console.log('Emptying cart');
      state.items = [];
    },
  },
});

// Actions
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

// Memoized selector for items by ID
export const selectCartItemsById = createSelector(
  [selectCartItems, (_, id) => id],
  (items, id) => items.filter(item => item.id === id)
);

// Total price selector
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price || 0), 0)
);

// Total item count selector
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export default cartSlice.reducer;