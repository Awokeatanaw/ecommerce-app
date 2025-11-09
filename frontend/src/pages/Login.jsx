// src/pages/Login.js
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post('http://localhost:4000/api/user/register', {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully!');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post('http://localhost:4000/api/user/login', {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Logged in successfully!');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <section className="w-screen min-h-screen bg-gray-50 flex items-center justify-center py-6 sm:py-12">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md animate-fadeIn"
      >
        <div className="inline-flex items-center gap-2 mb-6">
          <p className="prata-regular text-3xl text-primary">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-primary" />
        </div>
        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent mb-4"
            placeholder="Name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent mb-4"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent mb-4"
          placeholder="Password"
          required
        />
        <div className="w-full flex justify-between text-sm text-gray-600 mb-6">
          <p className="cursor-pointer hover:text-accent">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:text-accent">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:text-accent">
              Login here
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors duration-300"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </section>
  );
};

export default Login;