import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICharacter } from '../models/ICharacter';
import { clearViewedCharacters } from '../store/charactersSlice';
import { RootState } from '../store/store';

interface HistoryListProps {
   onCharacterClick: (character: ICharacter) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ onCharacterClick }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const dispatch = useDispatch();
   const viewedCharacters = useSelector((state: RootState) => state.characters.viewedCharacters);

   const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
   }

   const clearHistory = () => {
      dispatch(clearViewedCharacters());
   };

   return (
      <div className="history-list">
         {viewedCharacters.length > 0 && (
            <>
               <h3 onClick={toggleExpansion}>
                  Viewed Characters ({viewedCharacters.length}) {isExpanded ? '▲' : '▼'}
               </h3>
               <button onClick={clearHistory}>Clear History</button>
            </>
         )}
         {isExpanded && (
            <ul>
               {viewedCharacters.map((character, index) => (
                  <li key={`${character.url}-${index}`} onClick={() => onCharacterClick(character)}>
                     {character.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default HistoryList;
