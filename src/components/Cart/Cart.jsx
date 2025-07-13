import './Cart.css';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Empty from '../../animations/Empty red.json'
import Navbar from '../Navbar/Navbar';

const Cart = () => {
    const { cartItems, increaseQty, decreaseQty } = useCart();

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    };

    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h2>Your Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <Lottie animationData={Empty} loop={true} />
                        <p style={{ color: '#aa2f89', fontWeight: '600' }}>Cart is Empty</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-table">
                            <div className="cart-header">
                                <span>Product</span>
                                <span>Name</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Total</span>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-row">
                                    <img src={item.image} alt={item.name} className="cart-img" />
                                    <span>{item.name}</span>
                                    <span>₹{item.price}</span>
                                    <div className="qty-control">
                                        <button onClick={() => decreaseQty(item.id)}>-</button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => increaseQty(item.id)}>+</button>
                                    </div>
                                    <span>₹{item.price * item.qty}</span>
                                </div>
                            ))}
                        </div>

                        <div className="cart-total">
                            <h4>Cart Total: ₹{getTotalAmount()}</h4>
                            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                                Place Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Cart;