// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Static credentials
    const validUsername = 'Owais Rizvi';
    const validPassword = 'Naatacademy@123';

    if (
      formData.username === validUsername &&
      formData.password === validPassword
    ) {
      localStorage.setItem('isLoggedIn', 'true');

      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 2000
      });

      navigate('/dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: 'Please try again.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://static.wixstatic.com/media/562b73_6721f8c4e1584270a7ed8b4d316ef75e~mv2.png/v1/fill/w_75,h_75,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/562b73_6721f8c4e1584270a7ed8b4d316ef75e~mv2.png"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome, User!</h2>
        <p className="text-gray-600 mb-6 text-center">Please log in</p>

        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 pr-10 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/4 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          type="submit"
          value="Log In"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        />
      </form>
    </div>
  );
};

export default Login;
