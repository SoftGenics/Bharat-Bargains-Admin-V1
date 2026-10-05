import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios'; // Import Axios
// import Header from '../Header'
import { SERVER_API_URL } from '../../server/server';
import Sidebar from '../Sidebar'

import './banner.css'

const Banner = () => {
    const [loading, setLoading] = useState(true);
    const [prevCount, setPrevCount] = useState(8)
    const [nextCount, setNextCount] = useState(15)
    const [updatedData, setUpdatedData] = useState([]);
    const [editPopup, setEditPopup] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [exactPlece, setExactPlece] = useState('');
    const [place, setPlace] = useState('');
    const [image, setImage] = useState(null);

    const [categoriesData, setCategoriesData] = useState([]);
    const [showCatPopup, setShowCatPopup] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState('');

    const [brandHeading, setBrandHeading] = useState([]);
    const [showBrandPopup, setShowBrandPopup] = useState(false);
    const [selectedHeadingId, setSelectedHeadingId] = useState(null);
    const [brandHeadingName, setBrandHeadingName] = useState('');

    // slider
    const [sliderData, setSliderData] = useState([]);
    const [showTopImagePopup, setShowTopImagePopup] = useState(false);
    const [selectedTopImageData, setSelectedTopImageData] = useState(null);


    useEffect(() => {
        fetchData();
        fetchCategories()
        fetchBrandHeading()
        fetchSlider()
    }, []);

    console.log(prevCount)
    console.log("next", nextCount)

    // const handlePrev = () => {
    //     if (prevCount > 5) {
    //         setPrevCount((prevState) => prevState - 5);
    //         setNextCount((prevState) => prevState - 5);
    //     } else if (prevCount <= 0) {
    //         setPrevCount((prevState) => prevState = 0);
    //         setNextCount((prevState) => prevState = 5);
    //     }
    //     else {
    //         setPrevCount((prevState) => prevState - 1);
    //         setNextCount((prevState) => prevState - 1);
    //     }
    // };

    // const handleNext = () => {
    //     const length = updatedData.length - 1
    //     if (length === nextCount) {
    //         setNextCount((prevState) => prevState = length);
    //         setPrevCount((prevState) => prevState = length - 5);
    //     } else {
    //         setNextCount((prevState) => prevState + 5);
    //         setPrevCount((prevState) => prevState + 5);
    //     }
    // };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/api/categories/all`);
            setCategoriesData(response.data);

        } catch (err) {
            console.log(err.message);
        }
    };

    const fetchBrandHeading = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/brand`);
            setBrandHeading(response.data);

        } catch (err) {
            console.log(err.message);
        }
    };


    const fetchData = async () => {
        try {
            // First API call
            const response1 = await axios.get(`${SERVER_API_URL}/api/carousel/all`);
            setUpdatedData(response1.data);
            console.log(response1.data, 'data')
            setLoading(false)
        } catch (error) {
            console.error('Error fetching images:', error);;
        }
    };

    // slider
    const fetchSlider = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/api/slider`);
            setSliderData(response.data.data);
            console.log("slider", response.data.data)
        } catch (err) {
            console.log(err.message);
        }
    }

    const openTopImagePopup = (data) => {
        setSelectedTopImageData({ ...data, newFile: null });
        setShowTopImagePopup(true);
    };

    const handleTopImageUpdate = async () => {
        if (!selectedTopImageData) return;

        const formData = new FormData();
        formData.append('slider_link', selectedTopImageData.slider_link);
        formData.append('slider_name', selectedTopImageData.slider_name); // Keep existing name
        if (selectedTopImageData.newFile) {
            formData.append('slider_url', selectedTopImageData.newFile);
        }

        try {
            const response = await fetch(`${SERVER_API_URL}/api/slider/edit/${selectedTopImageData.id}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert("Slider updated successfully!");
                setShowTopImagePopup(false);
                fetchSlider()
                // Refresh data
            } else {
                alert("Update failed!");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Error updating slider");
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare form data
        const formData = new FormData();
        formData.append('exact_place', exactPlece);
        formData.append('place', place);
        formData.append('image_url', image);
        // console.log(formData, "kkkkk")
        // Replace 'your-api-endpoint' with your actual API endpoint
        const apiUrl = `${SERVER_API_URL}/api/carousel/edit/${selectedId}`;

        try {
            const response = await axios.put(apiUrl, formData);
            if (response.status === 200) {
                alert('Image updated successfully!');
                setEditPopup(false);
                setSelectedId(null);
                setExactPlece('');
                setPlace('');
                setImage(null);
                fetchData();
            } else {
                console.error('Error updating image:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating image:', error.message);
        }
    };


    const onSubmitBrand = async () => {
        try {
            // API call to delete the item
            await axios.put(`${SERVER_API_URL}/brand/product/edit/${selectedHeadingId}`, { brand_name: brandHeadingName });
            // Fetch updated data after deletion
            fetchData();
            fetchCategories()
            setBrandHeadingName('')
            fetchBrandHeading()
            setShowBrandPopup(false)
            alert('Item edit successfully.');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const handleEdit = async (id) => {
        setSelectedId(id)
        setEditPopup(true)
    }

    // Open Edit Popup
    const handleEditClick = (id) => {
        setSelectedCategoryId(id);
        setShowCatPopup(true)
    };

    const onSubmitCategory = async () => {
        try {
            // API call to delete the item
            await axios.put(`${SERVER_API_URL}/api/categories/edit/${selectedCategoryId}`, { categories_name: categories });
            // Fetch updated data after deletion
            fetchData();
            fetchCategories()
            setCategories('')
            setShowCatPopup(false)
            alert('Item edit successfully.');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }


    const handlebrandEdit = (id) => {
        setSelectedHeadingId(id);
        setShowBrandPopup(true)
    };

    // const handleDelete = async (id) => {
    //     try {
    //         // API call to delete the item
    //         await axios.delete(`http://localhost:8000/api/carousel/delete/${id}`);
    //         // Fetch updated data after deletion
    //         fetchData();
    //         alert('Item deleted successfully.');

    //     } catch (error) {
    //         console.error('Error deleting item:', error);
    //     }
    // };

    return (
        <>
            {/* <Header /> */}
            <div className='main-layout'>
                <div className='sidebar-layout'>
                    <Sidebar />
                </div>
                <div className='component-layout'>
                    <div className='middle-container'>
                        {loading ? (
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={["#ff0000", "#ff0000", "#ff0000", "#ff0000"]}
                            />
                        ) : (
                            <>
                                <div className='table-container'>
                                    <table className='your-table-class'>

                                        <div className='scrool'>
                                            <h1 className='homepage-heading'>Home Page Header Section</h1>
                                            <div className="navbar-bottom">
                                                {categoriesData.length > 0 &&
                                                    categoriesData.map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className={`nav-link`}
                                                            onClick={() => handleEditClick(category.id)}
                                                        >
                                                            {category.categories_name}
                                                        </span>
                                                    ))}
                                            </div>
                                            {/* Edit Popup */}
                                            {showCatPopup && (
                                                <div className="popup-overlay">
                                                    <div className="popup-content">
                                                        <h2 className='edit-cetogory'>Edit Category</h2>
                                                        <label>Category Name:</label>
                                                        <input
                                                            type="text"
                                                            value={categories}
                                                            onChange={(e) => setCategories(e.target.value)}
                                                        />
                                                        <div className="popup-buttons">
                                                            <button className="save-btn" onClick={() => onSubmitCategory()} style={{ marginTop: "10px" }}>Save</button>
                                                            <button className="close-btn" onClick={() => setShowCatPopup(false)}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                            {/* TOP HEADER IMAGE GROUP A */}
                                            <h1 className='homepage-heading'>TOP HEADER IMAGE GROUP A</h1>
                                            {/* <p className='group-section'>SECTION 1</p> */}
                                            <p className='group-poster'>MINI IMAGE</p>
                                            <div className='custom-container'>
                                                {sliderData.map((eachData) =>
                                                    eachData.slider_name === 'top_mini_image' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' style={{ height: "150px" }} src={`${SERVER_API_URL}/uploads/${eachData.slider_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            {/* <div className='card-details' >
                                                                <p style={{ fontSize: "15px", marginBottom: "7px", fontWeight: "700" , color:"#ff6600"}}><strong style={{ color: "#00c2cb", fontSize: "13px", fontWeight: "700" }}>TOP IMAGE LINK :  </strong> {eachData.slider_link}</p>
                                                            </div> */}

                                                            <div className='card-actions'>
                                                                <button className='edit-btn'
                                                                    onClick={() => { openTopImagePopup(eachData)}}> Edit </button>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>

                                            {/* slider, top image, product image, popup */}
                                            {showTopImagePopup && selectedTopImageData && (
                                                <div className="topimage-popup-backdrop">
                                                    <div className="topimage-popup-modal">
                                                        
                                                        <div className="popup-field">
                                                            <label>Slider Link</label>
                                                            <input
                                                                type="text"
                                                                value={selectedTopImageData.slider_link}
                                                                onChange={(e) =>
                                                                    setSelectedTopImageData({ ...selectedTopImageData, slider_link: e.target.value })
                                                                }
                                                            />
                                                        </div>

                                                        <div className="popup-field">
                                                            <label>Upload New Image</label>
                                                            <input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    setSelectedTopImageData({ ...selectedTopImageData, newFile: e.target.files[0] })
                                                                }
                                                            />
                                                        </div>

                                                        <div className="popup-preview">
                                                            <p>Current Image</p>
                                                            <img
                                                                src={`${SERVER_API_URL}/uploads/${selectedTopImageData.slider_url}`}
                                                                alt="Preview"
                                                                className="popup-preview-image"
                                                            />
                                                        </div>

                                                        <div className="popup-actions">
                                                            <button className="cancel-btn" onClick={() => setShowTopImagePopup(false)}>Cancel</button>
                                                            <button className="update-btn" onClick={handleTopImageUpdate}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* TOP HEADER IMAGE GROUP A */}
                                            <h1 className='homepage-heading'>TOP SLIDER IMAGE GROUP </h1>
                                            {/* <p className='group-section'>SECTION 1</p> */}
                                            <p className='group-poster'>SLIDER IMAGE</p>
                                            <div className='custom-container'>
                                                {sliderData.map((eachData) =>
                                                    eachData.slider_name === 'banner' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' style={{ height: "150px" }} src={`${SERVER_API_URL}/uploads/${eachData.slider_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            {/* <div className='card-details' >
                                                                <p style={{ fontSize: "15px", marginBottom: "7px", fontWeight: "700", color:"#ff6600"}}><strong style={{ color: "#00c2cb", fontSize: "13px", fontWeight: "700" }}>TOP IMAGE LINK :  </strong> {eachData.slider_link}</p>
                                                            </div> */}

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => { openTopImagePopup(eachData)}}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>


                                            {/* TOP HEADER IMAGE GROUP A */}
                                            <h1 className='homepage-heading'>TOP HEADER IMAGE GROUP A</h1>
                                            {/* <p className='group-section'>SECTION 1</p> */}
                                            <p className='group-poster'>PRODUCT IMAGE</p>
                                            <div className='custom-container'>
                                                {sliderData.map((eachData) =>
                                                    eachData.slider_name === 'product_image' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' style={{ height: "150px" }} src={`${SERVER_API_URL}/uploads/${eachData.slider_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ fontSize: "15px", marginBottom: "7px", fontWeight: "700", color:"#ff6600"}}><strong style={{ color: "#00c2cb", fontSize: "13px", fontWeight: "700" }}>TOP IMAGE LINK :  </strong> {eachData.slider_link}</p>
                                                                {/* <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p> */}
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => { openTopImagePopup(eachData)}}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>

                                            {/* brand heading */}
                                            <h1 className='homepage-heading'>Home Page Heading Section</h1>
                                            <div className='brand-bg-container'>
                                                <div className="brand-container">
                                                    <ul className="brand-list">
                                                        {brandHeading?.result?.map((brand, index) => (
                                                            <li key={index} className="brand-item"
                                                                onClick={() => handlebrandEdit(brand.brand_id)}>
                                                                {brand.brand_name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Edit Popup */}
                                            {showBrandPopup && (
                                                <div className="popup-overlay">
                                                    <div className="popup-content">
                                                        <h2 className='edit-cetogory'>Edit Home Page Heading</h2>
                                                        <label>Heading Name:</label>
                                                        <input
                                                            type="text"
                                                            value={brandHeadingName}
                                                            onChange={(e) => setBrandHeadingName(e.target.value)}
                                                        />
                                                        <div className="popup-buttons">
                                                            <button className="save-btn" onClick={() => onSubmitBrand()} style={{ marginTop: "10px" }}>Save</button>
                                                            <button className="close-btn" onClick={() => setShowBrandPopup(false)}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Group A */}
                                            <h1 className='homepage-heading'>Home Page Banner Group A</h1>
                                            <p className='group-section'>SECTION 1</p>
                                            <p className='group-poster'>LEFT POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_1' && eachData.place === 'Group_A' && eachData.exact_place === 'left' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group A Rigth Poster */}
                                            <p className='group-poster'>RIGHT POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_1' && eachData.place === 'Group_A' && eachData.exact_place === 'right' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group A Section2 Left Poster */}
                                            <p className='group-section'>SECTION 2</p>
                                            <p className='group-poster'>LEFT POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_2' && eachData.place === 'Group_A' && eachData.exact_place === 'left' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group B Section1 CENTER POSTER */}
                                            <h1 className='homepage-heading'>Home Page Banner Group B</h1>
                                            <p className='group-section'>SECTION 1</p>
                                            <p className='group-poster'>CENTER POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_1' && eachData.place === 'Group_B' && eachData.exact_place === 'center_poster' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group B Section2 First */}
                                            <h1 className='homepage-heading'>Home Page Banner Group B</h1>
                                            <p className='group-section'>SECTION 1</p>
                                            <p className='group-poster'>Card</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_2' && eachData.place === 'Group_B' && eachData.exact_place === 'first' || eachData.exact_place === 'second' || eachData.exact_place === 'third' || eachData.exact_place === 'forth' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group B Section3 CENTER POSTER */}
                                            <h1 className='homepage-heading'>Home Page Banner Group B</h1>
                                            <p className='group-section'>SECTION 3</p>
                                            <p className='group-poster'>CENTER POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_3' && eachData.place === 'Group_B' && eachData.exact_place === 'center_poster' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group C Section1 First */}
                                            <h1 className='homepage-heading'>Home Page Banner Group C</h1>
                                            <p className='group-section'>SECTION 1</p>
                                            <p className='group-poster'>Card</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    (eachData.section === 'section_1' && eachData.place === 'Group_C') && eachData.exact_place === 'first' || eachData.exact_place === 'second' || eachData.exact_place === 'third' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group C Section1 CENTER POSTER */}
                                            <p className='group-section'>SECTION 2</p>
                                            <p className='group-poster'>CENTER POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_2' && eachData.place === 'Group_C' && eachData.exact_place === 'center_poster' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group C Section3 CENTER POSTER */}
                                            <p className='group-section'>SECTION 3</p>
                                            <p className='group-poster'>CENTER POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_3' && eachData.place === 'Group_C' && eachData.exact_place === 'center_poster' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                            {/* Group C Section4 CENTER POSTER */}
                                            <p className='group-section'>SECTION 3</p>
                                            <p className='group-poster'>CENTER POSTER</p>
                                            <div className='custom-container'>
                                                {updatedData.map((eachData) => (
                                                    eachData.section === 'section_4' && eachData.place === 'Group_C' && eachData.exact_place === 'center_poster' ? (
                                                        <div className='custom-card' key={eachData.id}>
                                                            <img className='carousel-image' src={`${SERVER_API_URL}/uploads/${eachData.image_url}`} alt={`ImageItem ${eachData.id + 1}`} />

                                                            <div className='card-details' >
                                                                <p style={{ color: "#000", fontSize: "16px", marginBottom: "7px" }}><strong>Place:</strong> {eachData.place}</p>
                                                                <p style={{ color: "#000", fontSize: "16px" }}><strong>Exact Place:</strong> {eachData.exact_place}</p>
                                                            </div>

                                                            <div className='card-actions'>
                                                                <button className='edit-btn' onClick={() => handleEdit(eachData.id)}>Edit</button>

                                                            </div>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>

                                        </div>
                                    </table>
                                </div>

                                {/* <div className='paggination-container'>
                                    <button className='next-btn' type='button' onClick={handlePrev}>Prev</button>
                                    <button className='next-btn' type='button' onClick={handleNext}>Next</button>
                                </div> */}

                                {/* popup */}
                                {editPopup && (
                                    <div className='popup-container'>
                                        <form className='your-form-class' encType="multipart/form-data" style={{ width: "95%" }} onSubmit={handleSubmit}>
                                            <div className='slider-input-form'>

                                                <label htmlFor="place">Place:</label>
                                                <input
                                                    id="place"
                                                    className='user-input'
                                                    type='text'
                                                    placeholder='Place'
                                                    value={place}
                                                    onChange={(e) => setPlace(e.target.value)}
                                                    required
                                                />

                                                <label htmlFor="exactPlace">Exact Place:</label>
                                                <input
                                                    id="exactPlace"
                                                    className='user-input'
                                                    type='text'
                                                    placeholder='Brand Name'
                                                    value={exactPlece}
                                                    onChange={(e) => setExactPlece(e.target.value)}
                                                    required
                                                />

                                                <input
                                                    className='user-input'
                                                    type='file'
                                                    placeholder='Image'
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    required
                                                />

                                                <div style={{ display: "flex" }}>
                                                    <input
                                                        type="submit"
                                                        className='submit-btn'
                                                        value="Upload Image"
                                                        name="submit"
                                                    />
                                                    <button className='submit-btn' style={{ marginLeft: "10px" }} onClick={() => setEditPopup(false)} type='button'>cancel</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                )}

                                {/* popup */}

                                {/* write your code */}
                            </>
                        )}
                    </div>
                </div >
            </div >

        </>
    )
}
export default Banner