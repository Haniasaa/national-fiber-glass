import "./OurDealers.css";

const dealers = [
  {
    image: "/images/global.png",
    name: "Global Water Tanks",
    description:
      "Durable water storage tanks designed for homes, shops, and commercial use.",
  },
  {
    image: "/images/supertuff.png",
    name: "Super Tuff Water Tanks",
    description:
      "Strong and reliable water tanks made for long-lasting daily use.",
  },
];

function OurDealers() {
  return (
    <section id="dealers" className="dealers-section">

      <div className="dealers-container">

        <div
          className="dealers-intro"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <h2 className="dealers-heading">
            Our Dealers
          </h2>

          <p className="dealers-subtitle">
            We provide reliable water tank solutions from trusted brands.
          </p>
        </div>

        <div className="dealers-grid">

          {dealers.map((dealer, index) => (
            <div
              className="dealer-card"
              key={dealer.name}
              data-aos="fade-up"
              data-aos-duration="550"
              data-aos-delay={index * 60}
            >

              <span className="dealer-badge">
                Available Here
              </span>

              <div className="dealer-image-box">
                <img
                  src={dealer.image}
                  alt={dealer.name}
                  className="dealer-image"
                />
              </div>

              <h3>
                {dealer.name}
              </h3>

              <p>
                {dealer.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default OurDealers;