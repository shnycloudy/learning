import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Product from './components/Product';

function App() {
  return (
    <div className='app-container'>
      <Header />
      <Hero />
      <Product/>
      <Footer />
    </div>
  );
}

export default App;
