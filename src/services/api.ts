import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCharacters = async (page: number = 1) => {
   try {
      const response = await axios.get(`${BASE_URL}/people/?page=${page}`);
      return response.data;
   } catch (error) {
      throw new Error('Failed to fetch characters');
   }
};

export const searchCharacters = async (query: string, page: number = 1) => {
   try {
      const response = await axios.get(`${BASE_URL}/people/?search=${query}&page=${page}`);
      return response.data;
   } catch (error) {
      throw new Error('Failed to search characters');
   }
};

export const fetchCharacterDetail = async (id: string) => {
   try {
      const response = await axios.get(`${BASE_URL}/people/${id}/`);
      return response.data;
   } catch (error) {
      throw new Error('Failed to fetch character details');
   }
};
