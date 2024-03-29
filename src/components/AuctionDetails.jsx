import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentBid from './CurrentBid';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import './AuctionDetails.css';



function AuctionDetails() {
    const [data, setData] = useState({});
    const location = useLocation();

    const [bid, setBid] = useState('');
    const [bidder, setBidder] = useState('');
    const [groupCode, setGroupCode] = useState('h4i');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchTrigger, setFetchTrigger] = useState(false);

    const fetchDetails = async (AuctionID) => {
        try {
            const api = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${AuctionID}`);
            const detailData = await api.json();
            if (Object.keys(detailData).length > 0) { 
                setData(detailData); 
            } else {
                console.error('No details found for ID:', AuctionID);
                setData({}); 
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        }
    };

    useEffect(() => {
        const lastPartOfLocationPath = location.pathname.split('/').slice(-1)[0];
        fetchDetails(lastPartOfLocationPath);
    }, [location]);


  const handleSubmit = async (e, AuctionID) => {
    e.preventDefault();

    try {
      const response =await fetch('https://auctioneer.azurewebsites.net/bid/h4i', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Amount: bid,
            AuctionID: AuctionID, 
            Bidder: bidder,
            GroupCode: groupCode,
          }),
        });
  

        if (!response.ok){
          if(response.status === 400 ) {
            const errorMessage = (await response.text()).replace("Bad Request", "Please try again!");
            setErrorMessage(errorMessage);
          }
        } else {
          setBid("");
          setBidder('');
          setFetchTrigger(prevState => !prevState);
        }
      } catch (error) {
        console.error("fetch error:", error);
      }
    };
    const handleDeleteAuction = async () => {
      try {
          const response = await fetch(`https://auctioneer.azurewebsites.net/auction/h4i/${data.AuctionID}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              // Auction deleted successfully, you may want to perform any necessary cleanup actions here
              console.log('Auction deleted successfully');
              // Optionally, you can navigate the user to a different page after deletion
              // history.push('/some-other-route');
          } else {
              console.error('Failed to delete auction');
              setErrorMessage('Failed to delete auction');
          }
      } catch (error) {
          console.error('Error deleting auction:', error);
          setErrorMessage('Error deleting auction');
      }
    };



    return (
        <div>
            
                <div className='BidCard'>
                  
                    <ul>
                        <b>{data.AuctionID}</b>
                        <h2>{data.Title}</h2>
                        <div className="dropdown">
                          <button className="dropbtn">Current bid</button>
                          <div className="dropdown-content">
                            
                            <CurrentBid  auctionId ={data.AuctionID} fetchTrigger={fetchTrigger} />
                       
                          </div>
                        </div> 
                        <div><b>Starting price: </b>{data.StartingPrice}:-</div>
                        <p><b>Description: </b>{data.Description}</p>
                        <div>Seller: <b>{data.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {data.StartDate}</p>
                        <p><b>Enddate: </b>{data.EndDate}</p>

                    </ul>

                    <h2>Place Your Bid</h2>
                   
                    <Form.Floating className="mb-3">
                    
                        <input
                          className='bidInput'
                          type="number"
                          placeholder="Bid"
                          value={bid}
                          onChange={(e)=> setBid(e.target.value)}
                        />
                        <input
                          className='bidInput'
                          type="text"
                          placeholder="bidder"
                          value={bidder}
                          onChange={(e) => setBidder(e.target.value)}
                        /> 
                      </Form.Floating>
                      <Button variant="success" type="submit" onClick={(e) => handleSubmit(e, data.AuctionID)}>Post Bid</Button>{''}

                    {errorMessage && (
                        <div className="alert alert-danger position-relative" role="alert">
                          <button type="button" 
                                  className="btn-close position-absolute top-0 end-0 mt-1 me-2" 
                                  aria-label="Close" 
                                  onClick={() => setErrorMessage('')}>
                          </button>
                          <span className="d-block py-2 px-4">{errorMessage}</span>
                        </div>
                      )}
                  </div>
                  <Button variant="danger" onClick={handleDeleteAuction}>Delete Auction</Button>
                  {/* Render the DeleteAuction component if needed */}
                  {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                          {errorMessage}
                      </div>
                  )}
        </div>
        
    );
}    


export default AuctionDetails;