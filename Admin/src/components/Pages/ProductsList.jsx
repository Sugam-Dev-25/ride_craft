import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../service/api"; // ✅ Your axios API file
import { CiEdit, CiCircleRemove } from "react-icons/ci";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      await deleteProduct(id);
      await fetchProducts(); // refresh after delete
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete product!");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="card shadow mb-4">
      {/* Header */}
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Product List</h5>
        <button
          className="btn btn-sm btn-success"
          onClick={() => (window.location.href = "/add-product")}
          style={{borderRadius:"50px", padding:"10px 15px", color:"#fefefeff", fontWeight:"600", backgroundColor:"#e03737ff", border:"none"}}
        >
          Add Product
        </button>
      </div>

      {/* Body */}
      <div className="card-body table-responsive">
        {loading ? (
          <p className="text-center text-muted my-4">Loading products...</p>
        ) : error ? (
          <p className="text-danger text-center my-3">{error}</p>
        ) : (
          <table className="table table-bordered table-hover table-striped align-middle text-center">
            <thead className="table-dark" style={{ backgroundColor: "#000" }}>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Gender</th>
                <th>Normal $</th>
                <th>Sale $</th>
                <th>Stock</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-muted text-center">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.image ? (
                        <img
                          src={`https://ridecraft-backend.onrender.com${p.image}`}
                          alt={p.title}
                          width="60"
                          height="60"
                          className="img-thumbnail"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>{p.title}</td> 
                    <td
                      style={{
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.description}
                    </td>
                    <td>{p.category}</td>
                    <td>{p.color}</td>
                    <td>{p.brand}</td>
                    <td>{p.gender}</td>
                    <td>${parseFloat(p.normalPrice).toFixed(2)}</td>
                    <td>${parseFloat(p.salePrice).toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        {/* ✏️ Edit Button */}
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center border-0 "
                          onClick={() =>
                            (window.location.href = `/edit-product/${p._id}`)
                          }
                          title="Edit Product"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <CiEdit />
                        </button>

                        {/* 🗑️ Delete Button */}
                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center border-0"
                          onClick={() => handleDelete(p._id)}
                          disabled={deleting === p._id}
                          title="Delete Product"
                          style={{ width: "35px", height: "35px" }}
                        >
                          {deleting === p._id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <CiCircleRemove />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
