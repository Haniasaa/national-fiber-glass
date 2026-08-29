import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">

      <div
        className="about-container"
        data-aos="fade-up"
        data-aos-duration="600"
      >

        <div className="about-image">
          <img
            src="/images/owner.jpg"
            alt="National Fibre Glass"
          />
        </div>

        <div className="about-content">

          <span className="about-label">
            About Us
          </span>

          <h2>
            Trusted Fibre Glass Solutions
          </h2>

          <p>
            National Fibre Glass provides reliable shades,
            windows, doors, car porch shades, factory shades,
            water tankies, and dustbins with a focus on quality,
            durability, and customer satisfaction.
          </p>

          <ul className="about-list">
            <li>Quality fibre glass work</li>
            <li>Durable shades and fittings</li>
            <li>Trusted water tank brands</li>
            <li>Customer-focused service</li>
          </ul>

          <a
            href="#contact"
            className="about-btn"
          >
            Contact Us
          </a>

        </div>

      </div>

    </section>
  );
}

export default About;