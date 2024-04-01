import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/NavBar'
import AuctionHome from './components/AuctionHome';
import AuctionPast from './components/AuctionPast';
import AuctionDetails from './components/AuctionDetails';
import AuctionCreate from './components/AuctionCreate';
import AuctionFuture from './components/AuctionFuture';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm]= useState('');

  const handleSearch = (term) =>{
    setSearchTerm(term);
  };

  return (
    <>
    <MyNav onSearch={handleSearch}  />
    <Routes>
        <Route path="/newauction" element={<AuctionCreate/>} />
        <Route path="/" element={<AuctionHome  searchTerm={searchTerm}/>} />
        <Route path="/notcurrent" element={<AuctionPast/>} />
        <Route path="/future" element={<AuctionFuture />} />
        <Route path="/auctiondetails/:id" element={<AuctionDetails />} />
    </Routes>
    </>
  )
}

export default App

