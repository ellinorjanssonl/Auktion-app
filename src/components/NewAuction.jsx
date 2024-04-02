import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import './AuctionDetails.css';

const NewAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startingPrice: "",
    createdBy: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_POST = "https://auctioneer.azurewebsites.net/auction/h4i";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, startDate, endDate, startingPrice, createdBy } = formData;
    
    if (!title || !description || !startDate || !endDate || !startingPrice || !createdBy) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(API_POST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, GroupCode: "" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          startingPrice: "",
          createdBy: ""
        });
      } else {
        setIsError(true);
        console.error("Failed to post auction");
      }
    } catch (error) {
      setIsError(true);
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
   
    <FormContainer>
       <div className="NewAuction">
      <h1>Create a new auction</h1>
      <Form onSubmit={handleSubmit}>
        {["title", "description", "startingPrice", "createdBy"].map((field) => (
          <Form.Group className="mb-3" key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type={field === "description" ? "textarea" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              as={field === "description" ? "textarea" : "input"}
            />
          </Form.Group>
        ))}

        {["startDate", "endDate"].map((field) => (
          <Form.Group className="mb-3" key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type="datetime-local"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </Form.Group>
        ))}

        <Button className="buttoncreate" variant="primary" type="submit">Post Auction</Button>
      </Form>
      {isSuccess && <Alert variant="success">Your auction has been successfully posted!</Alert>}
      {isError && <Alert variant="danger">Failed to post auction. Please try again later.</Alert>}
      {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.div`
`;

export default NewAuction;

