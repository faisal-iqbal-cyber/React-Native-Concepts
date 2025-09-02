import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import restaurantReducer from './slices/restaurantSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in actions (e.g., image assets)
        ignoredActions: ['cart/addToCart', 'cart/removeFromCart'],
        ignoredPaths: ['cart.items.image'],
      },
    }),
});