import "./Contact.css";

import { useState } from "react";

import {
  Phone,
  MapPin,
  Clock,
  PackageCheck,
} from "lucide-react";

import { supabase } from "../lib/supabase";

const contactInfo = [
  {
    icon: Phone,
    title: "0333-2223962",
    subtitle: "Call or WhatsApp us",
  },
  {
    icon: MapPin,
    title: "National Fibre Glass",
    subtitle:
      "Shop no 61 Saleem Plaza, Block 16, Gulshan-e-Iqbal, University Road, Karachi",
  },
  {
    icon: Clock,
    title: "Monday - Sunday / Friday Off",
    subtitle: "8:00 AM - 9:00 PM",
  },
  {
    icon: PackageCheck,
    title: "Shades, Water Tanks, Dustbins & Green Net",
    subtitle:
      "Available for homes, shops, factories and outdoor spaces",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    category: "",
    productName: "",
    size: "",
    quantity: 1,
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [cancelData, setCancelData] = useState({
    orderId: "",
    phone: "",
  });

  const [cancelLoading, setCancelLoading] =
    useState(false);

  const [cancelSuccess, setCancelSuccess] =
    useState("");

  const [cancelError, setCancelError] =
    useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleCancelChange = (e) => {
    const { name, value } = e.target;

    setCancelData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const { data, error: insertError } =
      await supabase
        .from("orders")
        .insert([
          {
            customer_name: formData.fullName,
            phone: formData.phone,
            category: formData.category,
            product_name:
              formData.productName || null,
            size: formData.size || null,
            quantity:
              Number(formData.quantity) || 1,
            address:
              formData.address || null,
            message:
              formData.message || null,
            status: "New",
          },
        ])
        .select("id")
        .single();

    if (insertError) {
      console.error(insertError);

      setError(
        "Order could not be submitted. Please try again."
      );

      setLoading(false);
      return;
    }

    setSuccess(
      `Order request submitted successfully. Your Order ID is #${data.id}. Please save this ID in case you need to cancel your order. Our team will contact you to confirm availability, final price and delivery details.`
    );

    setFormData({
      fullName: "",
      phone: "",
      category: "",
      productName: "",
      size: "",
      quantity: 1,
      address: "",
      message: "",
    });

    setLoading(false);
  };

  const handleCancelOrder = async (e) => {
    e.preventDefault();

    setCancelLoading(true);
    setCancelSuccess("");
    setCancelError("");

    const { data, error } = await supabase.rpc(
      "cancel_customer_order",
      {
        p_order_id: Number(cancelData.orderId),
        p_phone: cancelData.phone,
      }
    );

    if (error) {
      console.error(error);

      setCancelError(
        "Order could not be cancelled. Please try again."
      );

      setCancelLoading(false);
      return;
    }

    if (!data) {
      setCancelError(
        "Order not found, phone number does not match, or this order can no longer be cancelled."
      );

      setCancelLoading(false);
      return;
    }

    setCancelSuccess(
      "Your order has been cancelled successfully."
    );

    setCancelData({
      orderId: "",
      phone: "",
    });

    setCancelLoading(false);
  };

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-container">

        <h2 className="contact-heading">
          Place Your Order
        </h2>

        <p className="contact-subtitle">
          Submit your order request and our team
          will contact you to confirm availability,
          final price and delivery details.
        </p>

        <div className="contact-grid">

          <div className="contact-info">

            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="contact-card"
                  key={index}
                  data-aos="fade-right"
                  data-aos-delay={index * 120}
                >
                  <div className="icon-box">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              );
            })}

          </div>

          <div
            className="form-card"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Phone / WhatsApp Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="03XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a Category
                  </option>

                  <option value="water-tanks">
                    Water Tanks
                  </option>

                  <option value="shades">
                    Shades
                  </option>

                  <option value="dustbins">
                    Dustbins
                  </option>

                  <option value="green-net">
                    Green Net
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Product / Requirement
                </label>

                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. Super Tuff Water Tank / Car Porch Shade"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Size / Capacity
                </label>

                <input
                  type="text"
                  name="size"
                  placeholder="e.g. 500 Litres / 10 × 12 ft"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Delivery Address / Area
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter area or delivery address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Additional Details
                </label>

                <textarea
                  name="message"
                  placeholder="Mention any special requirement..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {success && (
                <p
                  style={{
                    marginBottom: "15px",
                    padding: "12px",
                    borderRadius: "6px",
                    background: "#ecfdf5",
                    color: "#047857",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {success}
                </p>
              )}

              {error && (
                <p
                  style={{
                    marginBottom: "15px",
                    padding: "12px",
                    borderRadius: "6px",
                    background: "#fef2f2",
                    color: "#dc2626",
                    fontSize: "13px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="submit-btn primary-btn"
                disabled={loading}
              >
                {loading
                  ? "Submitting Order..."
                  : "Place Order"}
              </button>

            </form>
          </div>

        </div>

        {/* CANCEL ORDER */}

        <div
          className="form-card"
          style={{
            maxWidth: "650px",
            margin: "45px auto 0",
          }}
        >
          <h3
            style={{
              marginBottom: "8px",
            }}
          >
            Cancel Your Order
          </h3>

          <p
            style={{
              marginBottom: "22px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Enter your Order ID and the same
            phone number used when placing the
            order.
          </p>

          <form onSubmit={handleCancelOrder}>

            <div className="form-group">
              <label>Order ID</label>

              <input
                type="number"
                name="orderId"
                placeholder="e.g. 12"
                value={cancelData.orderId}
                onChange={handleCancelChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Phone / WhatsApp Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="03XXXXXXXXX"
                value={cancelData.phone}
                onChange={handleCancelChange}
                required
              />
            </div>

            {cancelSuccess && (
              <p
                style={{
                  marginBottom: "15px",
                  padding: "12px",
                  borderRadius: "6px",
                  background: "#ecfdf5",
                  color: "#047857",
                  fontSize: "13px",
                }}
              >
                {cancelSuccess}
              </p>
            )}

            {cancelError && (
              <p
                style={{
                  marginBottom: "15px",
                  padding: "12px",
                  borderRadius: "6px",
                  background: "#fef2f2",
                  color: "#dc2626",
                  fontSize: "13px",
                }}
              >
                {cancelError}
              </p>
            )}

            <button
              type="submit"
              className="submit-btn primary-btn"
              disabled={cancelLoading}
            >
              {cancelLoading
                ? "Cancelling..."
                : "Cancel Order"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;