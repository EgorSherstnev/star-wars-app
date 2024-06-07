import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { fetchCharacters, searchCharacters, resetPagination } from '../store/charactersSlice';
import { RootState, AppDispatch } from '../store/store';
import { ICharacter } from '../models/ICharacter';
import CharacterList from '../components/CharacterList ';
import SearchBar from '../components/SearchBar';
import HistoryList from '../components/HistoryList';

const HomePage: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate: NavigateFunction = useNavigate();
   const characters = useSelector((state: RootState) => state.characters.characters);
   const status = useSelector((state: RootState) => state.characters.status);
   const error = useSelector((state: RootState) => state.characters.error);
   const nextPage = useSelector((state: RootState) => state.characters.nextPage);
   const previousPage = useSelector((state: RootState) => state.characters.previousPage);
   const [query, setQuery] = useState<string>('');

   useEffect(() => {
      if (status === 'idle') {
         dispatch(fetchCharacters(1));
      }
   }, [status, dispatch]);

   const handleSearch = (searchQuery: string) => {
      setQuery(searchQuery);
      dispatch(resetPagination());
      dispatch(searchCharacters({ query: searchQuery, page: 1 }));
   };

   const handleReset = () => {
      setQuery('');
      dispatch(resetPagination());
      dispatch(fetchCharacters(1));
   };

   const handleCharacterClick = (character: ICharacter) => {
      const characterId = character.url.split('/').filter(Boolean).pop();
      navigate(`/character/${characterId}`);
   };

   const handleNextPage = () => {
      if (nextPage) {
         const page = new URL(nextPage).searchParams.get('page');
         if (page) {
            dispatch(fetchCharacters(parseInt(page)));
         }
      }
   };

   const handlePreviousPage = () => {
      if (previousPage) {
         const page = new URL(previousPage).searchParams.get('page');
         if (page) {
            dispatch(fetchCharacters(parseInt(page)));
         }
      }
   };

   if (status === 'loading') {
      return <div>Loading...</div>;
   }

   if (status === 'failed') {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="home-page">
         <h1>Homepage</h1>
         <SearchBar onSearch={handleSearch} onReset={handleReset} />
         <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
         <HistoryList onCharacterClick={handleCharacterClick} />
         <div className="pagination">
            {previousPage && <button onClick={handlePreviousPage}>Previous</button>}
            {nextPage && <button onClick={handleNextPage}>Next</button>}
         </div>
      </div>
   );
};

export default HomePage;
