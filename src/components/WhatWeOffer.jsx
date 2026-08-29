import "./WhatWeOffer.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function WhatWeOffer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      className="offer-section"
      ref={sectionRef}
    >
      <div className="offer-heading">
        <h2>What We Offer</h2>

        <p>
          Quality fibre glass, water storage, waste management,
          and outdoor shade solutions for homes, shops, and factories.
        </p>
      </div>

      <div className="offer-grid">

        <div className="offer-card">
          <img
            src="/images/cc.png"
            alt="Shades"
          />

          <div className="offer-content">
            <h3>Shades</h3>

            <p>
              Durable car porch, factory, and outdoor shade solutions
              with strong finishing.
            </p>

            <Link
              to="/shades"
              className="primary-btn"
            >
              See All
            </Link>
          </div>
        </div>

        <div className="offer-card">
          <img
            src="/images/t.png"
            alt="Water Tanks"
          />

          <div className="offer-content">
            <h3>Water Tanks</h3>

            <p>
              Reliable water storage tanks from trusted brands
              including Super Tuff and Global.
            </p>

            <Link
              to="/water-tanks"
              className="primary-btn"
            >
              See All
            </Link>
          </div>
        </div>

        <div className="offer-card">
          <img
            src="/images/d.png"
            alt="Dustbins"
          />

          <div className="offer-content">
            <h3>Dustbins</h3>

            <p>
              Strong and practical dustbins for homes,
              shops, and commercial spaces.
            </p>

            <Link
              to="/dustbins"
              className="primary-btn"
            >
              See All
            </Link>
          </div>
        </div>

        <div className="offer-card">
          <img
            src="/images/green-net/g2.png"
            alt="Green Net Shades"
          />

          <div className="offer-content">
            <h3>Green Net Shades</h3>

            <p>
              Practical green net shade solutions for homes,
              outdoor areas, and commercial spaces.
            </p>

            <Link
              to="/green-net"
              className="primary-btn"
            >
              See All
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhatWeOffer;