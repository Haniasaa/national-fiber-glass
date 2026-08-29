import { useState } from "react";

import "./../styles/ShadeSection.css";

import ImageModal from "./ImageModal";

function ShadeSection({ section }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = section.images || [];

  const visibleImages = expanded
    ? images
    : images.slice(0, 4);

  const formattedPrice =
    section.price !== null &&
    section.price !== undefined &&
    section.price !== ""
      ? `Rs. ${Number(section.price).toLocaleString("en-PK")}`
      : null;

  return (
    <>
      <section className="shade-section">

        <div
          className="shade-section-heading"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <h2 className="shade-title">
            {section.title}
          </h2>
        </div>

        <div
          className="shade-hero"
          data-aos="fade-up"
          data-aos-duration="550"
        >
          <img
            src={section.hero}
            alt={section.title}
          />

          <div className="shade-overlay"></div>

          <div className="shade-text">

            <h3>
              {section.title}
            </h3>

            <p>
              {section.databaseProduct
                ? section.description ||
                  "Premium Fibreglass Shade Solution"
                : "Premium Fibreglass Shade Solutions"}
            </p>

          </div>
        </div>

        {visibleImages.length > 0 && (
          <div
            className={`gallery ${
              visibleImages.length === 1
                ? "single-image-gallery"
                : ""
            }`}
          >
            {visibleImages.map((image, index) => (
              <button
                type="button"
                key={`${section.id}-${index}`}
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
                aria-label={`Open ${section.title} image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${section.title} ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {images.length > 4 && (
          <button
            className="primary-btn see-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "See All →"}
          </button>
        )}

        <div
          className="shade-description"
          data-aos="fade-up"
          data-aos-duration="500"
        >

          {section.databaseProduct ? (
            <>
              <h4>
                Product Details
              </h4>

              {section.brand && (
                <p>
                  <strong>Brand:</strong>{" "}
                  {section.brand}
                </p>
              )}

              {section.size && (
                <p>
                  <strong>Size:</strong>{" "}
                  {section.size}
                </p>
              )}

              {section.description && (
                <p>
                  {section.description}
                </p>
              )}

              {formattedPrice ? (
                <div className="price-box">
                  {formattedPrice}
                </div>
              ) : (
                <div className="price-box">
                  Final price will be confirmed according
                  to size, measurement and installation
                  requirements.
                </div>
              )}

              <p className="shade-order-note">
                To place an order, submit your requirement
                through the order form on the main page.
              </p>
            </>
          ) : (
            <>
              <h4>
                Customized Sizes & Colors Available
              </h4>

              <p>
                All shade designs can be customized
                according to your required size, color,
                area, and fitting style. Final price
                depends on material, size, design, and
                per-square-foot measurement.
              </p>

              <div className="price-box">
                Price is calculated per square foot after
                measurement and design selection.
              </div>

              <p className="shade-order-note">
                Submit your required measurements and
                details through the order form on the main
                page. Our team will confirm the final price
                before the order is processed.
              </p>
            </>
          )}

        </div>

      </section>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

export default ShadeSection;