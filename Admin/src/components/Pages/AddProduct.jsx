import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addProduct } from '../../service/api';

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Text fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('normalPrice', data.normalPrice);
    formData.append('salePrice', data.salePrice);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('color', data.color);
    formData.append('brand', data.brand);
    formData.append('gender', data.gender);

    // File field (image)
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      await addProduct(formData);
      alert('Product Added!');
      reset();
      setImagePreview(null);  // Clear the preview after submission
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">Product Information</div>
              <div className="card-body">
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="form-control"
                  />
                  {errors.title && <p className="text-danger">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Product Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
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
                      {...register('normalPrice', { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Selling Price</label>
                    <input
                      type="number"
                      {...register('salePrice', { required: true })}
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
                      {...register('stock', { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Color</label>
                    <input
                      type="text"
                      {...register('color', { required: true })}
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
                      {...register('brand', { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select {...register('gender', { required: true })} className="form-select custom-select">
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
            {/* Image Upload Section */}
            <div className="card mb-4">
              <div className="card-header">Upload Product Image</div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="file"
                    {...register('image')}
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
                        maxHeight: '150px',
                        objectFit: 'cover',
                        width: 'auto',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Category Section */}
            <div className="card mb-4">
              <div className="card-header">Select Category</div>
              <div className="card-body">
                <select {...register('category', { required: true })} className="form-select custom-select">
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
            <button type="submit" className="btn btn-dark w-100" style={{ backgroundColor: '#000000ff', borderRadius:"50px" }}>
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
