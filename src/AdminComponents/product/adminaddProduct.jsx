// import React, { useState, useEffect } from "react";
// import "../../adminCss/product/adminaddProduct.css";
// import { makeApi } from "../../api/callApi";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchCategory } from "../../utils/CFunctions";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";

// function AdminaddProduct() {
//   const [categories, setCategories] = useState([]);
//   const [Loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState();
//   const [discountPercentage, setDiscountPercentage] = useState("0");
//   const [quantity, setQuantity] = useState("");
//   const [images, setImages] = useState([{}]);
//   const [thumbnail, setThumbnail] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [size, setSize] = useState("");
//   const [productType, setProductType] = useState("Domestic");
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   const [productSizes, setProductSizes] = useState([{ size: '', sizetype: '', quantity: '',price: '',discountPercentage: 0,FinalPrice: '' }]);

//   // size
//   // const handleSizeChange = (index, event) => {
//   //   const values = [...productSizes];
//   //   values[index][event.target.name] = event.target.value;
//   //   setProductSizes(values);
//   // };
//   const handleSizeChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedSizes = [...productSizes];

//     // Update the value of the changed field
//     updatedSizes[index][name] = parseFloat(value) || value;

//     // Recalculate FinalPrice if price or discountPercentage is changed
//     if (name === 'price' || name === 'discountPercentage') {
//       const { price, discountPercentage } = updatedSizes[index];
//       updatedSizes[index].FinalPrice = calculateFinalPrice(price, discountPercentage);
//     }

//     setProductSizes(updatedSizes);
//   };

//   const calculateFinalPrice = (price, discountPercentage) => {
//     return price - (price * (discountPercentage / 100));
//   };

//   const handleAddSize = () => {
//     setProductSizes([...productSizes, { size: '', sizetype: '', quantity: '',price: '',discountPercentage: 0,FinalPrice: '' }]);
//   };

//   const handleRemoveSize = (index) => {
//     const values = [...productSizes];
//     values.splice(index, 1);
//     setProductSizes(values);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requiredFields = [];
//     if (!name) requiredFields.push("Name");
//     // if (!price) requiredFields.push("Price");
//     // if (!quantity) requiredFields.push("Quantity");
//     if (!category) requiredFields.push("Category");
//     if (!thumbnail) requiredFields.push("Thumbnail");
//     if (!productType) requiredFields.push("Product Type");
//     if (images.length === 0 || images.includes("")) requiredFields.push("Product Images");

//     if (requiredFields.length > 0) {
//       const fieldNames = requiredFields.join(", ");
//       toast.error(`Please fill all required fields: ${fieldNames}`);
//       return;
//     }

//     try {
//       const response = await makeApi("/api/create-product", "POST", {
//         name,
//         description,
//         price,
//         discountPercentage: discountPercentage || 0,
//         quantity: quantity || 0,
//         image: images,
//         thumbnail,
//         category,
//         brand,
//         size,
//         productType,
//         productSizes,
//       });
//       // setName("");
//       // setDescription("");
//       // setPrice("");
//       // setDiscountPercentage("");
//       // setQuantity("");
//       // setImages([""]);
//       // setThumbnail("");
//       // setCategory("");
//       // setBrand("");
//       // setSize("");
//       // setProductType("Domestic");
//       // setProductSizes([{ size: '', sizetype: '', quantity: '' }]);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleImageChange = (index, value) => {
//     const updatedImages = [...images];
//     updatedImages[index] = value;
//     setImages(updatedImages);
//   };

//   const handleAddMoreImages = () => {
//     setImages([...images, ""]);
//   };

//   useEffect(() => {
//     setLoading(true);
//     try {
//       fetchCategory().then((data) => setCategories(data.categories));
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }

//   }, []);

//   const handleImageUpload = async (event, index) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {

//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         const imageURL = uploadedImageUrl;
//         handleImageChange(index, imageURL);

//       }
//     } catch (error) {
//       console.log("Image upload error", error);
//     }
//   };

//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         console.log(file);
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);

