import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get route parameters (like the product ID)
import { useNavigate } from 'react-router-dom'; // To programmatically navigate to other routes
import "./css/AddProduct.css"; // Import the CSS file for styling

const UpdateProduct = () => {
  // State variables to store product information (name, price, category, company)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  // Get the product ID from the URL using useParams hook
  const params = useParams();

  // useNavigate is used to navigate to other pages programmatically
  const navigate = useNavigate();

  // useEffect runs once when the component loads to fetch the product details
  useEffect(() => {
    getProductDetails();
  }, []);

  // Function to fetch product details based on the product ID from the URL
  const getProductDetails = async () => {
    try {
      // Fetch product details from the server using the product ID
      let response = await fetch(`http://localhost:5000/product/${params.id}`);
      response = await response.json();
      console.warn(response); // Log the response for debugging

      // Set the state variables with the fetched product details
      setName(response.name);
      setPrice(response.price);
      setCategory(response.category);
      setCompany(response.company);
    } catch (error) {
      console.error("Error:", error); // Handle errors in fetching product details
    }
  };

  // Function to update the product details
  const updateProduct = async () => {
    try {
      // Send a PUT request to update the product details on the server
      let response = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: 'PUT', // HTTP method to update the product
        body: JSON.stringify({ name, price, category, company }), // Send updated product details as JSON
        headers: {
          'Content-Type': "application/json" // Specify the content type as JSON
        }
      });
      response = await response.json();

      // If the update is successful, navigate back to the product list page
      if (response) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error: ', error); // Handle errors in updating the product
    }
  };

  return (
    <div className="add-product-container"> {/* Container for styling */}
      <h1>Update Product</h1> {/* Heading for the update form */}

      {/* Input fields for the product name, price, category, and company */}
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      {/* Button to trigger the updateProduct function */}
      <button onClick={updateProduct}>Update product</button>
    </div>
  );
};

export default UpdateProduct;
