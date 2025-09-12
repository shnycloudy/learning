import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Furniro" className="logo-png" />
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <div className="nav-icons">
        <FaUser />
        <FaSearch />
        <FaHeart />
        <FaShoppingCart />
      </div>
    </header>
  );
}

export default Header;