//         // if (response.status === 200) {
//         const imageURL = uploadedImageUrl;
//         setThumbnail(imageURL);
//         setThumbnailUploadProgress(100);
//         // }
//       }
//     } catch (error) {
//       console.log("Thumbnail upload error", error);
//     }
//   };
//   return (
//     <div className="add-product-container">
//       <div className="header-section">
//         <Link to={"/admin/allproducts"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//         <div className="add_product_text">Add Product</div>
//         <ToastContainer />
//       </div>
  
//       <form onSubmit={handleSubmit} className="form-section">
//         {/* Name & Description */}
//         <div className="section-wrapper">
//           <h3>Product Details</h3>
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
  
//         {/* Pricing & Quantity */}
//         {/* <div className="section-wrapper">
//           <h3>Pricing & Quantity</h3>
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Discount Percentage"
//             value={discountPercentage}
//             onChange={(e) => setDiscountPercentage(e.target.value)}
//           />
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div> */}
  
//         {/* Product Sizes */}
//         <div className="section-wrapper">
//           <h3>Product Sizes</h3>
//           {productSizes.map((size, index) => (
//             <div className="size-wrapper" key={index}>
//               <input
//                 type="text"
//                 name="size"
//                 placeholder="Size"
//                 value={size.size}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />
//               <input
//                 type="text"
//                 name="sizetype"
//                 placeholder="Size Type"
//                 value={size.sizetype}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />
//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="Stock"
//                 value={size.quantity}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={size.price}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />
//               <input
//                 type="number"
//                 name="discountPercentage"
//                 placeholder="Discount Percentage"
//                 value={size.discountPercentage}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />
//               <input
//                 type="number"
//                 name="FinalPrice"
//                 placeholder="Final Price"
//                 // value={size.price - size.discountPercentage}
//                 value={calculateFinalPrice(size.price, size.discountPercentage)}
//                 onChange={(event) => handleSizeChange(index, event)}
//               />

//               <button
//                 type="button"
//                 className="w-25 btn btn-danger"
//                 onClick={() => handleRemoveSize(index)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleAddSize}
//           >
//             Add More
//           </button>
//         </div>
  
//         {/* Images & Thumbnail */}
//         <div className="section-wrapper">
//           <h3>Product Images</h3>
//           {images.map((image, index) => (
//             <div key={index}>
//               <input
//                 type="file"
//                 className="add_product_input_filed add_product_input_filed_image"
//                 onChange={(event) => handleImageUpload(event, index)}
//               />
//               {uploadProgress[index] !== undefined && (
//                 <div className="upload-progress">
//                   {uploadProgress[index]}%
//                   {uploadProgress[index] < 100 && <div className="loader"></div>}
//                 </div>
//               )}
//               {image && (
//                 <img
//                   loading="lazy"
//                   src={image}
//                   alt={`Product ${index + 1}`}
//                   width={150}
//                   height={150}
//                 />
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             className="admin_add_product_button add_product_page_button"
//             onClick={handleAddMoreImages}
//           >
//             Add More
//           </button>
//         </div>
  
//         <div className="section-wrapper">
//           <h3>Product Thumbnail</h3>
//           <div className="file-upload-form">
//             <label htmlFor="file" className="file-upload-label">
//               <div className="file-upload-design">
//                 <svg viewBox="0 0 1024 1024" className="add_product_upload_image">
//                   <path className="path1" d="M384 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"></path>
//                   <path className="path2" d="M853.333333 725.333333v106.666667H170.666667v-106.666667H106.666667v106.666667c0 35.413333 28.586667 64 64 64h682.666666c35.413333 0 64-28.586667 64-64v-106.666667h-64z"></path>
//                   <path className="path3" d="M469.333333 554.666667l85.333334-113.066667 128 170.666667H341.333333L213.333333 469.333333l170.666667-213.333333 85.333333 106.666667 149.333334-192h-448c-35.413333 0-64 28.586667-64 64v554.666666h64v-405.333333l128 149.333333 85.333333 106.666667z"></path>
//                   <path className="path4" d="M725.333333 298.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"></path>
//                 </svg>
//               </div>
//             </label>
//             <input
//               type="file"
//               name="file"
//               id="file"
//               className="file-upload-input"
//               onChange={handleThumbnailUpload}
//             />
//             {thumbnailUploadProgress > 0 && (
//               <div className="upload-progress">
//                 {thumbnailUploadProgress}%
//                 {thumbnailUploadProgress < 100 && <div className="loader"></div>}
//               </div>
//             )}
//             {thumbnail && (
//               <img
//                 loading="lazy"
//                 src={thumbnail}
//                 alt="Thumbnail"
//                 width={150}
//                 height={150}
//               />
//             )}
//           </div>
//         </div>
  
