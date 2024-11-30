import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TailorsSection from './ourtailors';
import Testimonial from './testimonial';
import ReadyToWear from './readytowear';

function HeaderSection({ cartUpdated }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const shouldRenderSections = location.pathname === "/home";

  // Trigger the cart animation when cartUpdated changes
  React.useEffect(() => {
    if (cartUpdated) {
      setAnimateCart(true);
      const timeout = setTimeout(() => setAnimateCart(false), 500); // Reset animation after 500ms
      return () => clearTimeout(timeout);
    }
  }, [cartUpdated]);

  return (
    <>
      <header className="header-section">
        <div className="top-bar">
          <div className="contact-info">
            <span style={{ color: "#efa758" }}>📞 123-456-7890</span>
            <span> | </span>
            <span style={{ color: "#efa758" }}>✉️ info@yoursite.com</span>
          </div>
          <div className="cart-info">
            <div className="action-buttons">
              <button className="sc-button" onClick={() => navigate('/makeappointment')}>
                <span>Make An Appointment</span>
              </button>
              <Link to="/profile" className="profile-btn">
                <button className="sc-button"><span>My Profile</span></button>
              </Link>
              {/* Cart Icon with Animation */}
              <button
                className={`cart-button ${animateCart ? 'cart-bounce' : ''}`}
                onClick={() => navigate('/myorders')}
                style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
                  alt="Cart"
                  style={{ width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%' }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="header-content">
          <img src="https://cdn-icons-png.flaticon.com/128/10583/10583048.png" className="image" alt="Logo" style={{ display: "inline" }} />
          <h1 className="brand-name">PETER MASON</h1>
          <p className="subtitle" style={{ color: "#efa758" }}>CUSTOM TAILOR</p>

          <button className="navbar-toggler" onClick={toggleNav}>
            ☰
          </button>

          <nav className="navbar">
            <ul className={`navbar-nav ${isNavOpen ? 'active' : ''}`}>
              <li className="nav-item"><Link to="/home" className="nav-link">HOME</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link">ABOUT</Link></li>
              <li className="nav-item"><Link to="/shopsection" className="nav-link">SHOP</Link></li>
              <li className="nav-item"><Link to="/service" className="nav-link">SERVICES</Link></li>
              <li className="nav-item"><Link to="/contacts" className="nav-link">CONTACTS</Link></li>
            </ul>
          </nav>

          <h2 className="main-heading" style={{ fontFamily: 'Butler' }}>
            EMBRACE <span style={{ fontStyle: 'italic', fontFamily: '"Playfair Display", serif', color: "#efa758" }}>Your</span> STYLE
          </h2>
          <button className="btn appointment-btn">BOOK YOUR APPOINTMENT</button>
        </div>
      </header>

      {shouldRenderSections && (
        <>
          <TailorsSection />
          <Testimonial />
          <ReadyToWear />
        </>
      )}
    </>
  );
}

export default HeaderSection;
