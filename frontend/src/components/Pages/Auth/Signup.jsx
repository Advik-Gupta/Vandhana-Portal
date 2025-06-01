import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/register", formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
