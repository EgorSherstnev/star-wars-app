import React from 'react';
import CharacterDetail from '../components/CharacterDetail';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const CharacterPage: React.FC = () => {
   return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
         <Card style={{ width: 400, border: '1px solid #d9d9d9', borderRadius: '8px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Character Detail</Title>
            <CharacterDetail />
         </Card>
      </div>
   );
};

export default CharacterPage;
