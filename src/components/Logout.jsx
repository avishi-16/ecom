import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        navigate('/register');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    doLogout();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
