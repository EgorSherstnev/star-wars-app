import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICharacter } from '../models/ICharacter';
import { clearViewedCharacters } from '../store/charactersSlice';
import { RootState } from '../store/store';
import { Button, List, Typography } from 'antd';

const { Title } = Typography;

interface HistoryListProps {
   onCharacterClick: (character: ICharacter) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ onCharacterClick }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const dispatch = useDispatch();
   const viewedCharacters = useSelector((state: RootState) => state.characters.viewedCharacters);

   const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
   };

   const clearHistory = () => {
      dispatch(clearViewedCharacters());
   };

   return (
      <div className="history-list" style={{ maxWidth: '400px'}}>
         {viewedCharacters.length > 0 && (
            <>
               <Title level={3} onClick={toggleExpansion} style={{ cursor: 'pointer' }}>
                  Viewed Characters ({viewedCharacters.length}) {isExpanded ? '▲' : '▼'}
               </Title>
               <Button onClick={clearHistory} type="primary" style={{ marginBottom: '10px' }}>
                  Clear History
               </Button>
            </>
         )}
         {isExpanded && (
            <List
               size="small"
               bordered
               dataSource={viewedCharacters}
               renderItem={(character) => (
                  <List.Item onClick={() => onCharacterClick(character)} style={{ cursor: 'pointer'}}>
                     {character.name}
                  </List.Item>
               )}
            />
         )}
      </div>
   );
};

export default HistoryList;
