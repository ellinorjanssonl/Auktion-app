import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ändra från useHistory till useNavigate
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Använd useNavigate istället för useHistory

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Använd navigate istället för history.push
  };

  return (
    <nav className='navbar'>
      <ul className='ul-list'>
       <li className='links'>
         <Link to="/">Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/CreateAuction">Create Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/Bid">Bid Auctions</Link>
       </li>
      </ul>
      <form className='searchform' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for auctions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;



