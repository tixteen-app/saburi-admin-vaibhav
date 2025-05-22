// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { Link } from "react-router-dom";
// import ConfirmationModal from "../product/admindeleteproduct";
// function Getallcatogory() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteProductId, setDeleteProductId] = useState(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-categories", "GET");
//         if (response.status === 200) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);
//   const handleDeleteConfirm = () => {
//     if (deleteProductId) {
//       deleteProduct(deleteProductId);
//       setDeleteProductId(null);
//     }
//   };
//   const deleteProduct = async (productId) => {
//     try {
//       console.log(productId);
//       const response = await makeApi(
//         `/api/delete-category/${productId}`,
//         "DELETE"
//       );
//       console.log(response);
//       setCategories(categories.filter((product) => product._id !== productId));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div>
//           <div className="admin_add_product_button_div">
//             <Link to="/admin/add-category">
//               <div className="admin_add_product_button">Add Category</div>
//             </Link>
//           </div>
//           <div className="category-list">
//             <div className="category-list-header">All Categories</div>
//             <ul className="category_list_ul">
//               {categories.map((category) => (
//                 <li key={category._id}>
//                   <div>
//                     <h3>{category?.name}</h3>
//                     <p>{category?.description}</p>
//                   </div>
//                   <div>
//                     <div className="all_products_page_button">
//                       <Link to={`/admin/category-update/${category._id}`}>
//                         <button className="edit_button_all_product">
//                           Edit
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => setDeleteProductId(category._id)}
//                         className="delete_button_all_product"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <ConfirmationModal
//               isOpen={deleteProductId !== null}
//               onClose={() => setDeleteProductId(null)}
//               onConfirm={handleDeleteConfirm}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Getallcatogory;




import "../../adminCss/catogory/getallcatogory.css";
import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import ConfirmationModal from "../product/admindeleteproduct";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const CategoryManagement = () => {
  // State for category listing
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  // State for add/edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  // Fetch all categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteCategoryId) {
      deleteCategory(deleteCategoryId);
      setDeleteCategoryId(null);
    }
  };

  // Delete category function
  const deleteCategory = async (categoryId) => {
    try {
      const response = await makeApi(
        `/api/delete-category/${categoryId}`,
        "DELETE"
      );
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setThumbnailUploadProgress);
        setFormData({...formData, thumbnail: uploadedImageUrl});
        setThumbnailUploadProgress(100);
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };

  // Open modal for adding new category
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      description: "",
      thumbnail: ""
    });
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditModal = (category) => {
    setIsEditMode(true);
    setCurrentCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      thumbnail: category.thumbnail || ""
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form (for both add and edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isEditMode) {
        // Update existing category
        const response = await makeApi(
          `/api/update-category/${currentCategoryId}`,
          "PUT",
          formData
        );
        if (response.status === 200) {
          // Update the category in the list
          setCategories(categories.map(cat => 
            cat._id === currentCategoryId ? {...cat, ...formData} : cat
          ));
        }
      } else {
        // Add new category
        const response = await makeApi("/api/create-category", "POST", formData);
        if (response.status === 201) {
          // Add the new category to the list
          setCategories([...categories, response.data.category]);
        }
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
      setErrorMessage("Error saving category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      
      <div className="category-management-container">
        <div className="admin-header">
          <h1>Category Management</h1>
          <button onClick={openAddModal} className="admin-add-button">
            Add Category
          </button>
        </div>

        <div className="category-list-container">
          {categories.length === 0 ? (
            <div className="no-categories-message">
              No categories found. Add your first category!
            </div>
          ) : (
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category._id} className="category-item">
                  <div className="category-info">
                    {category.thumbnail && (
                      <img 
                        src={category.thumbnail} 
                        alt={category.name}
                        className="category-thumbnail"
                      />
                    )}
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>
                  </div>
                  <div className="category-actions">
                    <button 
                      onClick={() => openEditModal(category)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteCategoryId(category._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="category-modal">
            <div className="modal-header">
              <h2>{isEditMode ? "Edit Category" : "Add New Category"}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="close-modal"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="category-form">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="thumbnail">Category Image:</label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                />
                {thumbnailUploadProgress > 0 && thumbnailUploadProgress < 100 && (
                  <div className="upload-progress">
                    Uploading: {thumbnailUploadProgress}%
                  </div>
                )}
                {formData.thumbnail && (
                  <div className="thumbnail-preview">
                    <img 
                      src={formData.thumbnail} 
                      alt="Thumbnail preview" 
                    />
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {isEditMode ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteCategoryId !== null}
        onClose={() => setDeleteCategoryId(null)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this category?"
      />
    </>
  );
};

export default CategoryManagement;