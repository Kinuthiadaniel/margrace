import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useOutletContext } from "react-router-dom";

function Home() {

  const [user, setUser] = useOutletContext()

  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    fetch('https://fleet-api1.onrender.com/vehicles')
      .then(response => response.json())
      .then(data => {
        const userdata = data.filter(item => user.id === item.user_id)
        console.log(userdata)
        const formattedData = userdata.map(vehicle => ({
          vin: vehicle.vin,
          make: vehicle.make
        
        }));
        if (user) {setVehicles(formattedData);}
        
      })
      .catch(error => console.error('Error fetching Vehicle:', error));
  };
  console.log(vehicles)

  return (
    <section>
      <NavBar />
      <br />
      <br />
      <section className="container">
        <div className="row">
          <div className="col-3 border shadow-sm">
            <div className="d-flex flex-column">
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/margrace/home')}>
                Home
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/margrace/trips')}>
                Trips
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/margrace/vehicles')}>
                Vehicles
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/margrace/')}>
                Profile
              </button>
            </div>
          </div>
          <div className="col-9">
           {user && <h2 className="p-3 mb-2 bg-warning-subtle text-warning-emphasis">
              Welcome {user.name} to Margrace Services LTD
            </h2>}
            <div className="row">
              <div className="col-md-12 mb-4">
                <h3>Vehicle List</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">VIN</th>
                      <th scope="col">MAKE</th>
                  
                    </tr>
                  </thead>
                  {vehicles && <tbody>

                    {vehicles.map((vehicle, index) => (
                      <tr key={index}>
                       
                        <td>{vehicle.vin}</td>
                        <td>{vehicle.make}</td>
                      </tr>
                    ))}
                  </tbody>}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;