import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  // Extract the user ID from the URL
  const { id } = useParams();

  // Dummy data for users
  const users = [
    { id: 1, name: 'Alice', details: 'Details of Alice' },
    { id: 2, name: 'Bob', details: 'Details of Bob' },
    { id: 3, name: 'Charlie', details: 'Details of Charlie' }
  ];

  // Find the user by ID
  const user = users.find((user) => user.id === parseInt(id));

  return (
    <div>
      <h1>{user ? user.details : 'User not found'}</h1>
    </div>
  );
};

export default UserDetails;