//         {/* Additional Details */}
//         <div className="section-wrapper">
//           <h3>Additional Details</h3>
//           {/* <select
//             className="add_product_input_filed"
//             value={productType}
//             onChange={(e) => setProductType(e.target.value)}
//           >
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select> */}
//           <select
//             className="add_product_input_filed"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//           {/* <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Brand"
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//           /> */}
         
//         </div>
  
//         {/* Submit Button */}
//         <div className="submit-section">
//           <button type="submit" className="admin_add_product_button">
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
  
// }

// export default AdminaddProduct;


import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategory } from "../../utils/CFunctions";
import uploadToCloudinary from "../../utils/cloudinaryUpload";
import Loader from "../../components/loader/loader";

function AdminaddProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("Domestic");
  const [uploadProgress, setUploadProgress] = useState({});
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [active, setActive] = useState(true);
  const [tax, setTax] = useState(0.05);
  
  const [productSizes, setProductSizes] = useState([{ 
    size: '', 
    sizetype: '', 
    quantity: '', 
    price: '', 
    discountPercentage: 0, 
    FinalPrice: '',
    active: true 
  }]);

  const calculateFinalPrice = (price, discountPercentage) => {
    const priceNum = parseFloat(price) || 0;
    const discountNum = parseFloat(discountPercentage) || 0;
    return (priceNum - (priceNum * (discountNum / 100))).toFixed(2);
  };

  const handleSizeChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedSizes = [...productSizes];

    updatedSizes[index][name] = type === 'checkbox' ? checked : value;

    // Recalculate FinalPrice if price or discountPercentage is changed
    if (name === 'price' || name === 'discountPercentage') {
      const { price, discountPercentage } = updatedSizes[index];
      updatedSizes[index].FinalPrice = calculateFinalPrice(price, discountPercentage);
    }

    setProductSizes(updatedSizes);
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { 
      size: '', 
      sizetype: '', 
      quantity: '', 
      price: '', 
      discountPercentage: 0, 
      FinalPrice: '',
      active: true 
    }]);
  };

  const handleRemoveSize = (index) => {
    if (productSizes.length <= 1) {
      toast.error("At least one size is required");
      return;
    }
    const values = [...productSizes];
    values.splice(index, 1);
    setProductSizes(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate required fields
    const requiredFields = [];
    if (!name) requiredFields.push("Name");
    if (!category) requiredFields.push("Category");
    if (!thumbnail) requiredFields.push("Thumbnail");
    if (images.length === 0) requiredFields.push("Product Images");
    
    // Validate sizes
    const invalidSizes = productSizes.some(size => 
      !size.size || !size.sizetype || !size.price || isNaN(size.quantity)
    );
    if (invalidSizes) requiredFields.push("Valid size information for all sizes");

    if (requiredFields.length > 0) {
      toast.error(`Please fill all required fields: ${requiredFields.join(", ")}`);
      setSubmitting(false);
      return;
    }

    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        description,
        image: images,
        thumbnail,
        category,
        brand,
        productType,
        Tax: tax,
        active,
        productSizes: productSizes.map(size => ({
          ...size,
          price: parseFloat(size.price),
          discountPercentage: parseFloat(size.discountPercentage),
          quantity: parseInt(size.quantity),
          FinalPrice: parseFloat(size.FinalPrice)
        }))
      });

      toast.success("Product created successfully!");
      // Reset form
      setName("");
      setDescription("");
      setImages([]);
      setThumbnail("");
      setCategory("");
      setBrand("");
      setProductSizes([{ 
        size: '', 
        sizetype: '', 
        quantity: '', 
        price: '', 
        discountPercentage: 0, 
        FinalPrice: '',
        active: true 
      }]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (event, index) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const uploadPromises = Array.from(files).map(file => 
        uploadToCloudinary(file, (progress) => {
          setUploadProgress(prev => ({ ...prev, [index]: progress }));
        })
      );

      const urls = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...urls]);
    } catch (error) {
      console.log("Image upload error", error);
      toast.error("Failed to upload images");
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const uploadedImageUrl = await uploadToCloudinary(
        file, 
        setThumbnailUploadProgress
      );
      setThumbnail(uploadedImageUrl);
    } catch (error) {
      console.log("Thumbnail upload error", error);
      toast.error("Failed to upload thumbnail");
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCategory();
        setCategories(data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="add-product-container">
      <div className="header-section">
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
        <div className="add_product_text">Add Product</div>
        <ToastContainer />
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        {/* Product Details Section */}
        <div className="section-wrapper">
          <h3>Product Details</h3>
          <div className="form-group">
            <label>Name*</label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tax (%)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="Tax Percentage"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>Active</label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
        </div>

        {/* Product Sizes Section */}
        <div className="section-wrapper">
          <h3>Product Sizes & Pricing*</h3>
          {productSizes.map((size, index) => (
            <div className="size-wrapper" key={index}>
              <div className="size-input-group">
                <input
                  type="text"
                  name="size"
                  placeholder="Size (e.g., S, M, L)"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  required
                />
                <input
                  type="text"
                  name="sizetype"
                  placeholder="Size Type (e.g., US, UK)"
                  value={size.sizetype}
                  onChange={(e) => handleSizeChange(index, e)}
                  required
                />
              </div>
              <div className="size-input-group">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  min="0"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(index, e)}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  value={size.price}
                  onChange={(e) => handleSizeChange(index, e)}
                  required
                />
              </div>
              <div className="size-input-group">
                <input
                  type="number"
                  name="discountPercentage"
                  placeholder="Discount %"
                  min="0"
                  max="100"
                  step="0.01"
                  value={size.discountPercentage}
                  onChange={(e) => handleSizeChange(index, e)}
                />
                <input
                  type="number"
                  name="FinalPrice"
                  placeholder="Final Price"
                  value={size.FinalPrice || ''}
                  readOnly
                />
              </div>
              <div className="size-actions">
                <div className="checkbox-group">
                  <label>Active</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={size.active}
                    onChange={(e) => handleSizeChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveSize(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSize}
          >
            Add Size
          </button>
        </div>

        {/* Images Section */}
        <div className="section-wrapper">
          <h3>Product Images*</h3>
          <div className="images-grid">
            {images.map((image, index) => (
              <div className="image-preview" key={index}>
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => handleImageRemove(index)}
                >
                  ×
                </button>
                {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                  <div className="upload-progress">
                    <progress value={uploadProgress[index]} max="100" />
                    <span>{uploadProgress[index]}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="file-upload-wrapper">
            <label className="file-upload-label">
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, images.length)}
                multiple
                accept="image/*"
              />
              <span>+ Add Images (Multiple)</span>
            </label>
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="section-wrapper">
          <h3>Product Thumbnail*</h3>
          <div className="thumbnail-upload">
            {thumbnail ? (
              <div className="thumbnail-preview">
                <img src={thumbnail} alt="Thumbnail" />
                <button
                  type="button"
                  className="change-thumbnail-btn"
                  onClick={() => setThumbnail("")}
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="file-upload-wrapper">
                <label className="file-upload-label">
                  <input
                    type="file"
                    onChange={handleThumbnailUpload}
                    accept="image/*"
                  />
                  <span>+ Upload Thumbnail</span>
                </label>
              </div>
            )}
            {thumbnailUploadProgress > 0 && thumbnailUploadProgress < 100 && (
              <div className="upload-progress">
                <progress value={thumbnailUploadProgress} max="100" />
                <span>{thumbnailUploadProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Section */}
        <div className="section-wrapper">
          <h3>Category*</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button 
            type="submit" 
            className="admin_add_product_button"
            disabled={submitting}
          >
            {submitting ? <Loader small /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminaddProduct;