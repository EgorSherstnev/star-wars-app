import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../services/api';

const HomePage: React.FC = () => {
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const getCharacters = async () => {
      try {
         const characters = await fetchCharacters();
         setCharacters(characters);
      } catch (error) {
         console.error(error);
      }
   };

      getCharacters();
   }, []);

   return (
      <div className="home-page">
      <h1>Homepage</h1>
      <ul>
         {characters.map((character: any) => (
            <li key={character.name}>{character.name}</li>
         ))}
      </ul>
      </div>
   );
};

export default HomePage;
