// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import InfiniteScrollButton from './components/InfiniteScrollButton';
import CharacterDetail from './components/CharacterDetail';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [infiniteScroll, setInfiniteScroll] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}`);
        setCharacters(res.data.results);
        setTotalPages(res.data.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [currentPage, searchQuery]);

  return (
    <Router>
      <div>
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
        <Routes>
          <Route path="/" element={
            <div>
              <CharacterList characters={characters} />
              {infiniteScroll ? (
                <InfiniteScrollButton onClick={() => setCurrentPage((prev) => prev + 1)} />
              ) : (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>
          } />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

