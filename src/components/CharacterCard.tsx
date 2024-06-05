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
         <h3>{character.name}</h3>
      </div>
   );
};

export default CharacterCard;
