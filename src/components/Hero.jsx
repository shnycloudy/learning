import { Fragment } from "react";
import dining from '../assets/dining.png';
import living from '../assets/living.png';
import bedroom from '../assets/bedroom.png';

function Hero() {
  return (
    <>
      <section className="discover-hero">
        <div className="hero-text">
          <p className="new-arrival">New Arrival</p>
          <h1>Discover Our<br />New Collection</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="btn-buy">BUY NOW</button>
        </div>
      </section>

      <section className="browse-range">
        <h2>Browse The Range</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div className="range-grid">
          <div className="range-item">
            <img src={dining} alt="dining" />
            <h3>Dining</h3>
          </div>
          <div className="range-item">
            <img src={living} alt="living" />
            <h3>Living</h3>
          </div>
          <div className="range-item">
            <img src={bedroom} alt="bedroom" />
            <h3>Bedroom</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
