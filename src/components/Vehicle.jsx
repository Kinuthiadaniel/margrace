import React, { useState, useEffect } from 'react';

// import { useOutletContext } from 'react-router-dom';

const Vehicle = () => {

  const [user, setUser] = useState("")
 
  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');

  const [filter, setFilter] = useState('');
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicle();
  }, [user]);

  const fetchVehicle = () => {
      fetch("https://fleet-api1.onrender.com/vehicles")
        .then((response) => response.json())
        .then((data) => {
          // const userdata = data.filter((item) => user.id == item.user_id);
          // if (user.id) { setBudgets(userdata);}
          setVehicles(data)
        })
        .catch((error) => console.error("Error fetching vehicle:", error));
    
  }
   

  const addVehicle = () => {
    if (!vin  || make) {
      alert('Please fill in all fields');
      return;
    }

    const newVehicle = {
      vin: vin,
      make: make,
     
    };

    fetch('https://fleet-api1.onrender.com/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...newVehicle})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

        setVehicles([...vehicles, data]);
        setMake('');
        setVin(" ");
      })
      .catch(error => {
        console.error('Error adding vehice:', error);
        alert('Failed to add vehicle');
      });
  };

  const deleteVehicle = (id) => {
    fetch(`https://fleet-api1.onrender.com/vehicles/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        } else {
          alert('Failed to delete vehicle');
        }
      })
      .catch(error => {
        console.error('Error deleting vehicle:', error);
        alert('Failed to delete vehicle');
      });
  };

  const filteredVehicles= vehicles.filter(vehicle =>
    vehicle.vin && vehicle.make.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='body'>


      <div className="table-container">
        <form onSubmit={(e) => { e.preventDefault(); addVehicle(); }} className="budget-form">
          <div className="form-group">
            <label>VIN</label>
            <input
              type="text"
              className="form-control"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Make</label>
            <input
              type="number"
              className="form-control"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">Add Vehicle</button>
        </form>
        

        <div className="budget-list">
          <h3>Vehicles</h3>
          <table className="table">
            <thead>
              <tr>
                <th>VIN</th>
                <th>MAKE</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.vin}</td>
                  <td>{vehicle.make}</td>
                  <td>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;