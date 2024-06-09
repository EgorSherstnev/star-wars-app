import React from 'react';
import { Row, Col } from 'antd';
import { ICharacter } from '../models/ICharacter';
import CharacterCard from './CharacterCard';
import '../css/character-list .css'

interface CharacterListProps {
   characters: ICharacter[];
   onCharacterClick: (character: ICharacter) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
   return (
      <div className="character-card-container">
         <Row gutter={[16, 16]}>
            {characters.map(character => (
               <Col key={character.url} span={24}>
                  <div className="card-wrapper">
                     <CharacterCard character={character} onClick={onCharacterClick} />
                  </div>
               </Col>
            ))}
         </Row>
      </div>
   );
};

export default CharacterList;