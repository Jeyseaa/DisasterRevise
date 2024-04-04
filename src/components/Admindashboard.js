import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is an admin (you can fetch this information from your user database)
        // For example, if the user has an 'isAdmin' property set to true
        if (user.isAdmin) {
          setIsAdmin(true);
        } else {
          // If the user is not an admin, redirect to another page (e.g., homepage)
          navigate('/');
        }
      } else {
        // If there is no user (i.e., not logged in), redirect to the login page
        navigate('/admin-login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isAdmin) {
    // If the user is not an admin, do not render the dashboard
    return null;
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard!</h1>
      {/* You can add any content or components you want to display on the dashboard */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
