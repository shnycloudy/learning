import React, { useState, useEffect } from "react";
import './Product.css'; // <-- (1) MENGIMPOR FILE CSS BARU
import { FaShareAlt, FaBalanceScale, FaHeart } from "react-icons/fa";
import CartPopup from './CartPopup';

import img1 from '../assets/product/product1.png';
import img2 from '../assets/product/product2.png';
import img3 from '../assets/product/product3.png';
import img4 from '../assets/product/product4.png';
import img5 from '../assets/product/product5.png';
import img6 from '../assets/product/product6.png';
import img7 from '../assets/product/product7.png';
import img8 from '../assets/product/product8.png';

const allProducts = [
  { id: 1, name: "Syltherine", desc: "Stylish cafe chair", price: 2500000, oldPrice: 3500000, tag: "-30%", image: img1, category: "chair" },
  { id: 2, name: "Leviosa", desc: "Stylish cafe chair", price: 2500000, tag: "", image: img2, category: "chair" },
  { id: 3, name: "Lolito", desc: "Luxury big sofa", price: 7000000, oldPrice: 14000000, tag: "-50%", image: img3, category: "sofa" },
  { id: 4, name: "Respira", desc: "Outdoor bar table and stool", price: 500000, tag: "New", image: img4, category: "table" },
  { id: 5, name: "Grifo", desc: "Night lamp", price: 1500000, tag: "", image: img5, category: "lamp" },
  { id: 6, name: "Muggo", desc: "Small mug", price: 150000, tag: "New", image: img6, category: "accessories" },
  { id: 7, name: "Pingky", desc: "Cute bed set", price: 7000000, oldPrice: 14000000, tag: "-50%", image: img7, category: "bedroom" },
  { id: 8, name: "Potty", desc: "Minimalist flower pot", price: 500000, tag: "New", image: img8, category: "accessories" },
];

const formatCurrency = (num) => "Rp " + num.toLocaleString("id-ID");

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, visibleProducts);

  const categories = ["all", ...new Set(products.map(product => product.category))];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const toggleCompare = (product) => {
    const isInCompare = compareList.some(item => item.id === product.id);
    if (isInCompare) {
      setCompareList(prev => prev.filter(item => item.id !== product.id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, product]);
    } else {
      alert("You can only compare up to 3 products!");
    }
  };

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return (
      <section className="product-section">
        <div className="loading-container"><div className="loading-spinner"></div><p>Loading products...</p></div>
      </section>
    );
  }

  return (
    <section className="product-section">
      <div className="product-controls">
        <div className="search-filter-container">
          <input type="text" placeholder="Search products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
            {categories.map(category => (
              <option key={category} value={category}>{category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="stats-container">
          <button className="stat-item cart-button" onClick={toggleCartPopup}>Cart: {totalCartItems} items</button>
          <div className="stat-item">Liked: {likedProducts.length}</div>
          <div className="stat-item">Compare: {compareList.length}/3</div>
        </div>
      </div>

      <h2 className="product-title">Our Products</h2>
      
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="product-img-wrapper">
              <img src={item.image} alt={item.name} />
              {item.tag && <span className={`tag ${item.tag === "New" ? "new" : "discount"}`}>{item.tag}</span>}
              <div className="overlay">
                <button className="btn-cart" onClick={() => addToCart(item)}>Add to cart</button>
                <div className="overlay-actions">
                  <span><FaShareAlt /> Share</span>
                  <span onClick={() => toggleCompare(item)} className={compareList.some(p => p.id === item.id) ? "active" : ""}>
                    <FaBalanceScale /> Compare
                  </span>
                  <span onClick={() => toggleLike(item.id)} className={likedProducts.includes(item.id) ? "liked" : ""}>
                    <FaHeart /> Like
                  </span>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <p className="price">
                {formatCurrency(item.price)}
                {item.oldPrice && <span className="old-price">{formatCurrency(item.oldPrice)}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {isCartOpen && <CartPopup items={cart} onClose={toggleCartPopup} />}
      
      {/* (2) BLOK <style jsx> SUDAH DIHAPUS DARI SINI */}
    </section>
  );
};

export default Product;