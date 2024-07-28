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
    path:'/margrace',
     element:<App />, 
     children:[
      {
        path: '/margrace/register',
        element: <Register />
      },
      {
        path: '/margrace/',
        element: <Login />
      },
      {
        path:'/margrace/home',
         element:<Home /> 
       },
       {
        path:'/margrace/trips',
         element:<Trip /> 
       },
       {
        path:'/margrace/vehicles',
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