import { useState, useEffect } from 'react'

const BidList = ({AuctionId, showHighestOnly}) => {
    const [bids, setBids] = useState([]);
    const [higestBid, setHighestBid] = useState(null);

    useEffect(() =>{
        fetch(`https://auctioneer.azurewebsites.net/bid/h4i/${AuctionId}`)
         .then(res=> res.json())
         .then(data =>{
            console.log("Fetched bids:", data); 
            setBids(data);
            if(data.length>0){
                const maxBid =Math.max(...data.map(bid => bid.Amount))
                console.log("Max bid:", maxBid);
                setHighestBid(maxBid);
            } else {
                // If there are no bids, set highestBid to null
                setHighestBid(null);
              }
         })
         .catch(error =>{
            console.error('Error fetching bids: ', error);
         });
    }, [AuctionId])

    return (
        <>
          {showHighestOnly && higestBid !== null ? (
            <div>
              <p style={{ color: 'red' }}><b>Final price: {higestBid} SEK</b></p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'blue' }}><b>No bids</b></p>
            </div>
          )}
      
          {!showHighestOnly && (
            <div>
              {bids.length === 0 ? (
                <p style={{ color: 'blue', marginBottom: '10px' }}><b>No bids</b></p>
              ) : (
                <div>

                <p>All Bids: </p> 
                  <ul>
                    {bids
                      .sort((a, b)=> b.Amount - a.Amount) //in descending order
                      .map((bid, index)=>(
                        <li key={index}>
                          <p>Bid: {bid.Amount} Bidder:{bid.Bidder}:- </p>
                        </li>
                      ))}
                  </ul> 
                </div>
              )}
            </div>
          )}
        </>
      );
  }
        

export default BidList