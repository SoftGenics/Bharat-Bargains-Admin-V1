// import Header from '../Header'
import Sidebar from '../Sidebar'
import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const ProductLink = () => {
    const [formData, setFormData] = useState({
        product_id: "",
        main_category: "",
        price: "",
        link: "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


    };

    // Image select
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (!selectedImage) return;

        setImage(selectedImage);

        const previewUrl = URL.createObjectURL(selectedImage);
        setImagePreview(previewUrl);

    };

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Please select an image");
            return;
        }

        if (
            !formData.product_id ||
            !formData.price ||
            !formData.link
        ) {
            setMessage(
                "Product ID, price and link are required"
            );
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const data = new FormData();

            data.append(
                "product_id",
                formData.product_id
            );

            // Optional field
            if (formData.main_category.trim()) {
                data.append(
                    "main_category",
                    formData.main_category
                );
            }

            data.append(
                "price",
                formData.price
            );

            data.append(
                "link",
                formData.link
            );

            // Backend: .single("image")
            data.append("image", image);

            const response = await axios.post("http://localhost:8000/api/product/link",
                data
            );

            setMessage(
                response.data.message ||
                "Product added successfully"
            );

            // Reset form
            setFormData({
                product_id: "",
                main_category: "",
                price: "",
                link: "",
            });

            setImage(null);
            setImagePreview(null);

            // File input reset
            document.getElementById(
                "product-image"
            ).value = "";

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }


    };

    return (

        <>
            {/* <Header /> */}
            <div className='main-layout'>
                <div className='sidebar-layout'>
                    <Sidebar />
                </div>
                <div className='component-layout'>

                    <div className="product-link-page">
                        <div className="product-link-card">

                            < div className="form-header" >
                                <div className="header-icon">
                                    🔗
                                </div>

                                <div>
                                    <h1>Add Product Link</h1>

                                    <p>
                                        Add product details, image and
                                        external purchase link.
                                    </p>
                                </div>
                            </div >

                            {message && (
                                <div
                                    className={`message ${message.toLowerCase().includes(
                                        "success"
                                    )
                                        ? "success"
                                        : "error"
                                        }`}
                                >
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="form-grid">

                                    {/* Product ID */}
                                    <div className="form-group">
                                        <label>
                                            Product ID
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="number"
                                            name="product_id"
                                            value={
                                                formData.product_id
                                            }
                                            onChange={handleChange}
                                            placeholder="Enter product ID"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    {/* Main Category */}
                                    <div className="form-group">
                                        <label>
                                            Main Category

                                        </label>

                                        <select
                                            name="main_category"
                                            value={formData.main_category}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Eyewear
                                            </option>

                                            <option value="footwear">
                                                Footwear
                                            </option>

                                            <option value="jewellery">
                                                Jewellery
                                            </option>

                                            <option value="purse">
                                                Purse
                                            </option>

                                            <option value="clothings">
                                                Clothings
                                            </option>
                                        </select>
                                    </div>

                                    {/* Price */}
                                    <div className="form-group">
                                        <label>
                                            Price
                                            <span>*</span>
                                        </label>

                                        <div className="price-input">
                                            <span>₹</span>

                                            <input
                                                type="number"
                                                name="price"
                                                value={
                                                    formData.price
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter price"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Product Link */}
                                    <div className="form-group">
                                        <label>
                                            Product Link
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="url"
                                            name="link"
                                            value={
                                                formData.link
                                            }
                                            onChange={handleChange}
                                            placeholder="https://example.com/product"
                                            required
                                        />
                                    </div>

                                </div>

                                {/* Image Upload */}
                                <div className="form-group image-group">

                                    <label>
                                        Product Image
                                        <span>*</span>
                                    </label>

                                    <label
                                        htmlFor="product-image"
                                        className="image-upload-box"
                                    >
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Product preview"
                                                className="image-preview"
                                            />
                                        ) : (
                                            <div className="upload-content" style={{paddingTop:"40px"}}>
                                                <div className="upload-icon">
                                                    📷
                                                </div>

                                                <h3>
                                                    Upload Product Image
                                                </h3>

                                                <p>
                                                    Click here to select an image
                                                </p>

                                                <small>
                                                    JPG, PNG or WEBP
                                                </small>
                                            </div>
                                        )}
                                    </label>

                                    <input
                                        id="product-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handleImageChange
                                        }
                                        hidden
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Adding Product..."
                                        : "Add Product"}
                                </button>

                            </form>

                        </div >
                    </div >

                </div>
            </div>

        </>



    );
};

export default ProductLink;
