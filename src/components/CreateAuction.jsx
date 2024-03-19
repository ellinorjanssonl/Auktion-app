import React, { useState } from 'react';
import './CreateAuction.css';

const CreateAuction = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const createAuction = async (event) => {
        event.preventDefault(); 
        const response = await fetch('https://auctioneer.azurewebsites.net/auction/h4i', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                GroupCode: 'h4i',
                Title: title,
                Description: description,
                StartingPrice: startingPrice,
                StartDate: startDate,
                EndDate: endDate,
                CreatedBy: createdBy,
            })
        });
    
        if(response.ok) {
            const data = await response.json();
            console.log('Auktion skapad:', data);
        } else {
            console.error('Fel vid skapande av auktion');
        }
    };

    return (
        <form className="FormContainer" onSubmit={createAuction}>
            <h1 className='h1'>Create Auction</h1>
            <label className='LabelInput'>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className='LabelInput'>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
            </label>
            <label className='LabelInput'>
                Starting price:
                <input type="text" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} />
            </label>
            <label className='LabelInput'>
                Start date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label className='LabelInput'>
                End date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label className='LabelInput'>
                Created by:
                <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
            </label>
            
            <button className='Button' type="submit">Create Auction</button>
        </form>
    );
};

export default CreateAuction;


