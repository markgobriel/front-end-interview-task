import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <div className="footer-mark">Popdrop</div>
            <p className="footer-byline">by Mark Gobriel</p>
            <p>
              Everyday finds, made fun. Colorful essentials, cozy staples, and
              tiny upgrades — packed with personality and shipped with care.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/new-arrivals">New In</Link></li>
              <li><Link to="/shop?tag=Most%20Wanted">Most Wanted</Link></li>
              <li><Link to="/shop?category=Electronics">Electronics</Link></li>
              <li><Link to="/shop?category=Clothing">Clothing</Link></li>
              <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><a href="#help">Shipping & returns</a></li>
              <li><a href="#help">Order tracking</a></li>
              <li><a href="#help">Size guide</a></li>
              <li><a href="#help">FAQ</a></li>
              <li><a href="#help">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Brand</h4>
            <ul>
              <li><a href="#brand">About Popdrop</a></li>
              <li><a href="#brand">Sustainability</a></li>
              <li><a href="#brand">Press</a></li>
              <li><a href="#brand">Careers</a></li>
              <li><a href="#brand">Members</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Popdrop. All rights reserved.</span>
          <div className="legal">
            <a href="#legal">Privacy</a>
            <a href="#legal">Terms</a>
            <a href="#legal">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
