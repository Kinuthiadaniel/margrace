import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useOutletContext } from "react-router-dom";
import {SERVER_URL} from '../constant'

function Home() {

  const [user, setUser] = useState("")

  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    fetch(`${SERVER_URL}/vehicles`)
      .then(response => response.json())
      .then(data => {
        const userdata = data.filter(item => user.id === item.user_id)
        console.log(userdata)
        const formattedData = userdata.map(vehicle => ({
          vin: vehicle.vin,
          make: vehicle.make
        
        }));
      setVehicles(formattedData);
        
      })
      .catch(error => console.error('Error fetching Vehicle:', error));
  };
  console.log(vehicles)

  return (
    <section>
 
      <br />
      <br />
      <section className="relative w-full">
        <div className="relative bg-gradient-to-t from-blue-100 to-blue-400">
          <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div className="w-full md:w-auto flex-col md:flex-row items-center justify-center">
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/')}>
                Home
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/trips')}>
                Trips
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/vehicles')}>
                Vehicles
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/register')}>
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