import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface SearchBarProps {
   onSearch: (query: string) => void;
   onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
   const [query, setQuery] = useState('');

   const handleSearch = () => {
      onSearch(query);
   };

   const handleReset = () => {
      setQuery('');
      onReset();
   };

   return (
      <div className="search-bar" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
         <Input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for characters..." 
            style={{ width: '200px' }}
         />
         <Button type="primary" onClick={handleSearch}>Search</Button>
         <Button onClick={handleReset}>Reset</Button>
      </div>
   );
};

export default SearchBar;