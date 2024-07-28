import React, { useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'
import { useOutletContext } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useOutletContext()

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            try {
                 fetch('https://fleet-api1.onrender.com/login', {
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
                  }).then( navigate('/home'))
                    


                } else {
                    console.error('Login failed:', response.statusText);
                    alert('Login failed. Please check your credentials.');
                }}
            ) 
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again later.');
            }
        },
    });

    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an account? <a onClick={() => navigate("margrace/register")}>Register</a></p>
            </div>
        </div>
    );
};

export default Login;