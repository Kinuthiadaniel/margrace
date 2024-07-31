import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import './Register.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";



const Register = () => {
  const navigate=useNavigate()
  const [user, setUser] = useOutletContext()
  
  const [refreshPage, setRefreshPage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name").max(15),
    password: yup
      .string()
      .required("Must enter password")
      .min(8, 'Password must be at least 8 characters'),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
            try {
                 fetch('https://fleet-api1.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }).then ((response) => {if (response.ok) {
                  response.json()
                  .then(data => {
                  localStorage.setItem('access_token', data.access_token)
                  setUser(data.user)
                  }).then( navigate('/margrace.vercel.app'))
                    

                  
                } else {
                    console.error('Login failed:', response.statusText);
                    alert('Register failed. Please check your credentials.');
                }}
            )
                
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again later.');
            }
        },
  });

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Hello, Create account</h2>
        <div><p>Already have an account? <a onClick={() => navigate('/margrace.vercel.app')} >Login</a></p> </div>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            id="email"
            name="email"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p style={{ color: "red" }}> {formik.errors.email}</p>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            name="name"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p style={{ color: "red" }}> {formik.errors.name}</p>

          <label htmlFor="password">Password</label>
          <br />

          <input
            id="password"
            name="password"
            className="input"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          /><br></br>
          <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
            {showPassword ? 'Hide' : 'Show Password'}
          </button>
          <p style={{ color: "red" }}> {formik.errors.password}</p>
          <button type="submit" className="button">CREATE ACCOUNT</button>
        </form>

        {/* <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>name</th>/
            <th>email</th>/
            <th>password</th>
          </tr>
          {users === "undefined" ? (
            <p>Loading</p>
          ) : (
            users.map((user, i) => (
              <>
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table> */}

      </div>

    </div>
  );
};

export default Register