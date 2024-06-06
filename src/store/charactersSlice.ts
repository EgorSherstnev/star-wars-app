import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters as fetchCharactersAPI, searchCharacters as searchCharactersAPI } from '../services/api';
import { ICharacter } from '../models/ICharacter';
import { ICharactersState } from '../models/ICharactersState';

const initialState: ICharactersState = {
  characters: [],
  viewedCharacters: JSON.parse(sessionStorage.getItem('viewedCharacters') || '[]'),
  status: 'idle',
  error: null,
  currentPage: 1,
  nextPage: null,
  previousPage: null,
};

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (page: number = 1) => {
  const response = await fetchCharactersAPI(page);
  return response;
});

export const searchCharacters = createAsyncThunk('characters/searchCharacters', async ({ query, page }: { query: string, page: number }) => {
  const response = await searchCharactersAPI(query, page);
  return response;
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addViewedCharacter: (state, action: PayloadAction<ICharacter>) => {
      state.viewedCharacters.push(action.payload);
      sessionStorage.setItem('viewedCharacters', JSON.stringify(state.viewedCharacters));
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.nextPage = null;
      state.previousPage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch characters';
      })
      .addCase(searchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
      })
      .addCase(searchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search characters';
      });
  },
});

export const { addViewedCharacter, resetPagination } = charactersSlice.actions;

export default charactersSlice.reducer;
