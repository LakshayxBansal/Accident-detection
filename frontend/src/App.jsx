import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Replace Switch with Routes
import Signup from './components/ Signup'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterScooter from './components/ScooterRegister' // If you have a scooter registration page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register-scooter" element={<RegisterScooter />} />
            </Routes>
        </Router>
    );
};

export default App;
