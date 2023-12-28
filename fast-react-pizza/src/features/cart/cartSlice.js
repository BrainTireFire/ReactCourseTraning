import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//reselect library to optimalizja this!
export const getCart = createSelector(
  (state) => state.cart.cart,
  (cart) => cart,
);

export const getTotalCartQuantity = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((sum, item) => sum + item.quantity, 0),
);

export const getTotalCartPrice = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((sum, item) => sum + item.totalPrice, 0),
);

export const getCurrentQuantityById = (id) =>
  createSelector(
    (state) => state.cart.cart,
    (cart) => {
      const item = cart.find((item) => item.pizzaId === id);
      return item ? item.quantity : 0;
    },
  );

//old NOT memoization!!
// export const getTotalCartPrice = (state) =>
//   state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
