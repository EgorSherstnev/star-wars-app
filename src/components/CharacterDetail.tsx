import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addViewedCharacter } from '../store/charactersSlice';
import { ICharacter } from '../models/ICharacter';

const CharacterDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [character, setCharacter] = useState<ICharacter | null>(null);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      axios.get(`https://swapi.dev/api/people/${id}/`)
         .then(response => {
         setCharacter(response.data);
         dispatch(addViewedCharacter(response.data));
         })
         .catch(error => {
         if (error.response.status === 404) {
            navigate('/404');
         }
         });
   }, [id, navigate, dispatch]);

   if (!character) return <div>Loading...</div>;

   return (
      <div className="character-detail">
         <h1>{character.name}</h1>
         <p>Height: {character.height}</p>
         <p>Mass: {character.mass}</p>
         <p>Hair Color: {character.hair_color}</p>
         <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
   );
};

export default CharacterDetail;
