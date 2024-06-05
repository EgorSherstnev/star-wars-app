import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters as fetchCharactersAPI, searchCharacters as searchCharactersAPI } from '../services/api';
import { ICharacter } from '../models/ICharacter';
import { ICharactersState } from '../models/ICharactersState';

const initialState: ICharactersState = {
  characters: [],
  viewedCharacters: JSON.parse(localStorage.getItem('viewedCharacters') || '[]'),
  status: 'idle',
  error: null,
};

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  return await fetchCharactersAPI();
});

export const searchCharacters = createAsyncThunk('characters/searchCharacters', async (query: string) => {
  return await searchCharactersAPI(query);
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addViewedCharacter: (state, action: PayloadAction<ICharacter>) => {
      state.viewedCharacters.push(action.payload);
      localStorage.setItem('viewedCharacters', JSON.stringify(state.viewedCharacters));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
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
        state.characters = action.payload;
      })
      .addCase(searchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search characters';
      });
  },
});

export const { addViewedCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
