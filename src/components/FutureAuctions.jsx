import { useState, useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';



function FutureAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/h4i/')
      .then(response => response.json()) 
      .then(data => {
        const today = new Date();
          const futureAuctionsData = data.filter(auction =>{
            const startDate =new Date(auction.StartDate);
            const endDate = new Date(auction.EndDate);
            return startDate > today && endDate >today
          });
          setData(futureAuctionsData)
          console.log(futureAuctionsData)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [data]); 

  const handleDelete = (auctionId) =>{
    setData(prevData => prevData.filter(auction => auction.auctionId !==auctionId ))
  }

  return (
    <div>
     
      { data.length === 0 ?(
        <Alert variant='warning'> There is no Upcoming Auction. You can create{' '} <Alert.Link href="/newauction">New Auction</Alert.Link>!</Alert>

      ): (data.map((item, index) => (
       
        <div key={index} className='Card'> 
      
          <b>{item.AuctionID}</b>
          <h2>{item.Title}</h2>
          <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
          <p><b>Description: </b>{item.Description}</p>
          
          <div>Seller: <b>{item.CreatedBy}</b></div>
          <p><b>Startdate:</b> {item.StartDate}</p>
          <p><b>Enddate: </b>{item.EndDate}</p>

          <DeleteAuction auctionId={item.AuctionID} onDelete={handleDelete}/>
        </div>
      ) 
      )
      )}
     
    </div>
    
  );
}

export default FutureAuctions;