import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login"; // Ensure the file name starts with uppercase 'L'
import AddProduct from "./components/AddProduct";
import Productlist from "./components/Productlist";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Protected routes */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Productlist />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout</h1>} /> {/* Placeholder */}
            <Route path="/profile" element={<h1>Profile</h1>} /> {/* Placeholder */}
          </Route>

          {/* Public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
