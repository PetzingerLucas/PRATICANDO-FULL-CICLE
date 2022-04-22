/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddAlbum from './pages/AddAlbum';
import Albums from './pages/Albums';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/albums" element={<Albums />} />
        <Route exact path="/add-album" element={<AddAlbum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
