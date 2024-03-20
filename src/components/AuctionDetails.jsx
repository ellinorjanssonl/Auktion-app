import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    return <div>Loading auction details or no auction data available...</div>;
  }

  return (
    <div>
      <h1>{auctionDetails.Title}</h1>
      <h4>Description:</h4>
      <p>{auctionDetails.Description}</p>
      <h4>Starting price:</h4>
      <p>{auctionDetails.StartingPrice}</p>
      <h4>Start and end date:</h4>
      <p>{auctionDetails.StartDate}</p>
      <p>{auctionDetails.EndDate}</p>
      <h4>Created by:</h4>
      <p>{auctionDetails.CreatedBy}</p>
      {/* Additional auction details */}
    </div>
  );
};

export default AuctionDetails;

