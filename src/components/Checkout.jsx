import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; 
import './Checkout.css';

const formatCurrency = (num) => "Rp " + num.toLocaleString("id-ID");

const Checkout = ({ cartItems, setCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });
  
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); 
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsOrderPlaced(true);
  };

  const handleReturnHome = () => {
    setCart([]); 
    navigate('/');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 50000;
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Mengubahnya menjadi form agar bisa di-submit */}
        <form className="billing-details" onSubmit={handlePlaceOrder}>
          <h2>Billing Details</h2>
          <div className="form-group-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
        </form>

        <div className="order-summary">
          <h3>Your Order</h3>
          <div className="summary-items">
            {cartItems.length > 0 ? cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} <small>x {item.quantity}</small></span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            )) : <p>Your cart is empty.</p>}
          </div>
          <div className="summary-total">
            <p><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></p>
            <p><span>Shipping</span><span>{formatCurrency(shippingCost)}</span></p>
            <p className="grand-total"><span>Total</span><span>{formatCurrency(total)}</span></p>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Order</button>
        </div>
      </div>

      {/* Pop-up Sukses */}
      {isOrderPlaced && (
        <div className="success-overlay">
          <div className="success-popup">
            <FaCheckCircle className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <button onClick={handleReturnHome} className="return-home-btn">Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;