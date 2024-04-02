import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './CreateAuction.css';

const AuctionCard = ({ auction }) => {
  return (
    <div key={auction.AuctionID} className='Card'>
      <Link className='link' to={`/auctiondetails/${auction.AuctionID}`}>
        <ul className='Listobjects'>
          <h2>{auction.Title}</h2>
          <div><b>Starting price:</b> {auction.StartingPrice}:-</div>
          <p><b>Description:</b> {auction.Description}</p>
          <p>Seller: <b>{auction.CreatedBy}</b></p>
          <p><b>Startdate:</b> {auction.StartDate}</p>
          <p><b>Enddate:</b> {auction.EndDate}</p>
        </ul>
      </Link>
    </div>
  );
};

function CurrentAuctions() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch('https://auctioneer.azurewebsites.net/auction/h4i/');
      const data = await response.json();
      const currentAuctionsData = data.filter(auction => {
        const today = new Date();
        const startDate = new Date(auction.StartDate);
        const endDate = new Date(auction.EndDate);
        return startDate <= today && endDate >= today;
      });

      setAllAuctions(currentAuctionsData);
      setFilteredAuctions(currentAuctionsData); // Set initial filtered auctions to all current auctions
    } catch (error) {
      console.error('Error fetching auctions: ', error);
    }
  };

  useEffect(() => {
    const results = allAuctions.filter(auction =>
      auction.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.CreatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.StartDate.includes(searchTerm) ||
      auction.EndDate.includes(searchTerm)
    );
    setFilteredAuctions(results);
  }, [searchTerm, allAuctions]);

  return (
    <div>
      <div className="searchInput">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 form-control-sx"
            style={{ width: '300px' }}
            aria-label="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>

      <div className="search-results">
        {filteredAuctions.map((item) => <AuctionCard key={item.AuctionID} auction={item} />)}
        {filteredAuctions.length === 0 && <p>No auctions found.</p>}
      </div>
    </div>
  );
}

export default CurrentAuctions;
