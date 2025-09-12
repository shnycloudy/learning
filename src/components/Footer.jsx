function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          {/* <h3>Funiro.</h3> */}
          <p>Furniro.</p>
        </div>

        <div className="footer-section links">
          <h4>Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section help">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy Policies</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter Your Email Address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2023 funiro. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
