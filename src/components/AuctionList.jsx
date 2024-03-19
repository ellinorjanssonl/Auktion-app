import React, { useEffect, useState } from 'react'; // Importera useState
import './AuctionList.css';

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
                <li className='listobjects'key={guid()}>{auction.Id}
                    <h2 key={guid()}>{auction.Title}</h2> {/*länka till bidsidan här*/} 
                    <h4 key={guid()}>Description</h4>
                    <p key={guid()}>{auction.Description}</p>
                    <h4 key={guid()}>Starting price</h4>
                    <p key={guid()}>{auction.StartingPrice}</p>
                    <h4 key={guid()}>Start and end date</h4>
                    <p key={guid()}>{auction.StartDate}</p>
                    <p key={guid()}>{auction.EndDate}</p>
                    <h4 key={guid()}>Created by</h4>
                    <p key={guid()}>{auction.CreatedBy}</p>
                </li>   
            ))}
            </ul>
           
        </div>
    );
};

export default AuctionList;



