import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScooterRegister from './ScooterRegister';
import ScooterDetails from './ScooterDetails'; // Import your component

const Dashboard = () => {
    const [scooters, setScooters] = useState([]);

    useEffect(() => {
        const fetchScooters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/v1/scooter/details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setScooters(response.data.scooters);
            } catch (error) {
                console.error('Error fetching scooters:', error);
            }
        };

        fetchScooters();
    }, []); // Fetch scooters on component mount

    return (
        <div>
            <h2>Dashboard</h2>
            <ScooterDetails scooters={scooters} /> {/* Pass scooters as prop */}
            <ScooterRegister setScooters={setScooters} />
        </div>
    );
};

export default Dashboard;
