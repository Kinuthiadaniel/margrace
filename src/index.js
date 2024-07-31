import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Trip from './components/Trips';
import Vehicle from './components/Vehicle'


const router = createBrowserRouter([
  {
    path:'/margrace.vercel.app',
     element:<App />, 
     children:[
      {
        path: 'margrace.vercel.app/register',
        element: <Register />
      },
      {
        path: '/margrace.vercel.app/',
        element: <Login />
      },
      {
        path:'/margrace.vercel.app/home',
         element:<Home /> 
       },
       {
        path:'/margrace.vercel.app/trips',
         element:<Trip /> 
       },
       {
        path:'/margrace.vercel.app/vehicles',
         element:<Vehicle /> 
       }
     ] 
   }
  
])





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <RouterProvider router={router} />


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
