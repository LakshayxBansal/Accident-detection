import React from 'react';

const ScooterDetails = ({ scooters }) => {
    console.log('Scooters in ScooterDetails:', scooters); // Log scooters to verify data

    return (
        <div>
            <h3>Your Scooters</h3>
            <ul>
                {scooters.length > 0 ? (
                    scooters.map((scooter) => (
                        <li key={scooter.id}>
                            Model: {scooter.model}, Vehicle Number: {scooter.vehicleNumber}
                        </li>
                    ))
                ) : (
                    <li>No scooters found.</li>
                )}
            </ul>
        </div>
    );
};

export default ScooterDetails;
