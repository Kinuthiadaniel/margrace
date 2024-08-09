import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import {SERVER_URL} from '../constant'

function Register() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate()

  const autRegister = async (e) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);

  
    const newErrors = {};
    if (!first_name) newErrors.first_name = 'First name is required.';
    if (!last_name) newErrors.last_name = 'Last name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!password) newErrors.password = 'Password is required.';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFirst_name('');
        setLast_name('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        navigate('/message')
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-r from-blue-100 to-blue-400">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center lg:bg-[url('https://lilacinfotech.com/lilac_assets/images/blog/What-Is-E-commerce-and-what-are-its-Applications.jpg')]"></div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-2xl text-center capitalize mb-4 text-black font-semibold">Register With Us</h2>
            <form onSubmit={autRegister}>
              <div className="grid grid-cols-2 gap-5">
                <div className='mb-3'>
                  <label htmlFor="name" className="mb-2 text-sm text-start font-semibold text-gray-400">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="flex items-center border border-blue-300 w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                  {errors.first_name && <div className="text-red-500 text-sm capitalize rounded-md">{errors.first_name}</div>}
                </div>
                <div>
                  <label htmlFor="name" className="mb-2 text-sm text-start font-semibold text-gray-400">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="flex items-center border border-blue-300 w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                  {errors.last_name && <div className="text-red-500 text-sm capitalize rounded-md">{errors.last_name}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="mb-2 text-sm text-start font-semibold text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="flex items-center border border-blue-300 w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="text-red-500 text-sm capitalize rounded-md">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="mb-2 text-sm text-start font-semibold text-gray-400">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="flex items-center border border-blue-300 w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="text-red-500 text-sm capitalize rounded-md">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="mb-2 text-sm text-start font-semibold text-gray-400">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="flex items-center border border-blue-300 w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="text-red-500 text-sm capitalize rounded-md">{errors.confirmPassword}</div>}
              </div>
              <div className="pt-3">
                <button className="w-full bg-[#4169E1] py-3 text-center text-white flex justify-center items-center">
                  {loading ? <ClipLoader color="#fff" size={20} /> : 'Register Now'}
                </button>
              </div>

              {errors.general && <div className="text-red-500 text-sm capitalize rounded-md mt-3">{errors.general}</div>}

              <p className="text-sm text-center pt-5 capitalize leading-relaxed text-gray-900">
                Already have an account? <a href="/login" className="font-bold text-[#4169E1] text-grey-700">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;