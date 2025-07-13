import { useCart } from '../../Context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pin: '',
    street: '',
    city: '',
    state: '',
  });

  const navigate = useNavigate();

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_a0EUN7ufJFqAmQ',
      amount: getTotalAmount() * 100,
      currency: 'INR',
      name: 'ShopNShine',
      description: 'Order Payment',
      image: '/logo.png',
      handler: async function (response) {
        alert('✅ Payment Successful\nPayment ID: ' + response.razorpay_payment_id);

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            try {
              await addDoc(collection(db, 'orders'), {
                uid: user.uid,
                paymentId: response.razorpay_payment_id,
                amount: getTotalAmount(),
                items: cartItems,
                address,
                createdAt: serverTimestamp()
              });
                 clearCart();
              unsubscribe();
              navigate('/profile');
            } catch (error) {
              console.error('Error saving order:', error);
            }
          }
        });
      },
      method: {
        netbanking: true,
        card: false,
        upi: true,
        wallet: true,
      },
      prefill: {
        name: address.name || 'User',
        contact: address.phone || '9999999999'
      },
      notes: {
        address: `${address.street}, ${address.city}, ${address.state} - ${address.pin}`
      },
      theme: {
        color: '#aa2f89'
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-container">
      <h2>Order Details</h2>

      <div className="checkout-content">
        <form className="address-form" onSubmit={handleSubmit}>
          <h3>Shipping Address</h3>
          <input type="text" name="name" placeholder="Full Name" value={address.name} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
          <input type="text" name="pin" placeholder="Pin Code" value={address.pin} onChange={handleChange} required />
          <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} required />
          <button type="submit" className="continue-btn">Continue</button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} ({item.qty})</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <h3>Total</h3>
            <h3> ₹{getTotalAmount()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
