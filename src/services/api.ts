import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCharacters = async () => {
   try {
      const response = await axios.get(`${BASE_URL}/people/`);
      return response.data.results;
   } catch (error) {
      throw new Error('Failed to fetch characters');
   }
};

export const searchCharacters = async (query: string) => {
   try {
      const response = await axios.get(`${BASE_URL}/people/?search=${query}`);
      return response.data.results;
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
