import { useState } from "react";

import "../styles/WaterTankSection.css";

function WaterTankSection({ section }) {
  const [selectedImage, setSelectedImage] =
    useState(section.images[0]);

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString(
      "en-PK"
    )}`;
  };

  const renderSimpleTable = () => {
    return (
      <div className="tank-price-card">

        <div className="tank-price-card-heading">

          <h3>Available Capacities</h3>

          <p>
            Select the suitable size according
            to your water storage requirement.
          </p>

        </div>

        <div className="tank-table-wrapper">

          <table className="tank-price-table">

            <thead>
              <tr>
                <th>Capacity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>

              {section.products.map(
                (product, index) => (
                  <tr key={index}>

                    <td>
                      {product.size}
                    </td>

                    <td className="tank-price">
                      {formatPrice(
                        product.price
                      )}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <p className="tank-price-note">
          Prices are subject to availability
          and may change. Place your order from
          the order form on the main page for
          confirmation.
        </p>

      </div>
    );
  };

  const renderGlobalTables = () => {
    return (
      <div className="tank-price-card global-main-price-card">

        <div className="tank-price-card-heading">

          <h3>
            Available Sizes & Prices
          </h3>

          <p>
            Global water tanks are available
            in both vertical and loft styles.
            Compare both options below.
          </p>

        </div>

        <div className="global-price-tables">

          {/* VERTICAL */}

          <div className="global-table-card">

            <div className="global-table-title">

              <h4>
                Global Water Tanks
              </h4>

              <span>(Vertical)</span>

            </div>

            <div className="tank-table-wrapper">

              <table className="global-price-table">

                <thead>
                  <tr>
                    <th>Capacity</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>

                  {section.verticalProducts.map(
                    (product, index) => (
                      <tr key={index}>

                        <td>
                          {product.size}
                        </td>

                        <td>
                          {formatPrice(
                            product.price
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* LOFT */}

          <div className="global-table-card">

            <div className="global-table-title">

              <h4>
                Global Water Tanks
              </h4>

              <span>(Loft)</span>

            </div>

            <div className="tank-table-wrapper">

              <table className="global-price-table">

                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>

                  {section.loftProducts.map(
                    (product, index) => (
                      <tr key={index}>

                        <td>
                          {product.size}
                        </td>

                        <td>
                          {formatPrice(
                            product.price
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        <p className="tank-price-note">
          Prices are subject to availability
          and may change. Place your order from
          the order form on the main page for
          confirmation.
        </p>

      </div>
    );
  };

  return (
    <section
      className="tank-section"
      id={section.id}
    >

      <div className="tank-section-container">

        <div
          className="tank-section-heading"
          data-aos="fade-up"
          data-aos-duration="800"
        >

          <span className="tank-brand">
            {section.brand}
          </span>

          <h2>{section.title}</h2>

          <p>{section.subtitle}</p>

        </div>

        <div
          className={`tank-product-layout ${
            section.type === "global"
              ? "global-product-layout"
              : ""
          }`}
        >

          {/* GALLERY */}

          <div
            className="tank-gallery"
            data-aos="fade-right"
            data-aos-duration="900"
          >

            <div className="tank-main-image">

              <img
                src={selectedImage}
                alt={section.title}
              />

            </div>

            {section.images.length > 1 && (

              <div className="tank-thumbnails">

                {section.images.map(
                  (image, index) => (

                    <button
                      key={index}
                      type="button"
                      className={`tank-thumbnail ${
                        selectedImage === image
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                      aria-label={`View ${section.title} image ${
                        index + 1
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${section.title} ${
                          index + 1
                        }`}
                      />

                    </button>

                  )
                )}

              </div>

            )}

          </div>

          {/* PRICE */}

          <div
            data-aos="fade-left"
            data-aos-duration="900"
          >

            {section.type === "global"
              ? renderGlobalTables()
              : renderSimpleTable()}

          </div>

        </div>

      </div>

    </section>
  );
}

export default WaterTankSection;