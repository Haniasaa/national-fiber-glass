import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    initializeAdmin();
  }, []);

  async function initializeAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/admin-login");
      return;
    }

    setUserEmail(user.email || "");

    await Promise.all([
      fetchProducts(),
      fetchOrders(),
    ]);

    setLoading(false);
  }

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error fetching products:",
        error
      );
      return;
    }

    setProducts(data || []);
  }

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error fetching orders:",
        error
      );
      return;
    }

    setOrders(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }

  function resetForm() {
    setName("");
    setCategory("");
    setBrand("");
    setSize("");
    setPrice("");
    setDescription("");
    setImageFile(null);

    setEditId(null);
    setExistingImageUrl("");

    const fileInput =
      document.getElementById(
        "product-image-input"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  }

  async function uploadImage() {
    if (!imageFile) {
      return existingImageUrl || "";
    }

    const fileExt = imageFile.name
      .split(".")
      .pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setFormLoading(true);
    setSuccess("");
    setError("");

    try {
      const imageUrl = await uploadImage();

      const productData = {
        name,
        category,
        brand,
        size,
        price: price
          ? Number(price)
          : null,
        description,
        image_url: imageUrl,
      };

      if (editId) {
        const { error: updateError } =
          await supabase
            .from("products")
            .update(productData)
            .eq("id", editId);

        if (updateError) {
          throw updateError;
        }

        setSuccess(
          "Product updated successfully."
        );
      } else {
        const { error: insertError } =
          await supabase
            .from("products")
            .insert([productData]);

        if (insertError) {
          throw insertError;
        }

        setSuccess(
          "Product added successfully."
        );
      }

      resetForm();
      await fetchProducts();
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );
    }

    setFormLoading(false);
  }

  function handleEdit(product) {
    setEditId(product.id);

    setName(product.name || "");
    setCategory(product.category || "");
    setBrand(product.brand || "");
    setSize(product.size || "");
    setPrice(product.price || "");
    setDescription(
      product.description || ""
    );

    setExistingImageUrl(
      product.image_url || ""
    );

    setImageFile(null);

    document
      .getElementById("product-form")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  async function handleDelete(product) {
    const confirmDelete =
      window.confirm(
        `Delete "${product.name}"?`
      );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      setError(error.message);
      return;
    }

    if (editId === product.id) {
      resetForm();
    }

    await fetchProducts();
  }

  async function updateOrderStatus(
    orderId,
    newStatus
  ) {
    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", orderId);

    if (error) {
      alert(
        "Could not update order status."
      );

      console.error(error);
      return;
    }

    await fetchOrders();
  }

  const newOrders = orders.filter(
    (order) => order.status === "New"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  if (loading) {
    return (
      <div className="admin-loading">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <main className="admin-page">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div>
          <span className="admin-brand-small">
            National Fiber Glass
          </span>

          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">

          <button
            className="active"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "product-list"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Products
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "product-form"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Add Product
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "orders-section"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Orders ({newOrders})
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <section className="admin-main">

        {/* TOP BAR */}

        <div className="admin-topbar">

          <div>
            <span>Dashboard</span>
            <h1>Manage Store</h1>
          </div>

          <div className="admin-user">
            <span>Logged in as</span>
            <strong>{userEmail}</strong>
          </div>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="admin-dashboard-cards">

          <div className="admin-stat-card">
            <span>Products</span>

            <strong>
              {products.length}
            </strong>

            <p>
              Products in database
            </p>
          </div>

          <div className="admin-stat-card">
            <span>Total Orders</span>

            <strong>
              {orders.length}
            </strong>

            <p>
              All customer requests
            </p>
          </div>

          <div className="admin-stat-card">
            <span>New Orders</span>

            <strong>
              {newOrders}
            </strong>

            <p>
              Require attention
            </p>
          </div>

          <div className="admin-stat-card">
            <span>Completed</span>

            <strong>
              {completedOrders}
            </strong>

            <p>
              Successfully completed
            </p>
          </div>

          <div className="admin-stat-card">
            <span>Cancelled</span>

            <strong>
              {cancelledOrders}
            </strong>

            <p>
              Cancelled order requests
            </p>
          </div>

        </div>

        {/* ADD / EDIT PRODUCT */}

        <section
          className="admin-product-form-section"
          id="product-form"
        >

          <div className="admin-form-heading">

            <span>
              {editId
                ? "Edit Product"
                : "Add Product"}
            </span>

            <h2>
              {editId
                ? "Update Product"
                : "Create a New Product"}
            </h2>

          </div>

          <form
            className="admin-product-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-form-grid">

              <div className="admin-form-field">
                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="admin-form-field">
                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select category
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

              <div className="admin-form-field">
                <label>
                  Brand
                </label>

                <input
                  type="text"
                  value={brand}
                  onChange={(e) =>
                    setBrand(e.target.value)
                  }
                />
              </div>

              <div className="admin-form-field">
                <label>
                  Size / Capacity
                </label>

                <input
                  type="text"
                  value={size}
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                />
              </div>

              <div className="admin-form-field">
                <label>
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                />
              </div>

              <div className="admin-form-field">
                <label>
                  Product Image
                </label>

                <input
                  id="product-image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />
              </div>

            </div>

            {editId &&
              existingImageUrl && (
                <div className="admin-current-image">

                  <span>
                    Current Image
                  </span>

                  <img
                    src={existingImageUrl}
                    alt="Current product"
                  />

                </div>
              )}

            <div className="admin-form-field admin-full-field">

              <label>
                Description
              </label>

              <textarea
                rows="5"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

            {success && (
              <p className="admin-form-success">
                {success}
              </p>
            )}

            {error && (
              <p className="admin-form-error">
                {error}
              </p>
            )}

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-submit-btn"
                disabled={formLoading}
              >
                {formLoading
                  ? "Saving..."
                  : editId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="admin-cancel-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>

        </section>

        {/* PRODUCTS */}

        <section
          className="admin-products-section"
          id="product-list"
        >

          <div className="admin-products-heading">

            <div>
              <span>
                Product Management
              </span>

              <h2>
                All Products
              </h2>
            </div>

            <strong>
              {products.length} Products
            </strong>

          </div>

          {products.length === 0 ? (

            <div className="admin-no-products">
              No products added yet.
            </div>

          ) : (

            <div className="admin-products-grid">

              {products.map(
                (product) => (

                  <article
                    className="admin-product-card"
                    key={product.id}
                  >

                    <div className="admin-product-image">

                      {product.image_url ? (

                        <img
                          src={product.image_url}
                          alt={product.name}
                        />

                      ) : (

                        <div className="admin-no-image">
                          No Image
                        </div>

                      )}

                    </div>

                    <div className="admin-product-content">

                      <span className="admin-product-category">
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      {product.brand && (
                        <p>
                          <strong>
                            Brand:
                          </strong>{" "}
                          {product.brand}
                        </p>
                      )}

                      {product.size && (
                        <p>
                          <strong>
                            Size:
                          </strong>{" "}
                          {product.size}
                        </p>
                      )}

                      {product.price !== null && (
                        <div className="admin-product-price">

                          Rs.{" "}
                          {Number(
                            product.price
                          ).toLocaleString(
                            "en-PK"
                          )}

                        </div>
                      )}

                      <div className="admin-product-actions">

                        <button
                          className="admin-edit-btn"
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() =>
                            handleDelete(
                              product
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

        {/* ORDERS */}

        <section
          className="admin-products-section"
          id="orders-section"
        >

          <div className="admin-products-heading">

            <div>

              <span>
                Customer Orders
              </span>

              <h2>
                Order Requests
              </h2>

            </div>

            <strong>
              {orders.length} Orders
            </strong>

          </div>

          {orders.length === 0 ? (

            <div className="admin-no-products">

              <h3>
                No Orders Yet
              </h3>

              <p>
                Customer orders will appear
                here.
              </p>

            </div>

          ) : (

            <div className="admin-orders-list">

              {orders.map((order) => (

                <article
                  className="admin-order-card"
                  key={order.id}
                >

                  <div className="admin-order-top">

                    <div>

                      <span className="admin-product-category">
                        {order.category}
                      </span>

                      <h3>
                        {order.customer_name}
                      </h3>

                      <p>
                        Order #{order.id}
                      </p>

                      <p>
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                    <select
                      className="admin-order-status"
                      value={
                        order.status || "New"
                      }
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="New">
                        New
                      </option>

                      <option value="Contacted">
                        Contacted
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                  <div className="admin-order-details">

                    <p>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {order.phone}
                    </p>

                    <p>
                      <strong>
                        Product:
                      </strong>{" "}
                      {order.product_name ||
                        "-"}
                    </p>

                    <p>
                      <strong>
                        Size:
                      </strong>{" "}
                      {order.size || "-"}
                    </p>

                    <p>
                      <strong>
                        Quantity:
                      </strong>{" "}
                      {order.quantity || 1}
                    </p>

                    <p>
                      <strong>
                        Address:
                      </strong>{" "}
                      {order.address || "-"}
                    </p>

                    {order.message && (
                      <p>
                        <strong>
                          Details:
                        </strong>{" "}
                        {order.message}
                      </p>
                    )}

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </section>

    </main>
  );
}

export default Admin;