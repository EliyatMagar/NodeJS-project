import React, { useEffect, useState } from 'react';
import './css/ProductList.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const Productlist = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let response = await fetch(`http://localhost:5000/product/${id}`, {
      method: 'DELETE',
    });

    response = await response.json();
    if (response) {
      alert("Product deleted");
      getProduct(); // Refresh the product list after deletion
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    try {
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if (result.length > 0) {
          setProduct(result);
        } else {
          setProduct([]); // Clear the product list if nothing matches
        }
      } else {
        getProduct(); // Reload the full product list if the search input is cleared
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container"> {/* Centering container */}
     <input type='text' placeholder='searh product' onChange={searchProduct}/>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price(Rs)</th>
            <th>Category</th>
            <th>Company</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
           product.length>0 ? product.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  <Link to={"/update/" + item._id} className="update-link">Update</Link>
                </td>
              </tr>
            ))
            :<h1>No product found:</h1>
          }
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
