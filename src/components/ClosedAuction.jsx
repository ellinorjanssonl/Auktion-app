import { useState, useEffect} from 'react'
import BidList from './BidList';
import './AuctionDetails.css';

function PastAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/h4i/')
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
       /* This is to filter past auctions EndDate is yesterday or before  */
           const today = new Date();
           const filteredData = data.filter(auction =>{
            const startDate =new Date(auction.StartDate);
            const endDate = new Date(auction.EndDate);
            return endDate < today && startDate <today
           });
          setData(filteredData);// Set the filterdata in state:/
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
       
        <div key={index} className='Card'> 
          <ul className='Cardlist'>
          <h2>{item.Title}</h2>
          <div><b>Starting price: </b><b>{item.StartingPrice} SEK</b></div>
          <p><b>Description: </b>{item.Description}</p>
          
          <div>Seller: <b>{item.CreatedBy}</b></div>
          <p><b>Startdate:</b> {item.StartDate}</p>
          <p><b>Enddate: </b>{item.EndDate}</p>
          </ul>
          <BidList AuctionId={item.AuctionID} showHighestOnly={true}/>
        </div>
       
      ))}
     
    </div>
    
  );
}

export default PastAuctions;