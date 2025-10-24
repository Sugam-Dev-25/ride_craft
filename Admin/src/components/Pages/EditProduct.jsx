import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProductById, updateProduct } from "../../service/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const data = res.data;

        // Prefill fields
        const fields = [
          "title",
          "description",
          "category",
          "color",
          "brand",
          "gender",
          "normalPrice",
          "salePrice",
          "stock",
        ];
        fields.forEach((field) => {
          if (data[field] !== undefined) setValue(field, data[field]);
        });

        if (data.image) {
          setImagePreview(`http://localhost:5000${data.image}`);
        }
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
        alert("Failed to load product data!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, setValue]);

  // ✅ Submit handler
  const onSubmit = async (formData) => {
    try {
      const data = new FormData();

      // Append all fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("color", formData.color);
      data.append("brand", formData.brand);
      data.append("gender", formData.gender);
      data.append("normalPrice", formData.normalPrice);
      data.append("salePrice", formData.salePrice);
      data.append("stock", formData.stock);

      if (formData.image && formData.image.length > 0) {
        data.append("image", formData.image[0]);
      }

      await updateProduct(id, data);
      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update product!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (loading)
    return <p className="text-center mt-5 fw-bold fs-5">Loading product...</p>;

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header fw-semibold">Edit Product Information</div>
              <div className="card-body">
                {/* Product Title */}
                <div className="mb-3">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="form-control"
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Product Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="form-control"
                    rows="3"
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </div>

                {/* Prices */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Normal Price</label>
                    <input
                      type="number"
                      {...register("normalPrice", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Selling Price</label>
                    <input
                      type="number"
                      {...register("salePrice", { required: true })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Stock & Color */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      {...register("stock", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Color</label>
                    <input
                      type="text"
                      {...register("color", { required: true })}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Brand & Gender */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Brand</label>
                    <input
                      type="text"
                      {...register("brand", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      {...register("gender", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="ladies">Ladies</option>
                      <option value="gents">Gents</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Image Upload */}
            <div className="card mb-4">
              <div className="card-header fw-semibold">Product Image</div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="file"
                    {...register("image")}
                    className="form-control-file"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{
                        maxHeight: "150px",
                        objectFit: "cover",
                        width: "auto",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Category Selection */}
            <div className="card mb-4">
              <div className="card-header fw-semibold">Select Category</div>
              <div className="card-body">
                <select
                  {...register("category", { required: true })}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  <option value="road-cycle">Road Cycle</option>
                  <option value="city-cycle">City Cycle</option>
                  <option value="mountain-cycle">Mountain Cycle</option>
                  <option value="freeroll">Freeroll</option>
                  <option value="helmets">Helmets</option>
                  <option value="shirts">Shirts</option>
                  <option value="pants">Pants</option>
                  <option value="gloves">Gloves</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-dark w-100"
              style={{ backgroundColor: "#000000ff", borderRadius: "50px" }}
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
