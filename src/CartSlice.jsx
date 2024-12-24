import { createSlice } from '@reduxjs/toolkit';

// Define the cart slice
export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // List of items in the cart
        numOfItems: 0 // Total quantity of items in the cart
    },

    reducers: {
        // Reducer to add an item to the cart
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++; // Increase quantity if item exists
            } else {
                state.items.push({ name, image, cost, quantity: 1 }); // Add new item
            }

            state.numOfItems++;
        },

        // Reducer to remove an item from the cart
        removeItem: (state, action) => {
            const { name } = action.payload;
            const itemToRemove = state.items.find(item => item.name === name);

            if (itemToRemove) {
                state.numOfItems -= itemToRemove.quantity; // Decrease total quantity
                state.items = state.items.filter(item => item.name !== name); // Remove the item
            }

            // Ensure numOfItems is not negative
            state.numOfItems = Math.max(state.numOfItems, 0);
        },

        // Reducer to update the quantity of a specific item
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem && quantity > 0) {
                const differenceQuantity = quantity - existingItem.quantity;
                state.numOfItems += differenceQuantity; // Adjust total quantity
                existingItem.quantity = quantity; // Update item's quantity
            }
        },
    },
});

// Export actions and reducer
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
