import React, { useEffect, useState } from 'react';
import './AuctionList.css';
import { Link } from 'react-router-dom';

const AuctionList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://auctioneer.azurewebsites.net/auction/h4i');
      const data = await response.json();
      console.log(data); // Logga ut datan för att inspektera
      setData(data);
    };
  

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteAuction = async (id) => {
    const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the deleted auction from the data array
      setData(data.filter(auction => auction.AuctionID !== id));
      console.log('Auction deleted successfully');
    } else {
      console.error('Error deleting auction');
    }
  };

  const filteredData = data.filter(auction => 
    auction.Title.toLowerCase().includes(searchTerm) ||
    auction.Description.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h1 className='header'>Auctions</h1>
      <input className='searchInput'
        type="text"
        placeholder="Search for auctions here..."
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <ul className='ul'>
        {filteredData.map((auction) => (
           <li className='listobjects' key={auction.AuctionID}>
            <h2>{auction.Title}</h2>
            <h4>Description:</h4>
            <p>{auction.Description}</p>
            <h4>Starting price:</h4>
            <p>{auction.StartingPrice}</p>
            <h4>Start and end date:</h4>
            <p>{auction.StartDate}</p>
            <p>{auction.EndDate}</p>
            <h4>Created by:</h4>
            <p>{auction.CreatedBy}</p>
            {/* Button to delete the auction */}
            <div className="deleteButtonContainer">
              <button className='deleteButton' onClick={() => handleDeleteAuction(auction.AuctionID)}>Delete Auction</button>
            </div>
            {/* Lägg till knappen för att länka till Bid sidan för varje auktion */}
            <Link to={{
            pathname: `/Bid/${auction.AuctionID}`, // Ändra till AuctionID
             state: { auction }
            }}>
           <button className='bidButton'>Go to Bid</button>
           </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;




