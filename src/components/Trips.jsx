import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { useOutletContext } from "react-router-dom";

const TripSchema = Yup.object().shape({
    user_id: Yup.number().required("User id is required"),
    vehicle_id: Yup.string().required("Vehicle id is required"),
    destination: Yup.string().required("Destination is required"),
    date: Yup.date().required("Date is required")

});

const Trip = () => {
    // const [user, setUser] = useState("");

    const [trips, setTrips] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [editedUserId, setEditedUserId] = useState("");
    const [editedVehicleId, setEditedVehicleId] = useState("");
    const [editedDestination, setEditedDestination] = useState("")
    const [editedDate, setEditedDate] = useState("");


    useEffect(() => {
        fetch("https://fleet-api1.onrender.com/trips")
            .then((response) => response.json())
            .then((data) => {
                // const userdata = data.filter((item) => user.id === item.user_id);
                // console.log(userdata);
                setTrips(data)

            })
            .catch((error) => console.error("Error fetching trips:", error));
    }, []);

    const addTrip = (trip) => {
        fetch("https://fleet-api1.onrender.com/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...trip}),
        })
            .then((response) => response.json())
            .then((newTrip) => {
                setTrips([...trips, newTrip]);
            })
            .catch((error) => {
                console.error("Error adding trip:", error);
                alert("Failed to add trip");
            });
    };

    const updateTrip = (updatedTrip) => {
        fetch(
            `https://fleet-api1.onrender.com/trips/${updatedTrip.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTrip),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(
                            `Failed to update trip: ${response.status} ${response.statusText} - ${text}`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                const updatedTrips = trips.map((trip) => {
                    if (trip.id === updatedTrip.id) {
                        return { ...trip, ...updatedTrip };
                    }
                    return trip;
                });
                setTrips(updatedTrips);
                setEditingItem(null); // Clear the editing state
            })
            .catch((error) => {
                console.error("Error updating trip:", error);
                alert(`Failed to update trip: ${error.message}`);
            });
    };

    const deleteItem = (id) => {
        console.log(id)
        fetch(`https://fleet-api1.onrender.com/trips/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setTrips(trips.filter((trip) => trip.id !== id));
                } else {
                    alert("Failed to delete trip");
                }
            })
            .catch((error) => {
                console.error("Error deleting trip:", error);
                alert("Failed to delete trip");
            });
    };

    const handleEdit = (id, user_id, vehicle_id, destination, date) => {
        setEditingItem(id);
        setEditedUserId(user_id);
        setEditedVehicleId(vehicle_id);
        setEditedDestination(destination);
        setEditedDate(date);


    };

    const handleSave = (id) => {
        const updatedTrip = {
            id,
            user_id: editedUserId,
            vehicle_id: editedVehicleId,
            destination: editedDestination,
            date: editedDate

        };
        updateTrip(updatedTrip);
    };


    return (
        <div>
            {trips.map((trip) => (
                <div key={trip.id} className="card">
                </div>
            ))}

          
            <div className="expense-tracker">
                <Formik
                    initialValues={{
                        user_id: "",
                        vehicle_id: "",
                        destination: "",
                        date: "",

                    }}
                    validationSchema={TripSchema}
                    onSubmit={(values, { resetForm }) => {
                        addTrip(values);
                        resetForm();
                    }}
                >
                    {() => (
                        <div className="expense-form-container">
                            <Form className="expense-form">
                                <div>
                                    <label>user id</label>
                                    <Field name='user_id' type="number" />
                                    <ErrorMessage name='user_id' component="div" />
                                </div>
                                <div>
                                    <label>vehicle id</label>
                                    <Field name='vehicle_id' type="number" />
                                    <ErrorMessage name='vehicle_id' component="div" />
                                </div>
                                <div>
                                    <label>destination</label>
                                    <Field name='destination' type="text" />
                                    <ErrorMessage name="destination" component="div" />
                                </div>
                                <div>
                                    <label>date</label>
                                    <Field name='date' type="date" />
                                    <ErrorMessage name="date" component="div" />
                                </div>



                                <button type="submit">Add Trip</button>
                            </Form>
                        </div>
                    )}
                </Formik>

                <div className="budget-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User id</th>
                                <th scope="col">Vehicle_id</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Date</th>

                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map(
                                ({ id, user_id, vehicle_id, destination, date }) => (
                                    <tr key={id}>
                                        <td>
                                            {editingItem === id ? (
                                                <input
                                                    type="text"
                                                    value={editedUserId}
                                                    onChange={(e) => setEditedUserId(e.target.value)}
                                                />
                                            ) : (
                                                user_id
                                            )}
                                        </td>
                                        <td>
                                            {editingItem === id ? (
                                                <input
                                                    type="text"
                                                    value={editedVehicleId}
                                                    onChange={(e) => setEditedVehicleId(e.target.value)}
                                                />
                                            ) : (
                                                vehicle_id
                                            )}
                                        </td>
                                        <td>
                                            {editingItem === id ? (
                                                <input
                                                    type="text"
                                                    value={editedDestination}
                                                    onChange={(e) => setEditedDestination(e.target.value)}
                                                />
                                            ) : (
                                                destination
                                            )}
                                        </td>


                                        <td>
                                            {editingItem === id ? (
                                                <input
                                                    type="date"
                                                    value={editedDate}
                                                    onChange={(e) => setEditedDate(e.target.value)}
                                                />
                                            ) : (
                                                date
                                            )}
                                        </td>

                                        <td>
                                            {editingItem === id ? (
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() => handleSave(id)}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteItem(id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() =>
                                                            handleEdit(
                                                                id,
                                                                date,
                                                                destination,
                                                                user_id,
                                                                vehicle_id,

                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Trip;
