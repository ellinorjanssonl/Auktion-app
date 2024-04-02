import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const AuctionCard = ({ item, onDelete }) => {
  return (
    <div className='Card'>
      <b>{item.AuctionID}</b>
      <h2>{item.Title}</h2>
      <div><b>Starting price:</b> {item.StartingPrice}:-</div>
      <p><b>Description:</b> {item.Description}</p>
      <div>Seller: <b>{item.CreatedBy}</b></div>
      <p><b>Startdate:</b> {item.StartDate}</p>
      <p><b>Enddate:</b> {item.EndDate}</p>
      <button onClick={() => onDelete(item.AuctionID)}>Delete</button>
    </div>
  );
};

function FutureAuctions() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://auctioneer.azurewebsites.net/auction/h4i');
        const data = await response.json();
        const today = new Date();
        const futureAuctionsData = data.filter(auction => {
          const startDate = new Date(auction.StartDate);
          return startDate > today;
        });
        setData(futureAuctionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load future auctions.');
      }
    };
    fetchData();
  }, []);

  const handleDelete = (auctionId) => {
    setData(prevData => prevData.filter(auction => auction.AuctionID !== auctionId));
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {data.length === 0 ? (
        <Alert variant='warning'>
          There is no Upcoming Auction. You can create <Alert.Link href="/newauction">New Auction</Alert.Link>!
        </Alert>
      ) : (
        data.map((item) => <AuctionCard key={item.AuctionID} item={item} onDelete={handleDelete} />)
      )}
    </div>
  );
}

export default FutureAuctions;
