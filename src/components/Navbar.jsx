import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Auctions</Link> {/* Använd Link-komponenten med to-attributet */}
        </li>
        <li>
          <Link to="/CreateAuction">Create Auctions</Link>
        </li>
        <li>
          <Link to="/Bid">Bid</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

