import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AuctionDetails.css';

const AuctionDetails = () => {
  let { auctionId } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [bidder, setBidder] = useState('');
  const [bidAmount, setBidAmount] = useState('');
 
  useEffect(() => {
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

  const placeBid = async () => {
    const response = await fetch(
      `https://auctioneer.azurewebsites.net/bid/h4i`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Amount: bidAmount,
          AuctionID: auctionId,
          Bidder: bidder,
          GroupCode: 'h4i'
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('Bid placed:', data);
      setBidAmount('');
      setBidder('');

    } else {
      console.error('Error placing bid');
    }
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
      <div className='form-bid'>
        <label htmlFor='bidder'>Bidder:</label>
        <input
          type='text'
          id='bidder'
          value={bidder}
          onChange={(event) => setBidder(event.target.value)}
        />
        <label htmlFor='bidAmount'>Amount:</label>
        <input
          type='number'
          id='bidAmount'
          value={bidAmount}
          onChange={(event) => setBidAmount(event.target.value)}
        />
        <button onClick={placeBid}>Place bid</button>
      </div>
      </div> 
    </div>
  );
};

export default AuctionDetails;


