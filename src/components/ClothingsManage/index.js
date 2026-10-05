import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SERVER_API_URL } from '../../server/server';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const ManageImage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [editData, setEditData] = useState({});
    const [activebtn, setActivebtn] = useState(true);
    const [notFoundMessage, setNotFoundMessage] = useState("");

    const token = localStorage.getItem("admin_access_token");

    if (!token) {
        navigate("/login");
    }


    const fetchProducts = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/clothing`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const result = await response.json();
            console.log("API RESULT:", result.data);

            setProducts(result.data); // ✅ correct
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const api = `${SERVER_API_URL}/api/clothing/${id}`;
        try {
            const response = await fetch(api, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // Assuming a successful response indicates the product was deleted
            setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== id));
            toast.success('Purse Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const openPopup = (product) => {
        setPopupProduct(product);
    };

    const closePopup = () => {
        setPopupProduct(null);
    };

    const openEditPopup = (product) => {
        setEditProduct(product);
        setEditData(product);
    };

    const closeEditPopup = () => {
        setEditProduct(null);
        setEditData({});
    };

    const updateProduct = async (event) => {
        event.preventDefault();
        setActivebtn(false);

        try {
            // Construct the request body
            const payload = {
                main_category: editData.main_category || '',
                sub_category: editData.sub_category || '',
                product_name: editData.product_name || '',
                product_type: editData.product_type || '',
                product_variant: editData.product_variant || '',
                brand_name: editData.brand_name || '',
                color: editData.color || '',
                price: editData.price || 0,
                discount_percent: editData.discount_percent || 0,
                description: editData.description || '',
                stock_status: editData.stock_status || '',
                Flipkart: editData.Flipkart || '',
                Amazon: editData.Amazon || '',
                Amazon_btn_name: editData.Amazon_btn_name || '',
                Flipkart_btn_name: editData.Flipkart_btn_name || '',
                rating: editData.rating || 0,
                total_reviews: editData.total_reviews || 0,

                material_type: editData.material_type || '',
                stone_type: editData.stone_type || '',
                weight: editData.weight || '',
                same_color_type: editData.same_color_type || '',
            };


            // API request to update the product
            const response = await fetch(`${SERVER_API_URL}/api/clothing/${editProduct.product_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload), // Send payload as JSON
            });

            if (response.ok) {
                // Update the local product list
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.product_id === editProduct.product_id
                            ? { ...product, ...editData }
                            : product
                    )
                );
                fetchProducts();
                closeEditPopup();
                toast.success('Product updated successfully!');
            } else {
                const responseText = await response.text(); // Parse error message if needed
                console.error('Error updating product:', responseText);
                toast.error('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('An error occurred while updating the product.');
        } finally {
            setActivebtn(true);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>
                <ToastContainer position="top-right" autoClose={4000} />

                <div className="component-layout">

                    <div className="product-list">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="product-card" key={product.product_id}>
                                    {/* Image Section */}
                                    <div className="image-container">
                                        <img
                                            src={`${SERVER_API_URL}/${product?.thumbnail_url}`}
                                            alt={product.product_title || 'Product'}
                                            className="product-image"
                                            onClick={() => openPopup(product)}
                                        />
                                    </div>
                                    {/* Details Section */}
                                    <div className="details-container">
                                        <p><strong>Price:</strong> ₹{product.price || 'N/A'}</p>
                                        <p><strong>Discount:</strong> {product.discount_percent || 'N/A'}%</p>
                                        <p><strong>Stock:</strong> {product.stock_status || 'N/A'}</p>
                                        <p style={{ textAlign: "left" }}><strong>Highlights:<br /><br /></strong> {product.product_name || 'N/A'}</p>
                                        <p><strong>Color:</strong></p>
                                        <div className="color-options">
                                            {(() => {
                                                try {
                                                    const colors = JSON.parse(product.color || '[]');
                                                    return Array.isArray(colors) && colors.length ? (
                                                        colors.map((colorObj, index) => {
                                                            const [colorName, colorCode] = Object.entries(colorObj)[0];
                                                            return (
                                                                <span
                                                                    key={index}
                                                                    title={colorName}
                                                                    style={{
                                                                        backgroundColor: colorCode,
                                                                        display: 'inline-block',
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '50%',
                                                                        margin: '0 5px',
                                                                        border: '1px solid #ddd',
                                                                    }}
                                                                ></span>
                                                            );
                                                        })
                                                    ) : (
                                                        <span>No colors available</span>
                                                    );
                                                } catch {
                                                    return <span>No colors available</span>;
                                                }
                                            })()}
                                        </div>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-button"
                                                onClick={() => openEditPopup(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteProduct(product.product_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            ))
                        ) : (
                            notFoundMessage === "" ? (
                                products.map((product) => (
                                    <div className="product-card" key={product.product_id}>
                                        {/* Image Section */}
                                        <div className="image-container">
                                            <img
                                                src={`${SERVER_API_URL}/${product?.product_thumnail_img}`}
                                                alt={product.product_title || 'Product'}
                                                className="product-image"
                                                onClick={() => openPopup(product)}
                                            />
                                        </div>
                                        {/* Details Section */}
                                        <div className="details-container">
                                            <h3>{product.product_title || 'N/A'}</h3>
                                            <p><strong>Price:</strong> ₹{product.product_price || 'N/A'}</p>
                                            <p><strong>Discount:</strong> {product.discount || 'N/A'}</p>
                                            <p><strong>Stock:</strong> {product.count_in_stock || 'N/A'}</p>
                                            <p><strong>Frame Type:</strong> {product.frem_type || 'N/A'}</p>
                                            <p><strong>Lens Type:</strong> {product.lens_type || 'N/A'}</p>
                                            <p><strong>Highlights:</strong> {product.highlights || 'N/A'}</p>

                                            <div className="action-buttons">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => openEditPopup(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteProduct(product.product_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                null
                            )
                        )}
                    </div>

                    {notFoundMessage ? (
                        <div className='not-found-container'>
                            <p className='not-found-massage'>{notFoundMessage}</p>
                        </div>
                    ) : (null)}

                </div>
            </div >

            {/* Popup Section */}

            {popupProduct && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closePopup}>×</button>
                        {/* Thumbnail Image */}
                        <img
                            src={`${SERVER_API_URL}/${popupProduct.thumbnail_url}`}
                            alt={popupProduct.product_name || 'Product'}
                            className="popup-image"
                        />

                        <div className="popup-details">
                            <p><strong>Main Category:</strong> {popupProduct.main_category || 'N/A'}</p>
                            <p><strong>Sub Category:</strong> {popupProduct.sub_category || 'N/A'}</p>
                            <p><strong>Brand:</strong> {popupProduct.brand_name || 'N/A'}</p>
                            <p><strong>Product_Name:</strong> {popupProduct.product_name || 'N/A'}</p>
                            <p><strong>Price:</strong> ₹{popupProduct.price || 'N/A'}</p>
                            <p><strong>Discount:</strong> {popupProduct.discount_percent || '0'}%</p>
                            <p><strong>Stock Status:</strong> {popupProduct.stock_status || 'N/A'}</p>

                            <p><strong>Product Type:</strong> {popupProduct.product_type || 'N/A'}</p>
                            <p><strong>Variant:</strong> {popupProduct.product_variant || 'N/A'}</p>

                            <p><strong>Size:</strong> {popupProduct.size || 'N/A'}</p>
                            <p><strong>Material:</strong> {popupProduct.material_type || 'N/A'}</p>
                            <p><strong>Fabric_Type:</strong> {popupProduct.fabric_type || 'N/A'}</p>
                            <p><strong>Pattern_Type:</strong> {popupProduct.pattern_type || 'N/A'}</p>
                            <p><strong>Care_Instructions:</strong> {popupProduct.care_instructions || 'N/A'}</p>
                            <p><strong>Fit_Type:</strong> {popupProduct.fit_type || 'N/A'}</p>
                            <p><strong>Same Color Type:</strong> {popupProduct.same_color_type || 'N/A'}</p>

                            <p><strong>Description:</strong> {popupProduct.description || 'N/A'}</p>

                            <p><strong>Rating:</strong> {popupProduct.rating || 0} ⭐</p>
                            <p><strong>Total Reviews:</strong> {popupProduct.total_reviews || 0}</p>

                            {/* Colors */}
                            <p><strong>Colors:</strong></p>
                            <div className="color-options">
                                {popupProduct.color ? (
                                    popupProduct.color.split(',').map((clr, idx) => (
                                        <span key={idx} className="color-badge">{clr}</span>
                                    ))
                                ) : (
                                    <span>N/A</span>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}


            {
                editProduct && (
                    <div className="unique-overlay" onClick={closeEditPopup}>
                        <div className="unique-container" onClick={(e) => e.stopPropagation()}>

                            <div className="unique-title-wrapper">
                                <h3 className="unique-title">Edit Product</h3>
                                <button className="unique-close-btn" onClick={closeEditPopup}>×</button>
                            </div>
                            <form className="unique-form" onSubmit={updateProduct}>
                                <div className="unique-form-group">
                                    <label htmlFor="main_category" className="unique-label">Main_Category:</label>
                                    <input
                                        type="text"
                                        id="main_category"
                                        name="main_category"
                                        value={editData.main_category || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="sub_category" className="unique-label">Sub_Category:</label>
                                    <input
                                        type="text"
                                        id="sub_category"
                                        name="sub_category"
                                        value={editData.sub_category || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="product_name" className="unique-label">Product_Name:</label>
                                    <input
                                        type="text"
                                        id="product_name"
                                        name="product_name"
                                        value={editData.product_name || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="product_type" className="unique-label">Product_Type:</label>
                                    <input
                                        type="text"
                                        id="product_type"
                                        name="product_type"
                                        value={editData.product_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="product_variant" className="unique-label">Product_Variant:</label>
                                    <input
                                        type="text"
                                        id="product_variant"
                                        name="product_variant"
                                        value={editData.product_variant || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="brand_name" className="unique-label">Brand_Name:</label>
                                    <input
                                        type="text"
                                        id="brand_name"
                                        name="brand_name"
                                        value={editData.brand_name || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="color" className="unique-label">Color:</label>
                                    <input
                                        type="text"
                                        id="color"
                                        name="color"
                                        value={editData.color || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>


                                <div className="unique-form-group">
                                    <label htmlFor="price" className="unique-label">Product Price:</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={editData.price || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="discount_percent" className="unique-label">Discount:</label>
                                    <input
                                        type="number"
                                        id="discount_percent"
                                        name="discount_percent"
                                        value={editData.discount_percent || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="stock_status" className="unique-label">Stock_Status:</label>
                                    <input
                                        type="number"
                                        id="stock_status"
                                        name="stock_status"
                                        value={editData.stock_status || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="description" className="unique-label">Description:</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={editData.description || ''}
                                        onChange={handleInputChange}
                                        className="unique-textarea"
                                    ></textarea>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="description" className="unique-label">Flipkart Link:</label>
                                    <input
                                        id="Flipkart"
                                        name="Flipkart"
                                        placeholder='https://www.flipkart.com/search?q=xyzbjk'
                                        value={editData.Flipkart || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    ></input>
                                </div>
                                
                                <div className="unique-form-group">
                                    <label htmlFor="Flipkart_btn_name" className="unique-label">Flipkart Btn Name:</label>
                                    <input
                                        id="Flipkart_btn_name"
                                        name="Flipkart_btn_name"
                                        placeholder='Like Flipkart'
                                        value={editData.Flipkart_btn_name || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    ></input>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="description" className="unique-label">Amazon Link:</label>
                                    <input
                                        id="Amazon"
                                        name="Amazon"
                                        placeholder='https://www.Amazon.com/search?q=xyzbjk'
                                        value={editData.Amazon || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    ></input>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="Amazon_btn_name" className="unique-label">Amazon Btn Name:</label>
                                    <input
                                        id="Amazon_btn_name"
                                        name="Amazon_btn_name"
                                        placeholder='Like Amazon'
                                        value={editData.Amazon_btn_name || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    ></input>
                                </div> 

                                <div className="unique-form-group">
                                    <label htmlFor="size" className="unique-label">Size:</label>
                                    <input
                                        type="text"
                                        id="size"
                                        name="size"
                                        value={editData.size || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="material_type" className="unique-label">Material_Type:</label>
                                    <input
                                        type="text"
                                        id="material_type"
                                        name="material_type"
                                        value={editData.material_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="fabric_type" className="unique-label">Fabric_Type:</label>
                                    <input
                                        type="text"
                                        id="fabric_type"
                                        name="fabric_type"
                                        value={editData.fabric_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="fit_type" className="unique-label">Fit_Type:</label>
                                    <input
                                        type="text"
                                        id="fit_type"
                                        name="fit_type"
                                        value={editData.fit_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="pattern_type" className="unique-label">Pattern_Type:</label>
                                    <input
                                        type="text"
                                        id="pattern_type"
                                        name="pattern_type"
                                        value={editData.pattern_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="same_color_type" className="unique-label">Same_Color_Type:</label>
                                    <input
                                        type="text"
                                        id="same_color_type"
                                        name="same_color_type"
                                        value={editData.same_color_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>
                                <div className="unique-form-group">
                                    <label htmlFor="care_instructions" className="unique-label">Care_Instructions:</label>
                                    <input
                                        type="text"
                                        id="care_instructions"
                                        name="care_instructions"
                                        value={editData.care_instructions || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                              
                                {activebtn ? (
                                    <button type="submit" className="unique-btn">Update</button>
                                ) : (
                                    <button type="button" disabled className="unique-btn-disabled">
                                        Updating...
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default ManageImage;
