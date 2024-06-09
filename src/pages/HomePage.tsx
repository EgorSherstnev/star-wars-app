import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { fetchCharacters, searchCharacters, resetPagination } from '../store/charactersSlice';
import { RootState, AppDispatch } from '../store/store';
import { ICharacter } from '../models/ICharacter';
import CharacterList from '../components/CharacterList';
import SearchBar from '../components/SearchBar';
import HistoryList from '../components/HistoryList';
import { Typography, Button, Spin, Pagination, Row, Col } from 'antd';

const { Title } = Typography;

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

   const handlePageChange = (page: number) => {
      if (query) {
         dispatch(searchCharacters({ query, page }));
      } else {
         dispatch(fetchCharacters(page));
      }
   };

   if (status === 'loading') {
      return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin />
         </div>
      );
   }

   if (status === 'failed') {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="home-page" style={{ padding: '20px' }}>
         <Title level={1}>Homepage</Title>
         <SearchBar onSearch={handleSearch} onReset={handleReset} />
         <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
         <HistoryList onCharacterClick={handleCharacterClick} />
         <Row justify="center" style={{ marginTop: '20px' }}>
            <Col>
               <Pagination
                  current={nextPage ? parseInt(new URL(nextPage).searchParams.get('page')!) - 1 : 1}
                  onChange={handlePageChange}
                  total={characters.length * 10} // Здесь предполагается, что всего 10 страниц
                  showSizeChanger={false}
               />
            </Col>
         </Row>
      </div>
   );
};

export default HomePage;