import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../store/charactersSlice';
import { RootState, AppDispatch } from '../store/store';

const HomePage: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const characters = useSelector((state: RootState) => state.characters.characters);
   const status = useSelector((state: RootState) => state.characters.status);
   const error = useSelector((state: RootState) => state.characters.error);

   useEffect(() => {
      if (status === 'idle') {
         dispatch(fetchCharacters());
      }
   }, [status, dispatch]);

   if (status === 'loading') {
      return <div>Loading...</div>;
   }

   if (status === 'failed') {
      return <div>Error: {error}</div>;
   }

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
