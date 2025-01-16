import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No token found");
      setError('No token found');
      setLoading(false);  // Set loading to false
      return;
    }

    // Fetch user profile if token exists
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);  // Set loading to false after the request is complete
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;  // Display loading while fetching data
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h1>User Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserProfilePage;
