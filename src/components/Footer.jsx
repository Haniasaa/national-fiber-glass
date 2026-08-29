import "./Footer.css";

import { Phone, MapPin, Clock } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Our Products", href: "#products" },
  { name: "Our Dealers", href: "#dealers" },
  { name: "Contact Us", href: "#contact" },
];

const products = [
  "Shades",
  "Windows & Doors",
  "Water Tankies",
  "Dustbins",
  "Factory Shades",
];

function Footer() {
  return (
    <footer
  className="footer"
  data-aos="fade-up"
  data-aos-duration="800"
>

      <div className="footer-container">

        <div className="footer-grid">

          {/* Business Info */}

          <div className="footer-column">

            <h2 className="footer-logo">
              National Fibre Glass
            </h2>

            <p className="footer-description">
              Reliable fibre glass solutions for shades, windows,
              doors, car porch shades, factory shades, water
              tankies, and dustbins.
            </p>

           <div className="footer-social">

  <a href="#" className="social-icon" aria-label="Facebook">
    <FaFacebookF size={18} />
  </a>

  <a href="#" className="social-icon" aria-label="Instagram">
    <FaInstagram size={18} />
  </a>

  <a href="#" className="social-icon" aria-label="WhatsApp">
    <FaWhatsapp size={18} />
  </a>

</div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul className="footer-links">

              {quickLinks.map((link, index) => (

                <li key={index}>

                  <a href={link.href}>
                    {link.name}
                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* Products */}

          <div className="footer-column">

            <h3>Our Products</h3>

            <ul className="footer-links">

              {products.map((item, index) => (

                <li key={index}>
                  <a href="#products">
                    {item}
                  </a>
                </li>

              ))}

            </ul>

          </div>

          {/* Contact */}
                    <div className="footer-column">

            <h3>Contact Info</h3>

            <div className="footer-contact">

              <div className="contact-row">
                <Phone size={18} />
                <span>+923332223962</span>
              </div>

              <div className="contact-row">
                <MapPin size={18} />
                <span>Shop 61, Saleem palaza block 16, Gulshan iqbal University road, Karachi</span>
              </div>

              <div className="contact-row">
                <Clock size={18} />
                <span>Mon - sun/Friday-off: 8:00 AM - 9:00 PM</span>
              </div>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 National Fibre Glass. All rights reserved.
          </p>

          <p>
            Designed with care for local business.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;