import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaterTankSection from "../components/WaterTankSection";

import waterTanksData, {
  tankStands as defaultTankStands,
} from "../data/waterTanksData";

import { supabase } from "../lib/supabase";

import "../styles/WaterTanks.css";

function WaterTanks() {
  const [tankSections, setTankSections] =
    useState(waterTanksData);

  const [tankStands, setTankStands] =
    useState(defaultTankStands);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaterTankProducts();
  }, []);

  const formatPrice = (price) => {
    return `Rs. ${Number(price).toLocaleString("en-PK")}`;
  };

  const normalizeText = (text) => {
    return (text || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  };

  async function fetchWaterTankProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "water-tanks")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(
        "Error fetching water tanks:",
        error
      );

      setTankSections(waterTanksData);
      setTankStands(defaultTankStands);
      setLoading(false);

      return;
    }

    /*
      Clone existing data so that imported
      waterTanksData is never directly modified.
    */

    const updatedSections = waterTanksData.map(
      (section) => ({
        ...section,

        images: [...section.images],

        products: section.products
          ? [...section.products]
          : undefined,

        verticalProducts:
          section.verticalProducts
            ? [...section.verticalProducts]
            : undefined,

        loftProducts:
          section.loftProducts
            ? [...section.loftProducts]
            : undefined,
      })
    );

    const updatedStands = [...defaultTankStands];

    const nationalSection =
      updatedSections.find(
        (section) =>
          section.id === "national-fiber-glass"
      );

    const superTuffSection =
      updatedSections.find(
        (section) =>
          section.id === "super-tuff"
      );

    const globalSection =
      updatedSections.find(
        (section) =>
          section.id === "global-water-tanks"
      );

    (data || []).forEach((product) => {
      const brand = normalizeText(product.brand);

      const hasValidTableData =
        product.size &&
        product.price !== null &&
        product.price !== undefined &&
        product.price !== "";

      /*
        NATIONAL FIBER GLASS
      */

      if (
        brand === "national fiber glass" ||
        brand === "national fiberglass" ||
        brand === "national fibre glass"
      ) {
        if (
          hasValidTableData &&
          nationalSection
        ) {
          nationalSection.products.push({
            size: product.size,
            price: Number(product.price),
          });
        }

        if (
          product.image_url &&
          nationalSection &&
          !nationalSection.images.includes(
            product.image_url
          )
        ) {
          nationalSection.images.push(
            product.image_url
          );
        }

        return;
      }

      /*
        SUPER TUFF
      */

      if (
        brand === "super tuff" ||
        brand === "supertuff"
      ) {
        if (
          hasValidTableData &&
          superTuffSection
        ) {
          superTuffSection.products.push({
            size: product.size,
            price: Number(product.price),
          });
        }

        if (
          product.image_url &&
          superTuffSection &&
          !superTuffSection.images.includes(
            product.image_url
          )
        ) {
          superTuffSection.images.push(
            product.image_url
          );
        }

        return;
      }

      /*
        GLOBAL LOFT
      */

      if (
        brand === "global loft" ||
        brand === "global water tank loft" ||
        brand === "global water tanks loft"
      ) {
        if (
          hasValidTableData &&
          globalSection
        ) {
          globalSection.loftProducts.push({
            size: product.size,
            price: Number(product.price),
          });
        }

        if (
          product.image_url &&
          globalSection &&
          !globalSection.images.includes(
            product.image_url
          )
        ) {
          globalSection.images.push(
            product.image_url
          );
        }

        return;
      }

      /*
        GLOBAL VERTICAL
      */

      if (
        brand === "global vertical" ||
        brand === "global" ||
        brand === "global water tanks" ||
        brand === "global water tank"
      ) {
        if (
          hasValidTableData &&
          globalSection
        ) {
          globalSection.verticalProducts.push({
            size: product.size,
            price: Number(product.price),
          });
        }

        if (
          product.image_url &&
          globalSection &&
          !globalSection.images.includes(
            product.image_url
          )
        ) {
          globalSection.images.push(
            product.image_url
          );
        }

        return;
      }

      /*
        PALAI / TANK STANDS
      */

      if (
        brand === "palai" ||
        brand === "tank stand" ||
        brand === "tank stands" ||
        brand === "water tank stand"
      ) {
        if (hasValidTableData) {
          updatedStands.push({
            size: product.size,
            price: Number(product.price),
          });
        }
      }
    });

    setTankSections(updatedSections);
    setTankStands(updatedStands);

    setLoading(false);
  }

  return (
    <>
      <Header showHero={false} />

      <main className="water-tanks-page">

        {/* HERO */}

        <section className="water-tanks-hero">
          <div className="water-tanks-overlay"></div>

          <div className="water-tanks-hero-content">
            <span className="water-tanks-label">
              Water Storage Solutions
            </span>

            <h1>Water Tanks</h1>

            <p>
              Explore water tanks from National Fiber
              Glass, Super Tuff and Global in a range
              of capacities and sizes.
            </p>

            <div className="water-tanks-hero-links">

              <a href="#national-fiber-glass">
                National Fiber Glass
              </a>

              <a href="#super-tuff">
                Super Tuff
              </a>

              <a href="#global-water-tanks">
                Global
              </a>

            </div>
          </div>
        </section>

        {/* INTRO */}

        <section className="water-tanks-intro">

          <div
            className="water-tanks-intro-content"
            data-aos="fade-up"
            data-aos-duration="900"
          >

            <span>
              Available at National Fiber Glass
            </span>

            <h2>
              Choose the Right Tank for Your Space
            </h2>

            <p>
              We offer different water storage options
              for homes, shops and commercial
              requirements. Compare available
              capacities, dimensions and prices to find
              a suitable option for your needs.
            </p>

          </div>

        </section>

        {/* LOADING */}

        {loading && (
          <div
            style={{
              padding: "25px 20px",
              textAlign: "center",
            }}
          >
            Loading water tanks...
          </div>
        )}

        {/* PRODUCT SECTIONS */}

        {!loading &&
          tankSections.map((section) => (
            <WaterTankSection
              key={section.id}
              section={section}
            />
          ))}

        {/* TANK STANDS / PALAI */}

        {!loading && (
          <section
            className="tank-stands-section"
            id="tank-stands"
          >

            <div className="tank-stands-container">

              <div
                className="tank-stands-heading"
                data-aos="fade-up"
                data-aos-duration="900"
              >

                <span>
                  Water Tank Accessories
                </span>

                <h2>
                  Water Tank Stands / Palai
                </h2>

                <p>
                  Tank stands are available in multiple
                  sizes to support different water tank
                  requirements.
                </p>

              </div>

              <div
                className="tank-stands-showcase"
                data-aos="fade-up"
                data-aos-duration="900"
              >

                {/* PALAI IMAGE */}

                <div className="tank-stand-image">

                  <img
                    src="/images/water-tanks/palai.png"
                    alt="Water tank stand palai"
                  />

                  <div className="tank-stand-image-caption">

                    <span>
                      Strong Support
                    </span>

                    <h3>
                      Water Tank Palai
                    </h3>

                    <p>
                      Suitable for supporting water tanks
                      in different sizes and installation
                      requirements.
                    </p>

                  </div>

                </div>

                {/* PRICE CARD */}

                <div className="tank-stands-card">

                  <div className="tank-stands-card-header">

                    <div>

                      <h3>
                        Available Stand Sizes
                      </h3>

                      <p>
                        Size and current price list
                      </p>

                    </div>

                  </div>

                  <div className="tank-stands-grid">

                    {tankStands.map(
                      (stand, index) => (
                        <div
                          className="tank-stand-item"
                          key={`${stand.size}-${index}`}
                        >

                          <div>

                            <span className="stand-size-label">
                              Size
                            </span>

                            <strong>
                              {stand.size}
                            </strong>

                          </div>

                          <span className="stand-price">
                            {formatPrice(
                              stand.price
                            )}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                  <div className="tank-stands-bottom">

                    <p>
                      Need help selecting the right tank
                      or stand?
                    </p>

                    <a href="/#contact">
                      Contact Us
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* FINAL CTA */}

        <section className="water-tanks-cta">

          <div
            className="water-tanks-cta-content"
            data-aos="zoom-in"
            data-aos-duration="800"
          >

            <span>
              Need Assistance?
            </span>

            <h2>
              Not Sure Which Water Tank You Need?
            </h2>

            <p>
              Contact National Fiber Glass and we will
              help you choose a suitable tank according
              to your required capacity and available
              space.
            </p>

            <a href="/#contact">
              Get in Touch
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default WaterTanks;