import React, { useState } from 'react';

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
      <div className="search-bar">
         <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for characters..."
         />
         <button onClick={handleSearch}>Search</button>
         <button onClick={handleReset}>Reset</button>
      </div>
   );
};

export default SearchBar;
