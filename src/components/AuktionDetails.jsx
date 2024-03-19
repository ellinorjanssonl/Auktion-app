import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState('');

  useEffect(() => {
    const fetchAuctionDetails = async () => {
        const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${id}`);
        const data = await response.json();
        setAuction(data);
    };
    fetchAuctionDetails();
  }, [id]);

  return (
    <div>
      {/* Visa auktionsdetaljer */}
      <input type="number" value={bid} onChange={(e) => setBid(e.target.value)} />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
};

export default AuctionDetails;
