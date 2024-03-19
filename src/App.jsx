import React from 'react';
import AuctionList from "./components/AuctionList";
import CreateAuction from "./components/CreateAuction";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionDetails from './components/AuktionDetails';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuctionList />} /> {/* Definiera AuctionList-komponenten för root-path */}
          <Route path="/CreateAuction" element={<CreateAuction />} /> {/* Definiera CreateAuction-komponenten för /CreateAuction-path */}
          <Route path="/Bid/:id" element={<AuctionDetails />} /> {/* Definiera AuctionList-komponenten för /Bid-path */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

