import React from 'react';
import { ICharacter } from '../models/ICharacter';

interface HistoryListProps {
   onCharacterClick: (character: ICharacter) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ onCharacterClick }) => {
   const viewedCharacters: ICharacter[] = JSON.parse(localStorage.getItem('viewedCharacters') || '[]');

   return (
      <div className="history-list">
         <h3>Viewed Characters</h3>
         <ul>
            {viewedCharacters.map(character => (
               <li key={character.url} onClick={() => onCharacterClick(character)}>
                  {character.name}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default HistoryList;
