import React, { useState } from 'react';
import axios from 'axios';
import "./css/AddProduct.css"; // Import the CSS file

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);

  const isValidPrice = (price) => !isNaN(price) && price > 0;

  const addProduct = async () => {
    // Form validation
    if (!name || !price || !category || !company || !isValidPrice(price)) {
      setError(true);
      return; // Exit the function if validation fails
    }

    // Clear any previous error state
    setError(false);

    console.warn({ name, price, category, company });

    const userId = JSON.parse(localStorage.getItem('users'))._id;
    console.log(userId);

    try {
      const response = await axios.post("http://localhost:5000/add-product", {
        name,
        price,
        category,
        company,
        userId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data); // Log the response data
      alert("Product added successfully!"); // Show success message or handle it as needed

      // Clear input fields after successful submission
      setName('');
      setPrice('');
      setCategory('');
      setCompany('');
    } catch (error) {
      console.error("There was an error adding the product!", error);
      alert(error.response?.data?.message || "Error adding product."); // Informative error message
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addProduct(); // Call addProduct if Enter key is pressed
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {error && !name && <span className="error">Enter product name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {error && (!price || !isValidPrice(price)) && <span className="error">Enter a valid product price</span>}

      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {error && !category && <span className="error">Enter product category</span>}

      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {error && !company && <span className="error">Enter company name of product</span>}

      <button onClick={addProduct}>Add product</button>
    </div>
  );
};

export default AddProduct;
