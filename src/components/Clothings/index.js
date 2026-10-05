import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import Header from '../Header';
import { SERVER_API_URL } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Clothing = () => {
    const navigate = useNavigate();
    const [productAllImg, setProductAllImg] = useState([]);
    const [thumbnailImg, setThumbnailImg] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoThumbnail, setVideoThumbnail] = useState(null);

    const [mainCategory, setMainCategory] = useState('clothings');
    const [subCategory, setSubCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productVariant, setProductVariant] = useState('');
    const [brandName, setBrandName] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [description, setDescription] = useState('');
    const [stockStatus, setStockStatus] = useState('');
    const [flipkartLink, setFlipkartLink] = useState('');
    const [amazonLink, setAmazonLink] = useState('');
    const [flipkartBtnName, setFlipkartBtnName] = useState('');
    const [amazonBtnName, setAmazonBtnName] = useState('');

    /* ✅ CLOTHING MODEL FIELDS (ADDED ONLY) */
    const [size, setSize] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [fabricType, setFabricType] = useState('');
    const [fitType, setFitType] = useState('');
    const [patternType, setPatternType] = useState('');
    const [sameColorType, setSameColorType] = useState('');
    const [careInstructions, setCareInstructions] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const resetForm = () => {
        setProductAllImg([]);
        setThumbnailImg(null);
        setVideoUrl(null);
        setVideoThumbnail(null);

        setMainCategory('clothings');
        setSubCategory('');
        setProductName('');
        setProductType('');
        setProductVariant('');
        setBrandName('');
        setColor('');
        setPrice('');
        setDiscountPercent('');
        setDescription('');
        setStockStatus('');
        setFlipkartLink('');
        setAmazonLink('');
        setFlipkartBtnName('');
        setAmazonBtnName('');

        setSize('');
        setMaterialType('');
        setFabricType('');
        setFitType('');
        setPatternType('');
        setSameColorType('');
        setCareInstructions('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem("admin_access_token");
            if (!token) {
                navigate("/login");
            }

            const formData = new FormData();

            for (let i = 0; i < productAllImg.length; i++) {
                formData.append('images', productAllImg[i]);
            }

            if (thumbnailImg) formData.append('thumbnail_url', thumbnailImg);
            if (videoUrl) formData.append('video_url', videoUrl);
            if (videoThumbnail) formData.append('video_thumbnail_url', videoThumbnail);

            formData.append('main_category', mainCategory);
            formData.append('sub_category', subCategory);
            formData.append('product_name', productName);
            formData.append('product_type', productType);
            formData.append('product_variant', productVariant);
            formData.append('brand_name', brandName);
            formData.append('color', color);
            formData.append('price', price);
            formData.append('discount_percent', discountPercent);
            formData.append('description', description);
            formData.append('stock_status', stockStatus);
            formData.append('Flipkart', flipkartLink);
            formData.append('Amazon', amazonLink);
            formData.append('Flipkart_btn_name', flipkartBtnName);
            formData.append('Amazon_btn_name', amazonBtnName);

            /* ✅ MODEL MAPPED FIELDS */
            formData.append('size', JSON.stringify(size.split(',')));
            formData.append('material_type', materialType);
            formData.append('fabric_type', fabricType);
            formData.append('fit_type', fitType);
            formData.append('pattern_type', patternType);
            formData.append('same_color_type', sameColorType);
            formData.append('care_instructions', careInstructions);

            const response = await fetch(`${SERVER_API_URL}/api/clothing`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Clothing added successfully');
                resetForm();
            } else {
                toast.error(data?.message || 'Failed to add clothing');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>

                <ToastContainer position="top-right" autoClose={4000} />

                <div className="component-layout">
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>

                            {/* Images */}
                            <div className="form-group">
                                <label>Upload Product Images:</label>
                                <input type="file" multiple accept="image/*"
                                    onChange={(e) => setProductAllImg(e.target.files)} />
                            </div>

                            <div className="form-group">
                                <label>Thumbnail Image:</label>
                                <input type="file" accept="image/*"
                                    onChange={(e) => setThumbnailImg(e.target.files[0])} />
                            </div>

                            <div className="form-group">
                                <label>Video:</label>
                                <input type="file" accept="video/*"
                                    onChange={(e) => setVideoUrl(e.target.files[0])} />
                            </div>

                            <div className="form-group">
                                <label>Video Thumbnail:</label>
                                <input type="file" accept="image/*"
                                    onChange={(e) => setVideoThumbnail(e.target.files[0])} />
                            </div>

                            {/* SAME BASIC INFO */}
                            <div className="form-group">
                                <label>Main Category:</label>
                                <input
                                    type="text"
                                    value={mainCategory}
                                    onChange={(e) => setMainCategory(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Sub Category:</label>
                                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Product Name:</label>
                                <input value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Product Type:</label>
                                <input value={productType} onChange={(e) => setProductType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Product Variant:</label>
                                <input value={productVariant} onChange={(e) => setProductVariant(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Brand Name:</label>
                                <input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Color:</label>
                                <input value={color} onChange={(e) => setColor(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Discount %:</label>
                                <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Description:</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Stock Status:</label>
                                <input value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Flipkart Link:</label>
                                <input value={flipkartLink} placeholder='https://www.flipkart.com/search?q=xyzbjk' onChange={(e) => setFlipkartLink(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Flipkart Btn Name:</label>
                                <input value={flipkartBtnName} placeholder='Like Flipkart' onChange={(e) => setFlipkartBtnName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Amazon Link:</label>
                                <input value={amazonLink} placeholder='https://www.Amazon.com/search?q=xyzbjk' onChange={(e) => setAmazonLink(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Amazon Btn Name:</label>
                                <input value={amazonBtnName} placeholder='Like Amazone ' onChange={(e) => setAmazonBtnName(e.target.value)} />
                            </div>

                            {/* ✅ ONLY ADDED FIELDS */}
                            <div className="form-group">
                                <label>Size (S,M,L,XL):</label>
                                <input value={size} onChange={(e) => setSize(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Material Type:</label>
                                <input value={materialType} onChange={(e) => setMaterialType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Fabric Type:</label>
                                <input value={fabricType} onChange={(e) => setFabricType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Fit Type:</label>
                                <input value={fitType} onChange={(e) => setFitType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Pattern Type:</label>
                                <input value={patternType} onChange={(e) => setPatternType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Same Color Type:</label>
                                <input value={sameColorType} onChange={(e) => setSameColorType(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Care Instructions:</label>
                                <textarea value={careInstructions} onChange={(e) => setCareInstructions(e.target.value)} />
                            </div>

                            <button type="submit" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Clothing;
