import { useState, useEffect } from 'react';

// BidList component that either shows the highest bid or all bids for a given auction
const BidList = ({ AuctionId, showHighestOnly }) => {
    const [bids, setBids] = useState([]);
    const [highestBid, setHighestBid] = useState(null);

    // Fetch bids whenever the AuctionId changes
    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await fetch(`https://auctioneer.azurewebsites.net/bid/h4i/${AuctionId}`);
                const data = await response.json();
                console.log("Fetched bids:", data);
                setBids(data);

                // Calculate the highest bid if there are any bids
                if (data.length > 0) {
                    const maxBid = Math.max(...data.map(bid => bid.Amount));
                    console.log("Max bid:", maxBid);
                    setHighestBid(maxBid);
                } else {
                    setHighestBid(null);
                }
            } catch (error) {
                console.error('Error fetching bids: ', error);
            }
        };

        fetchBids();
    }, [AuctionId]);

    return (
        <>
            {showHighestOnly ? (
                highestBid !== null ? (
                    <p style={{ color: 'red' }}><b>Final price: {highestBid} SEK</b></p>
                ) : (
                    <p style={{ color: 'blue' }}><b>No bids</b></p>
                )
            ) : (
                bids.length === 0 ? (
                    <p style={{ color: 'blue' }}><b>No bids</b></p>
                ) : (
                    <div>
                        <p>All Bids:</p>
                        <ul>
                            {bids
                                .sort((a, b) => b.Amount - a.Amount) // Sort bids in descending order by amount
                                .map((bid, index) => (
                                    <li key={index}>
                                        <p>Bid: {bid.Amount} SEK by {bid.Bidder}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )
            )}
        </>
    );
};

export default BidList;
