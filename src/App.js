import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Trip from './components/Trips';
import Vehicle from './components/Vehicle'
import Contact from "./components/contact";
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { checkToken } from './utils/TokenExp';
import { UseAuthContext } from './hook/UseAuthContext';
import { useEffect } from 'react';



function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
function App() {
  const { dispatch } = UseAuthContext();

  useEffect(() => {
    checkToken(dispatch);

    const intervalId = setInterval(() => checkToken(dispatch), 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trip />} />
            <Route path="/vehicles" element={<Vehicle />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: '/margrace',
//     element: <App />,
//     children: [
//       {
//         path: '/margrace/register',
//         element: <Register />
//       },
//       {
//         path: '/margrace/',
//         element: <Login />
//       },
//       {
//         path: '/margrace/home',
//         element: <Home />
//       },
//       {
//         path: '/margrace/trips',
//         element: <Trip />
//       },
//       {
//         path: '/margrace/vehicles',
//         element: <Vehicle />
//       }
//     ]
//   }

// ])





// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>


//     <RouterProvider router={router} />


//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
