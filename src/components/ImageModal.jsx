import "./../styles/ImageModal.css";

function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={image}
          alt="Shade"
          className="modal-image"
        />

        <p className="modal-text">
          Sizes, colors, and designs can be customized.
          Price is calculated per square foot after measurement.
        </p>

      </div>

    </div>
  );
}

export default ImageModal;