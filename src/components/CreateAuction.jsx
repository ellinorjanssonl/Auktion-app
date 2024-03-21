import React, { useState } from "react";
import "./CreateAuction.css";

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [auctionAdded, setAuctionAdded] = useState(false); // New state for tracking if auction is added

  const createAuction = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://auctioneer.azurewebsites.net/auction/h4i",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GroupCode: "h4i",
          Title: title,
          Description: description,
          StartingPrice: startingPrice,
          StartDate: startDate,
          EndDate: endDate,
          CreatedBy: createdBy,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Auktion skapad:", data);
      // Reset form fields
      setTitle("");
      setDescription("");
      setStartingPrice("");
      setStartDate("");
      setEndDate("");
      setCreatedBy("");
      // Set auctionAdded to true to display notification
      setAuctionAdded(true);
      // Reset auctionAdded after 3 seconds
      setTimeout(() => {
        setAuctionAdded(false);
      }, 3000);
    } else {
      console.error("Fel vid skapande av auktion");
    }
  };

  return (
    <div>
      <form className="FormContainer" onSubmit={createAuction}>
        <h1 className="h1">Create Auction</h1>
        <input
          className="InputField"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="InputField"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <input
          className="InputField"
          type="text"
          placeholder="Starting price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
        />
        <input
          className="InputField"
          type="date"
          placeholder="Start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="InputField"
          type="date"
          placeholder="End date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          className="InputField"
          type="text"
          placeholder="Created by"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />

        <button className="Button" type="submit">
          Create Auction
        </button>
        {auctionAdded && (
          <p style={{ color: "#fff" }}>Auction added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreateAuction;
