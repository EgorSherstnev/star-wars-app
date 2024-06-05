import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavigateFunction  } from 'react-router-dom';
import { fetchCharacters } from '../store/charactersSlice';
import { RootState, AppDispatch } from '../store/store';
import { ICharacter } from '../models/ICharacter';
import CharacterList from '../components/CharacterList ';

const HomePage: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate: NavigateFunction = useNavigate();
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

   const handleCharacterClick = (character: ICharacter) => {
      const characterId = character.url.split('/').filter(Boolean).pop();
      navigate(`/character/${characterId}`);
   };

   return (
      <div className="home-page">
         <h1>Homepage</h1>
         <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
      </div>
   );
};

export default HomePage;
