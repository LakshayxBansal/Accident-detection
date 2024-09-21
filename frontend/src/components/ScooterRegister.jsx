import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScooterRegister = ({ setScooters }) => {
    const [model, setModel] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/v1/scooter/register', {
                model,
                vehicleNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the scooters state in the parent component
            setScooters(prevScooters => [...prevScooters, response.data.scooter]);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error registering scooter', error);
            setError('Failed to register scooter');
        }
    };

    return (
        <div>
            <h2>Register Scooter</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Model:</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Vehicle Number:</label>
                    <input
                        type="text"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default ScooterRegister;
