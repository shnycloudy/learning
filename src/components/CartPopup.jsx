import React from 'react'; 

const formatCurrency = (num) => "Rp " + num.toLocaleString("id-ID");

const CartPopup = ({ items, onClose, onCheckout }) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-popup-header">
          <h3>Shopping Cart ({totalItems} items)</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (  
            items.map(item => (
              <div key={item.id} className="cart-item-popup">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info-popup">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="cart-total">
              <strong>Total: {formatCurrency(totalPrice)}</strong>
            </div>
            <div className="checkout-container">
              <button className="checkout-btn" onClick={onCheckout}>
                Go to Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default CartPopup;