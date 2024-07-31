import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


function NavBar () {

  const [user, setUser] = useOutletContext()

    const navigate = useNavigate()

    const handleLogOut = () => {
      localStorage.removeItem("access_token")
      setUser(null)
      navigate("/margrace")
    }

    return (
        <nav className=" navbar bg-body-tertiary">
            <div className=" container-fluid ">
              <a className="navbar-brand" >MARGRACE SERVICES LTD</a>
              <form className='d-flex'>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/home')}>
                Home
              </button>
                <button className="btn btn-outline-success" type="button" onClick={() => navigate('/vehicles')}>
                  Vehicles
                </button>
                <button className="btn btn-outline-success " type="button " onClick={() => navigate('/trips')}>
                  Trips
                </button>
                {/* <button className="btn btn-outline-success" type="button" onClick={() => navigate('/margrace/maintenances')}>
                  Maintenances
                </button> */}
                <button className="btn btn-outline-success " type="button " onClick= {handleLogOut}>
                  LOGOUT
                </button>
                </form>
            </div>
          </nav>
    )
}

export default NavBar