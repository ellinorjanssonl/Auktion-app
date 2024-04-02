import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentBid from './CurrentBid';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AuctionDetails.css';

function AuctionDetails() {
    const navigate = useNavigate();
    const [auctionDetails, setAuctionDetails] = useState({});
    const [bidAmount, setBidAmount] = useState('');
    const [bidderName, setBidderName] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshCurrentBid, setRefreshCurrentBid] = useState(false);

    const location = useLocation();
    const auctionId = location.pathname.split('/').pop();

    useEffect(() => {
        fetchAuctionDetails(auctionId);
    }, [location]);

    async function fetchAuctionDetails(auctionId) {
        try {
            const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${auctionId}`);
            const data = await response.json();
            if (response.ok && Object.keys(data).length) {
                setAuctionDetails(data);
            } else {
                console.error('No details found for ID:', auctionId);
                setIsError(true);
                setErrorMessage('No details found for this auction.');
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
            setIsError(true);
            setErrorMessage('Error fetching auction details.');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const bidData = {
            Amount: bidAmount,
            AuctionID: auctionId, 
            Bidder: bidderName,
            GroupCode: 'h4i',
        };

        try {
            const response = await fetch('https://auctioneer.azurewebsites.net/bid/h4i', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bidData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText.replace("Bad Request", "Please try again!"));
            }

            // Reset bid form and refresh current bid
            setBidAmount("");
            setBidderName('');
            setRefreshCurrentBid(prevState => !prevState);
        } catch (error) {
            console.error("fetch error:", error);
            setIsError(true);
            setErrorMessage(error.message || "Error posting your bid.");
        }
    }

    async function handleDeleteAuction() {
      try {
          const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${auctionId}`, {
              method: 'DELETE'
          });
  
          if (!response.ok) {
              throw new Error('Failed to delete auction. There might be a bid on this auction.');
          }
  
          console.log('Auction deleted successfully');
          navigate('/'); // Omdirigerar användaren till hemsidan
      } catch (error) {
          console.error('Error deleting auction:', error);
          setIsError(true);
          setErrorMessage('Error deleting auction');
      }    
  }

    return (
        <div className='AuctionDetails'>
            <div className='BidCard'>
                <AuctionInfo data={auctionDetails} refreshTrigger={refreshCurrentBid} />
                <BidForm 
                    bidAmount={bidAmount} 
                    setBidAmount={setBidAmount} 
                    bidderName={bidderName} 
                    setBidderName={setBidderName} 
                    handleSubmit={handleSubmit} 
                />
                {isError && <Alert variant="danger" onClose={() => setIsError(false)} dismissible>{errorMessage}</Alert>}
            </div>
            <Button variant="danger" onClick={handleDeleteAuction}>Delete Auction</Button>
        </div>
    );
}

function AuctionInfo({ data, refreshTrigger }) {
    return (
        <ul>
            <h2>{data.Title}</h2>
            <div className="dropdown">
                <button className="dropbtn">Current bid</button>
                <div className="dropdown-content">
                    <CurrentBid auctionId={data.AuctionID} fetchTrigger={refreshTrigger} />
                </div>
            </div> 
            <div className='StartingPrice'>
            <div><b>Starting price: </b>{data.StartingPrice} SEK</div>
            <p><b>Description: </b>{data.Description}</p>
            <div>Seller: <b>{data.CreatedBy}</b></div>
            <p><b>Startdate:</b> {data.StartDate}</p>
            <p><b>Enddate: </b>{data.EndDate}</p>
            </div>
        </ul>
    );
}

function BidForm({ bidAmount, setBidAmount, bidderName, setBidderName, handleSubmit }) {
    return (
        <>
            <h3>Place Your Bid</h3>
            <Form.Floating className="mb-3">
                <input
                    className='bidInput'
                    type="number"
                    placeholder="Bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                />
                <input
                    className='bidInput'
                    type="text"
                    placeholder="Bidder"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                /> 
            </Form.Floating>
            <Button variant="success" type="submit" onClick={handleSubmit}>Post Bid</Button>
        </>
    );
}

export default AuctionDetails;
