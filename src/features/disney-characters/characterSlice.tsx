import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  favorites: number[]; // Store movie IDs
}

const initialState: UserState = {
  favorites: [],
};

const characterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const index = state.favorites.indexOf(movieId);

      if (index >= 0) {
        // Remove if exists
        state.favorites.splice(index, 1);
      } else {
        // Add if not exists
        state.favorites.push(movieId);
      }
    },
  },
});

export const { toggleFavorite } = characterSlice.actions;
export default characterSlice.reducer;
