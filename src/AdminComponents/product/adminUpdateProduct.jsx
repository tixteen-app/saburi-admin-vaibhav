import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState({ show: false, sizeId: null });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    image: [],
    thumbnail: "",
    Tax: "",
    active: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

        const productData = response.data.product;
        setProduct(productData);
        setSizes(response.data.sizes || []);

        setFormData({
          name: productData.name,
          description: productData.description,
          category: productData.category?._id || "",
          brand: productData.brand,
          image: productData.image || [],
          thumbnail: productData.thumbnail,
          Tax: productData.Tax,
          active: productData.active,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSizeChange = (e, index, field) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    // Calculate FinalPrice if price or discount changes
    if (field === 'price' || field === 'discountPercentage') {
      const price = parseFloat(updatedSizes[index].price) || 0;
      const discount = parseFloat(updatedSizes[index].discountPercentage) || 0;
      updatedSizes[index].FinalPrice = price - (price * (discount / 100));
    }
    
    setSizes(updatedSizes);
  };

  const handleAddMoreSizes = () => {
    setSizes([...sizes, { 
      size: "", 
      sizetype: "", 
      quantity: 0, 
      price: 0, 
      discountPercentage: 0, 
      FinalPrice: 0,
      active: true 
    }]);
  };

  const handleDeleteSize = async (sizeId) => {
    try {
      await makeApi(`/api/delete-productsize/${sizeId}`, "DELETE");
      setSizes(sizes.filter((size) => size._id !== sizeId));
      setShowConfirm({ show: false, sizeId: null });
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const handleImageUpload = async (e, type) => {
    const files = e.target.files;
    try {
      if (type === "thumbnail" && files.length > 0) {
        const url = await uploadToCloudinary(files[0], setUploadProgress);
        setFormData({ ...formData, thumbnail: url });
      } else if (files.length > 0) {
        const uploadPromises = Array.from(files).map(file => 
          uploadToCloudinary(file, setUploadProgress)
        );
        const urls = await Promise.all(uploadPromises);
        setFormData({ ...formData, image: [...formData.image, ...urls] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.image.filter((_, i) => i !== index);
    setFormData({ ...formData, image: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      
      // Update product
      await makeApi(`/api/update-product/${productId}`, "PUT", {
        ...formData,
        active: formData.active
      });
      
      // Update sizes
      for (const size of sizes) {
        if (size._id) {
          await makeApi(`/api/update-productsize/${size._id}`, "PUT", {
            ...size,
            active: size.active
          });
        } else {
          await makeApi(`/api/add-productsize`, "POST", {
            productId,
            ...size,
            active: size.active
          });
        }
      }
      
      console.log("Product updated successfully!");
      navigate("/admin/allproducts");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_update_product_page">
          <div>
            <Link to={"/admin/allproducts"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>

          <div className="update-product-container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
              {/* General Information Section */}
              <div className="form-section">
                <h3>General Information</h3>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tax (%):</label>
                  <input
                    type="number"
                    name="Tax"
                    value={formData.Tax}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>Active:</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sizes Section */}
              <div className="form-section">
                <h3>Sizes & Pricing</h3>
                <div className="size-section">
                  {sizes.map((size, index) => (
                    <div key={index} className="size-row">
                      <input
                        type="text"
                        value={size.size}
                        placeholder="Size"
                        onChange={(e) => handleSizeChange(e, index, "size")}
                      />
                      <input
                        type="text"
                        value={size.sizetype}
                        placeholder="Size Type"
                        onChange={(e) => handleSizeChange(e, index, "sizetype")}
                      />
                      <input
                        type="number"
                        value={size.quantity}
                        placeholder="Quantity"
                        onChange={(e) => handleSizeChange(e, index, "quantity")}
                        min="0"
                      />
                      <input
                        type="number"
                        value={size.price}
                        placeholder="Price"
                        onChange={(e) => handleSizeChange(e, index, "price")}
                        min="0"
                        step="0.01"
                      />
                      <input
                        type="number"
                        value={size.discountPercentage}
                        placeholder="Discount %"
                        onChange={(e) => handleSizeChange(e, index, "discountPercentage")}
                        min="0"
                        max="100"
                        step="0.01"
                      />
                      <input
                        type="number"
                        value={size.FinalPrice || ''}
                        placeholder="Final Price"
                        readOnly
                      />
                      <div className="checkbox-group">
                        <label>Active:</label>
                        <input
                          type="checkbox"
                          checked={size.active}
                          onChange={(e) => handleSizeChange(e, index, "active")}
                        />
                      </div>
                      {size._id && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirm({ show: true, sizeId: size._id })
                          }
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-more-sizes-button"
                    onClick={handleAddMoreSizes}
                  >
                    Add More Sizes
                  </button>
                </div>
              </div>

              {/* Images Section */}
              <div className="form-section">
                <h3>Images</h3>
                <div className="update_product_Image_section">
                  <label>Thumbnail:</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "thumbnail")}
                    accept="image/*"
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail"
                      className="update_product_image_thumbnail"
                    />
                  )}
                </div>

                <div className="update_product_Image_section">
                  <label>Product Images (Multiple):</label>
                  <div className="image-gallery">
                    {formData.image.map((img, index) => (
                      <div key={index} className="image_wrapper">
                        <img src={img} alt={`Product ${index}`} />
                        <button
                          type="button"
                          className="remove_image_button"
                          onClick={() => handleImageRemove(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "image")}
                    accept="image/*"
                    multiple
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="upload-progress">
                      <progress value={uploadProgress} max="100" />
                      <span>{uploadProgress}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-section">
                <button
                  type="submit"
                  className="admin_panel_button"
                  disabled={updateloader}
                >
                  {updateloader ? <Loader /> : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Size Popup */}
      {showConfirm.show && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this size?</p>
          <div className="confirmation-buttons">
            <button
              onClick={() => handleDeleteSize(showConfirm.sizeId)}
            >
              Yes
            </button>
            <button onClick={() => setShowConfirm({ show: false, sizeId: null })}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;