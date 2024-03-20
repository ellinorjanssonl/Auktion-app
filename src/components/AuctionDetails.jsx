import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AuctionDetails.css';

const AuctionDetails = () => {
  let { auctionId } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);

 
  useEffect(() => {
    // Antag att vi har en funktion som heter fetchAuctionDetails som tar ett ID och returnerar auktionsdetaljer
    const fetchAuctionDetails = async (id) => {
      try {
        const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAuctionDetails(data);
      } catch (error) {
        console.error("Failed to fetch auction details:", error);
      }
    };

    if (auctionId) {
      fetchAuctionDetails(auctionId);
    }
  }, [auctionId]); // Den här effekten körs varje gång auctionId ändras

  if (!auctionDetails) {
    return <div className='Errormessage'> 
      <h1>No auctions selected</h1>
      <p>Please select an auction from the list to place bid</p>
    </div>;
  }

  return (
    <div>
      <div className='Bidsection'>
      <h1>{auctionDetails.Title}</h1>
      <h4>Description:</h4>
      <p>{auctionDetails.Description}</p>
      <h4>Starting price:</h4>
      <p>{auctionDetails.StartingPrice}</p>
      <h2>Place bid here</h2>
      <form className='form-bid'>
        <label htmlFor="bidAmount">Bid amount:</label>
        <input type="number" id="bidAmount" name="bidAmount" />
        <button type="submit">Place bid</button>
      </form>
      </div> 
    </div>
  );
};

export default AuctionDetails;


