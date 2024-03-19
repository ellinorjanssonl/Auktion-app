import React, { useEffect, useState } from 'react'; // Importera useState
import './AuctionList.css';
import { Link } from 'react-router-dom'; // Importera Link

const AuctionList = () => {
    const [data, setData] = useState([]);

    const guid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (c === 'x' ? Math.random() * 16 | 0 : (Math.random() * 16 | 0) & 0x3 | 0x8).toString(16));

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://auctioneer.azurewebsites.net/auction/h4i');
            const data = await response.json();
            setData(data);
        };

        fetchData(); 
    }, []); // Dependency-arrayen är tom för att undvika oändliga loopar

    return (
        <div>
            <h1 className='header'>Auctions</h1>
            <ul className='ul'> 
            {data.map((auction) => (
           <li className='listobjects' key={guid()}>
           <Link className='oncklicklink'to={`/Bid/${auction.Id}`}>
            <h2>{auction.Title}</h2> {/* Gör denna titel klickbar */}
          
               <h4>Description:</h4>
               <p>{auction.Description}</p>
               <h4>Starting price:</h4>
               <p>{auction.StartingPrice}</p>
               <h4>Start and end date:</h4>
               <p>{auction.StartDate}</p>
               <p>{auction.EndDate}</p>
               <h4>Created by:</h4>
               <p>{auction.CreatedBy}</p>
               </Link>
             </li>
            ))}
            </ul> 
        </div>
    );
};

export default AuctionList;



