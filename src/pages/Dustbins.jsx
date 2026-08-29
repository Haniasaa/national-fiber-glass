import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

import "../styles/Dustbins.css";

function Dustbins() {
  const [dustbins, setDustbins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackDustbins = [
    {
      id: "fallback-1",
      image_url: "/images/dustbins/d1.png",
      name: "Wheeled Waste Bins",
      description:
        "Practical waste bins suitable for everyday waste collection and disposal needs.",
      price: null,
      size: "",
      brand: "",
    },
    {
      id: "fallback-2",
      image_url: "/images/dustbins/d2.png",
      name: "Single Wheled Dustbin",
      description:
        "A simple and convenient wheeled dustbin option for regular use.",
      price: null,
      size: "",
      brand: "",
    },
    {
      id: "fallback-3",
      image_url: "/images/dustbins/d3.png",
      name: "Outdoor Dustbin",
      description:
        "A compact outdoor-style dustbin suitable for different public and commercial spaces.",
      price: null,
      size: "",
      brand: "",
    },
  ];

  useEffect(() => {
    fetchDustbins();
  }, []);

  async function fetchDustbins() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "dustbins")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dustbins:", error);

      setDustbins(fallbackDustbins);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      setDustbins(data);
    } else {
      setDustbins(fallbackDustbins);
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

    return `Rs. ${Number(price).toLocaleString(
      "en-PK"
    )}`;
  };

  return (
    <>
      <Header showHero={false} />

      <main className="dustbins-page">

        {/* HERO */}

        <section className="dustbins-hero">

          <div className="dustbins-hero-overlay"></div>

          <div className="dustbins-hero-container">

            <div className="dustbins-hero-content">

              <span className="dustbins-label">
                Waste Management Solutions
              </span>

              <h1>Dustbins</h1>

              <p>
                Explore available dustbin options
                for homes, shops, commercial
                spaces and outdoor use.
              </p>

              <a
                href="#dustbin-products"
                className="dustbins-hero-btn"
              >
                View Dustbins
              </a>

            </div>

            <div className="dustbins-hero-image">

              <img
                src="/images/dustbins/d1.png"
                alt="Dustbin collection"
              />

            </div>

          </div>

        </section>

        {/* INTRO */}

        <section className="dustbins-intro">

          <div
            className="dustbins-intro-content"
            data-aos="fade-up"
            data-aos-duration="900"
          >

            <span>
              Available at National Fiber Glass
            </span>

            <h2>
              Choose a Suitable Dustbin
            </h2>

            <p>
              Different dustbin designs are
              available depending on your space
              and waste disposal requirements.
              Submit an order request to confirm
              current availability and pricing.
            </p>

          </div>

        </section>

        {/* PRODUCTS */}

        <section
          className="dustbin-products-section"
          id="dustbin-products"
        >

          <div className="dustbin-products-container">

            <div
              className="dustbin-products-heading"
              data-aos="fade-up"
              data-aos-duration="800"
            >

              <span>Our Collection</span>

              <h2>Available Dustbins</h2>

            </div>

            {loading ? (

              <p
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                Loading dustbins...
              </p>

            ) : (

              <div className="dustbin-products-grid">

                {dustbins.map(
                  (dustbin, index) => (

                    <article
                      className="dustbin-card"
                      key={dustbin.id}
                      data-aos="fade-up"
                      data-aos-delay={
                        index * 100
                      }
                      data-aos-duration="800"
                    >

                      <div className="dustbin-card-image">

                        <img
                          src={
                            dustbin.image_url ||
                            "/images/dustbins/d1.png"
                          }
                          alt={dustbin.name}
                        />

                      </div>

                      <div className="dustbin-card-content">

                        <span className="dustbin-number">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <h3>{dustbin.name}</h3>

                        {dustbin.brand && (
                          <p>
                            <strong>
                              Brand:
                            </strong>{" "}
                            {dustbin.brand}
                          </p>
                        )}

                        {dustbin.size && (
                          <p>
                            <strong>
                              Size:
                            </strong>{" "}
                            {dustbin.size}
                          </p>
                        )}

                        {dustbin.description && (
                          <p>
                            {dustbin.description}
                          </p>
                        )}

                        {formatPrice(
                          dustbin.price
                        ) && (
                          <p
                            style={{
                              fontWeight:
                                "700",
                              color:
                                "#111827",
                              fontSize:
                                "17px",
                            }}
                          >
                            {formatPrice(
                              dustbin.price
                            )}
                          </p>
                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

          </div>

        </section>

        {/* INFO STRIP */}

        <section className="dustbins-info-strip">

          <div className="dustbins-info-container">

            <div>
              <strong>
                Multiple Options
              </strong>

              <span>
                Different designs available
              </span>
            </div>

            <div>
              <strong>
                Availability
              </strong>

              <span>
                Confirm current stock before
                finalizing your order
              </span>
            </div>

            <div>
              <strong>
                Current Pricing
              </strong>

              <span>
                Final price will be confirmed
                with your order request
              </span>
            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="dustbins-cta">

          <div
            className="dustbins-cta-content"
            data-aos="zoom-in"
            data-aos-duration="800"
          >

            <span>
              Ready to Order?
            </span>

            <h2>
              Looking for a Dustbin for Your
              Space?
            </h2>

            <p>
              Submit your order request and our
              team will confirm the suitable
              option, availability and final
              price.
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

export default Dustbins;