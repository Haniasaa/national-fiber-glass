import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

import "../styles/GreenNet.css";

function GreenNet() {
  const [greenNetProducts, setGreenNetProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackGreenNet = [
    {
      id: "fallback-1",
      image_url: "/images/green-net/g2.png",
      name: "Green Net Shade",
      description:
        "A practical shading option for outdoor spaces, providing covered and comfortable areas.",
      price: null,
      size: "",
      brand: "",
    },
    {
      id: "fallback-2",
      image_url: "/images/green-net/g3.png",
      name: "Outdoor Green Net",
      description:
        "Suitable for different outdoor shade requirements and installation areas.",
      price: null,
      size: "",
      brand: "",
    },
  ];

  useEffect(() => {
    fetchGreenNetProducts();
  }, []);

  async function fetchGreenNetProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "green-net")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error fetching Green Net products:",
        error
      );

      setGreenNetProducts(fallbackGreenNet);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      setGreenNetProducts(data);
    } else {
      setGreenNetProducts(fallbackGreenNet);
    }

    setLoading(false);
  }

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return null;
    }

    return `Rs. ${Number(price).toLocaleString("en-PK")}`;
  };

  return (
    <>
      <Header showHero={false} />

      <main className="green-net-page">

        {/* HERO */}

        <section className="green-net-hero">
          <div className="green-net-overlay"></div>

          <div className="green-net-hero-content">
            <span>Outdoor Shade Solutions</span>

            <h1>Green Net Shades</h1>

            <p>
              Practical green net shade solutions for homes,
              commercial spaces and outdoor areas.
            </p>

            <a href="#green-net-products">
              View Options
            </a>
          </div>
        </section>

        {/* INTRO */}

        <section className="green-net-intro">
          <div
            className="green-net-intro-content"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <span>
              Available at National Fiber Glass
            </span>

            <h2>
              Flexible Shade for Outdoor Spaces
            </h2>

            <p>
              Green net shades provide a practical option for
              covering open areas. Different options may be
              available depending on installation requirements,
              space and current stock.
            </p>
          </div>
        </section>

        {/* PRODUCTS */}

        <section
          className="green-net-products"
          id="green-net-products"
        >
          <div className="green-net-products-container">

            <div
              className="green-net-heading"
              data-aos="fade-up"
            >
              <span>Our Work</span>

              <h2>
                Green Net Shade Options
              </h2>

              <p>
                Explore some of the available green net
                shade applications.
              </p>
            </div>

            {loading ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                Loading green net products...
              </p>
            ) : (
              <div className="green-net-grid">

                {greenNetProducts.map((item, index) => (
                  <article
                    className="green-net-card"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <div className="green-net-card-image">

                      <img
                        src={
                          item.image_url ||
                          "/images/green-net/g2.png"
                        }
                        alt={item.name}
                      />

                    </div>

                    <div className="green-net-card-content">

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3>{item.name}</h3>

                      {item.brand && (
                        <p>
                          <strong>Brand:</strong>{" "}
                          {item.brand}
                        </p>
                      )}

                      {item.size && (
                        <p>
                          <strong>Size:</strong>{" "}
                          {item.size}
                        </p>
                      )}

                      {item.description && (
                        <p>
                          {item.description}
                        </p>
                      )}

                      {formatPrice(item.price) && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#111827",
                            fontSize: "17px",
                          }}
                        >
                          {formatPrice(item.price)}
                        </p>
                      )}

                    </div>
                  </article>
                ))}

              </div>
            )}

          </div>
        </section>

        {/* ORDER INFORMATION */}

        <section className="green-net-info">

          <div
            className="green-net-info-box"
            data-aos="fade-up"
          >
            <div>

              <span>
                Custom Requirement
              </span>

              <h2>
                Need Green Net for Your Space?
              </h2>

              <p>
                Sizes, installation requirements and prices
                may vary. Submit your requirement through our
                order form and our team will confirm the
                suitable option and final price.
              </p>

            </div>

            <a href="/#contact">
              Place Order
            </a>

          </div>

        </section>

        {/* CTA */}

        <section className="green-net-cta">

          <div
            className="green-net-cta-content"
            data-aos="zoom-in"
          >
            <span>
              Ready to Order?
            </span>

            <h2>
              Looking for an Outdoor Shade Solution?
            </h2>

            <p>
              Tell us your space and requirements through
              the order form. Our team will contact you to
              confirm the available green net option,
              installation requirements and final price.
            </p>

            <a href="/#contact">
              Place Order
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default GreenNet;