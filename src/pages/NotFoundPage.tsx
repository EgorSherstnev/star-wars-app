import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Card } from 'antd';

const { Title } = Typography;

const NotFoundPage: React.FC = () => {
   const navigate = useNavigate();

   return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
         <Card style={{ textAlign: 'center', width: 400, border: '1px solid #d9d9d9', borderRadius: '8px' }}>
            <Title level={1}>404 - Page Not Found</Title>
            <Button type="primary" onClick={() => navigate('/')}>
               Back to Home
            </Button>
         </Card>
      </div>
   );
};

export default NotFoundPage;
