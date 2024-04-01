import { useEffect, useState } from 'react';

function CurrentBid({ auctionId, fetchTrigger }) {
    const [currentBid, setCurrentBid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCurrentBid = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://auctioneer.azurewebsites.net/bid/h4i/${auctionId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const bids = await response.json();
                if (Array.isArray(bids) && bids.length > 0) {
                    const highestBid = bids.reduce((max, bid) => bid.Amount > max.Amount ? bid : max, bids[0]);
                    setCurrentBid(highestBid);
                } else {
                    console.log('No bids found for ID:', auctionId);
                    setCurrentBid(null);
                }
            } catch (error) {
                console.error('Error fetching current bid:', error);
                setError('Failed to load bid data.');
                setCurrentBid(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentBid();
    }, [auctionId, fetchTrigger]); // Re-fetch when auctionId or fetchTrigger changes

    if (loading) return <div>Loading current bid...</div>;
    if (error) return <div>{error}</div>;
    if (!currentBid) return <div>No bids at the moment</div>;

    return (
        <div>
            <div>
                <b>{currentBid.Amount} SEK</b> by <b>{currentBid.Bidder}</b>
            </div>
        </div>
    );
}

export default CurrentBid;
