import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DisneyCharacter, CharacterFilters } from "../types/disney";

type SortDirection = "asc" | "desc" | null;

interface DisneyState {
  characters: DisneyCharacter[];
  filteredCharacters: DisneyCharacter[];
  selectedCharacter: DisneyCharacter | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  sortDirection: SortDirection;
  filters: CharacterFilters;
  isModalOpen: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

const initialState: DisneyState = {
  characters: [],
  filteredCharacters: [],
  selectedCharacter: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 50,
  filters: {
    search: "",
    minTvShows: 0,
    minVideoGames: 0,
    hasAllies: false,
    hasEnemies: false,
    tvShowFilter: "",
  },
  isModalOpen: false,
  sortDirection: null,
};

export const fetchCharacters = createAsyncThunk(
  "disney/fetchCharacters",
  async (page: number = 1) => {
    const response = await fetch(
      apiUrl + `/character?page=${page}&pageSize=50`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return data;
  },
);

export const fetchAllCharacters = createAsyncThunk(
  "disney/fetchAllCharacters",
  async () => {
    const allCharacters: DisneyCharacter[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 10) {
      // Limit to first 10 pages for performance
      const response = await fetch(
        apiUrl + `/character?page=${page}&pageSize=50`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      allCharacters.push(...data.data);
      hasMore = data.info.nextPage !== null;
      page++;
    }

    return allCharacters;
  },
);

const applyFilters = (
  characters: DisneyCharacter[],
  filters: CharacterFilters,
): DisneyCharacter[] => {
  return characters.filter(char => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesTvShows = char.tvShows.length >= filters.minTvShows;
    const matchesVideoGames = char.videoGames.length >= filters.minVideoGames;
    const matchesAllies = !filters.hasAllies || char.allies.length > 0;
    const matchesEnemies = !filters.hasEnemies || char.enemies.length > 0;

    return (
      matchesSearch &&
      matchesTvShows &&
      matchesVideoGames &&
      matchesAllies &&
      matchesEnemies
    );
  });
};

const sortCharacters = (
  characters: DisneyCharacter[],
  direction: SortDirection,
): DisneyCharacter[] => {
  if (!direction) return characters;
  return [...characters].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return direction === "asc" ? comparison : -comparison;
  });
};

const disneySlice = createSlice({
  name: "disney",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setSelectedCharacter: (
      state,
      action: PayloadAction<DisneyCharacter | null>,
    ) => {
      state.selectedCharacter = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<CharacterFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      const filtered = applyFilters(state.characters, state.filters);
      state.filteredCharacters = sortCharacters(filtered, state.sortDirection);
      state.currentPage = 1;
    },
    resetFilters: state => {
      state.filters = initialState.filters;
      state.sortDirection = null;
      state.filteredCharacters = state.characters;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
      state.filteredCharacters = sortCharacters(
        applyFilters(state.characters, state.filters),
        action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      // fetchCharacters cases, "pending", "fulfilled" or "rejected"
      .addCase(fetchCharacters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.data;
        state.filteredCharacters = applyFilters(
          action.payload.data,
          state.filters,
        );
        state.totalPages = action.payload.info.totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch characters";
      })
      // fetchAllCharacters cases, "pending", "fulfilled" or "rejected"
      .addCase(fetchAllCharacters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
        state.filteredCharacters = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch characters";
      });
  },
});

export const {
  setModalOpen,
  setSelectedCharacter,
  setFilters,
  resetFilters,
  setCurrentPage,
  setItemsPerPage,
  setSortDirection,
} = disneySlice.actions;

export default disneySlice.reducer;
