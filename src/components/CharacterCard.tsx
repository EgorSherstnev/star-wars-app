// src/components/CharacterCard.tsx
import React from 'react';
import { ICharacter } from '../models/ICharacter';

interface CharacterCardProps {
   character: ICharacter;
   onClick: (character: ICharacter) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
   return (
      <div onClick={() => onClick(character)} className="character-card">
         <li key={character.name}>{character.name}</li>
      </div>
   );
};

export default CharacterCard;
