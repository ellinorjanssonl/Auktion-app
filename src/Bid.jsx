import React, { useState } from "react";
import styled from "styled-components";

const Bid = ({ AuctionID, StartingPrice, BidID }) => {
  const [amount, setAmount] = useState("");
  const [bidder, setBidder] = useState("");
  const [groupcode, setGroupCode] = useState("");
  const [auctionID, setAuctionID] = useState(AuctionID);
  const [bidID, setBidID] = useState(BidID);
  const [message, setMessage] = useState(""); 

  const Message = styled.div`
    color: red;
    font-weight: bold;
  `;

  const API_POST = `https://auctioneer.azurewebsites.net/bid/${AuctionID}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    setMessage("");

    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setMessage("Please enter a valid bid amount.");
      return;
    }

   
    if (parseFloat(amount) < parseFloat(StartingPrice)) {
      setMessage("Bid amount is too low.");
      return;
    }

    try {
      const response = await fetch(API_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AuctionID: auctionID,
          Amount: amount,
          Bidder: bidder,
          GroupCode: "x1y",
          BidID: bidID,
        }),
      });

      if (response.ok) {
        setMessage("Bid placed successfully!");
        setAmount("");
        setBidder("");
        setGroupCode("");
        setAuctionID("");
        setBidID("");
      } else {
        console.error("Failed to place bid:", response.statusText);
        setMessage("Failed to place bid. Please try again later.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Failed to place bid. Please try again later.");
    }
  };

  return (
    <div>
      <Message>{message}</Message>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Bid amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bidder"
          value={bidder}
          onChange={(e) => setBidder(e.target.value)}
        />
        <input
          type="text"
          placeholder="GroupCode"
          value={groupcode}
          onChange={(e) => setGroupCode(e.target.value)}
        />
        <button type="submit">Bid</button>
      </form>
    </div>
  );
};

export default Bid;