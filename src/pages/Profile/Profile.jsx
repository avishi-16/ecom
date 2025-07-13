import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Lottie from 'lottie-react';
import Loading from '../../animations/loading.json'
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }

          
          const orderQuery = query(collection(db, 'orders'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(orderQuery);
          const userOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(userOrders);
        } catch (error) {
          console.error('Error loading profile or orders:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
  return (
      <div style={{ width: 400}}>
        <Lottie animationData={Loading} loop={true} />
    </div>
  );
}
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
      <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
      <hr />
      <h3>My Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.paymentId}</p>
              <p><strong>Amount:</strong> ₹{order.amount}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} × {item.qty} = ₹{item.price * item.qty}</li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
      <button className='logout' onClick={() => navigate('/logout')}>Logout</button>
    </div>
  );
};

export default Profile;
