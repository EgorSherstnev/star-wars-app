import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
   const navigate = useNavigate();

   return (
      <div className="not-found-page">
         <h1>404 - Page Not Found</h1>
         <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
   );
};

export default NotFoundPage;