import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Product from './components/Product';
import Checkout from './components/Checkout'; 
import './App.css'; 

const HomePage = ({ cart, addToCart }) => {
  return (
    <>
      <Hero />
      <Product cart={cart} addToCart={addToCart} />
    </>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className='app-container'>
      <Header />
      <main>
        <Routes>
          {/* Rute untuk halaman utama */}
          <Route 
            path="/" 
            element={<HomePage cart={cart} addToCart={addToCart} />} 
          />
          {/* Rute untuk halaman checkout */}
          <Route 
            path="/checkout" 
            element={<Checkout cartItems={cart} setCart={setCart} />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;