import React from 'react';
import AuctionList from "./components/AuctionList";
import CreateAuction from "./components/CreateAuction";
import AuctionDetails from "./components/AuctionDetails";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/CreateAuction" element={<CreateAuction />} />
          <Route path="/Bid/:auctionId" element={<AuctionDetails />} /> {/* Ändra till :auctionId här */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;


