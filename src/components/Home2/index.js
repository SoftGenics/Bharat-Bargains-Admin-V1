import React, { useEffect, useState } from 'react';
// import Header from '../Header';
import { SERVER_API_URL } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../Sidebar';

import './index.css';
// import { toast } from 'react-toastify';

const Home = () => {
    // filter states
    const [filterType, setFilterType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [productFilter, setProductFilter] = useState("");
    const [searchEmail, setSearchEmail] = useState("");


    // const [products, setProducts] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState([]);
    const [addressInfo, setAddressInfo] = useState([]);
    const [openCourierPopup, setOpenCourierPopup] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [formData, setFormData] = useState({
        delivery_status: "",
        slug: "",
        tracking_number: ""
    });
    // console.log("userData.email", userData.email)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchAdditionalInfo = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cashfree/all/seller/oder/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch additional info');
            }
            const data = await response.json();
            console.log("data mix", data)
            setAdditionalInfo(data); // Save additional info to state
            fetchAdditionalInfo(); // Call the second API
            fetchAddressInfo()
        } catch (error) {
            console.error('Error fetching additional info:', error);
        }
    };

    // Fetch additional Address information from the second API
    const fetchAddressInfo = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/getallUserInfo`);
            if (!response.ok) {
                throw new Error('Failed to fetch additional Address info');
            }
            const data = await response.json();
            // console.log("Address", data)
            setAddressInfo(data); // Save additional info to state
        } catch (error) {
            console.error('Error fetching additional Address info:', error);
        }
    };

    useEffect(() => {
        fetchAdditionalInfo();
    }, []);

    const getAddress = (mobile_number, id) => {
        // console.log("id", id)
        const address = id
            ? addressInfo.find(
                (userAddress) =>
                    //   String(userAddress.mobile_num) === String(mobile_number) &&
                    String(userAddress.addresses_id) === String(id)
            )
            : addressInfo.find(
                (userAddress) => String(userAddress.mobile_num) === String(mobile_number)
            );

        return address ? (
            <div className='address-td'>
                <p>{address.contact_name}</p>
                <p>{address.address}</p>
                <p>{address.city}, {address.state}, {address.pincode}</p>
            </div>
        ) : 'No Address Found';
    };

    const updateCourierDetails = (order) => {
        setSelectedOrderId(order.id)
        setFormData({
            tracking_number: order.tracking_number || "",
            slug: order.slug || "",
            delivery_status: order.delivery_status || "processing", // default if null
        });
        setOpenCourierPopup(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cashfree/orders/update/${selectedOrderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed Order updated!');
            }
            toast.success("Order updated successfully!");
            setOpenCourierPopup(false);
            fetchAdditionalInfo();
        } catch (error) {
            console.error("❌ Error updating order:", error);
            toast.error("❌ Error updating order:", error);
        }
    }; 
   
     // filter logic
    const filteredOrders = additionalInfo.filter((order) => {

        const orderDate = new Date(order.createdAt);
        const today = new Date();

        // =========================
        // DATE FILTER
        // =========================

        // Today Orders
        if (filterType === "today") {

            const isToday =
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear();

            if (!isToday) return false;
        }

        // Last 7 Days
        if (filterType === "last7days") {

            const last7 = new Date();
            last7.setDate(today.getDate() - 7);

            if (orderDate < last7) return false;
        }

        // Custom Date Range
        if (filterType === "custom") {

            if (startDate && endDate) {

                const start = new Date(startDate);
                const end = new Date(endDate);

                end.setHours(23, 59, 59, 999);

                const isBetween =
                    orderDate >= start &&
                    orderDate <= end;

                if (!isBetween) return false;
            }
        }

        // =========================
        // PRODUCT FILTER
        // =========================

        if (productFilter) {

            // eyewear if main_category null
            const category = order.main_category || "eyewear";

            if (category !== productFilter) {
                return false;
            }
        }

        // =========================
        // EMAIL SEARCH
        // =========================

        if (searchEmail) {

            const sellerEmail = order.admin?.email || "";

            if (
                !sellerEmail
                    .toLowerCase()
                    .includes(searchEmail.toLowerCase())
            ) {
                return false;
            }
        }

        return true;
    });

    
    console.log("filteredOrders", filteredOrders)

    if (!additionalInfo) return <h2 className="loading-text">Loading</h2>

    return (
        <>
            {/* <Header /> */}
            <ToastContainer position="top-right" autoClose={4000} />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>
                <div className="component-layout" style={{ padding: "0" }}>
                    {additionalInfo.length === 0 && (
                        <div className="no-product-container">
                            <div className="no-product-card">
                                <div className="icon">🛍️</div>
                                <h2>No Products Order Found</h2>
                                <p>Sorry, we couldn't find any products right now.</p>
                                <button onClick={() => window.location.reload()}>
                                    Refresh
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="home-dashbord-container" style={{ padding: "0" }}>
                        {/* Display Additional Info in Table */}

                        {/* search */}
                        <div className="order-filter-container">

                            {/* HEADER */}
                            <div className="filter-header">

                                <div>
                                    <h2 className="filter-title">
                                        Order Filters
                                    </h2>

                                    <p className="filter-subtitle">
                                        Search and manage seller orders easily
                                    </p>
                                </div>

                                <div className="filter-badge">
                                    Smart Dashboard
                                </div>

                            </div>

                            {/* FILTER GRID */}
                            <div className="filter-grid">

                                {/* EMAIL SEARCH */}
                                <div className="filter-card">

                                    <label className="filter-label">
                                        Seller Email
                                    </label>

                                    <div className="search-wrapper">

                                        <span className="search-icon">🔍</span>

                                        <input
                                            type="text"
                                            placeholder="Search seller email..."
                                            value={searchEmail}
                                            onChange={(e) => setSearchEmail(e.target.value)}
                                            className="filter-input"
                                        />

                                    </div>
                                </div>

                                {/* ORDER FILTER */}
                                <div className="filter-card">

                                    <label className="filter-label">
                                        Order Type
                                    </label>

                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Orders</option>
                                        <option value="today">Today Orders</option>
                                        <option value="last7days">Last 7 Days</option>
                                        <option value="custom">Custom Date</option>
                                    </select>

                                </div>

                                {/* PRODUCT FILTER */}
                                <div className="filter-card">

                                    <label className="filter-label">
                                        Product Type
                                    </label>

                                    <select
                                        value={productFilter}
                                        onChange={(e) => setProductFilter(e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Products</option>
                                        <option value="eyewear">Eyewear</option>
                                        <option value="jewellery">Jewellery</option>
                                        <option value="clothings">Clothing</option>
                                        <option value="footwear">Footwear</option>
                                        <option value="purse">Purse</option>
                                    </select>

                                </div>

                            </div>

                            {/* CUSTOM DATE */}
                            {filterType === "custom" && (

                                <div
                                    className="filter-card"
                                    style={{ marginTop: "18px" }}
                                >

                                    <label className="filter-label">
                                        Select Date Range
                                    </label>

                                    <div className="date-box">

                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="date-input"
                                        />

                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="date-input"
                                        />

                                    </div>

                                </div>
                            )}

                            {/* BUTTONS */}
                            <div className="filter-actions">

                                <button className="filter-btn apply-btn">
                                    Apply Filters
                                </button>

                                <button
                                    className="filter-btn reset-btn"
                                    onClick={() => {
                                        setFilterType("");
                                        setProductFilter("");
                                        setSearchEmail("");
                                        setStartDate("");
                                        setEndDate("");
                                    }}
                                >
                                    Reset Filters
                                </button>

                            </div>

                            {/* ACTIVE FILTERS */}
                            <div className="active-filters">

                                {searchEmail && (
                                    <div className="filter-chip">
                                        {searchEmail}
                                    </div>
                                )}

                                {filterType && (
                                    <div className="filter-chip">
                                        {filterType}
                                    </div>
                                )}

                                {productFilter && (
                                    <div className="filter-chip">
                                        {productFilter}
                                    </div>
                                )}

                            </div>

                        </div>

                        <div className="additional-info-list">
                            {/* <h2 className="client-heading">Additional Information</h2> */}
                            <div className="scrollable-table-container">
                                <table className="info-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Mobile Number</th>
                                            <th>Product Image</th>
                                            <th>Product ID</th>
                                            <th>Payment ID</th>
                                            <th>Address</th>
                                            <th>Lens/Price</th>
                                            <th>QTY</th>
                                            <th>Traking Number</th>
                                            <th>Courier</th>
                                            <th>Delivery Status</th>
                                            <th>Seller Details</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {[...filteredOrders]
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                            .map((info, index) => (

                                                <tr key={info.id}>

                                                    <td>{index + 1}</td>
                                                    <td>{info.mobile_number}</td>

                                                    <td>
                                                        {info.product_image ? (
                                                            <img
                                                                src={`${SERVER_API_URL}/${info.product_image}`}
                                                                alt="Product"
                                                                style={{
                                                                    width: "100%",
                                                                    objectFit: "cover",
                                                                    height: "60px"
                                                                }}
                                                            />
                                                        ) : (
                                                            "No Image"
                                                        )}
                                                    </td>

                                                    <td>{info.product_id}</td>
                                                    <td>{info.payment_id}</td>
                                                    <td>
                                                        {getAddress(info.mobile_number, info.addresses_id) ? (
                                                            getAddress(info.mobile_number, info.selected_address_id)
                                                        ) : (
                                                            'Something is missing'
                                                        )}
                                                    </td>
                                                    <td>{info.selected_Lens_Or_ProductPrice}</td>

                                                    <td>{info.product_quantity ? info.product_quantity : "1"}</td>


                                                    <td onClick={() => updateCourierDetails(info)}>{info.tracking_number || 'N/A'}</td>
                                                    <td onClick={() => updateCourierDetails(info)}>{info.slug || 'N/A'}</td>
                                                    <td onClick={() => updateCourierDetails(info)}>{info.delivery_status || 'N/A'}</td>

                                                    {/* Admin Details */}
                                                    <td>
                                                        {info?.admin ? (
                                                            <>
                                                                {info.admin.firstName}{" "}
                                                                {info.admin.lastName}
                                                                <br />
                                                                {info.admin.email}
                                                            </>
                                                        ) : (
                                                            "No Admin"
                                                        )}
                                                    </td>
                                                    <td>{new Date(info.createdAt).toLocaleString()}</td>
                                                </tr>

                                            ))}

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openCourierPopup && (
                <div className="courier-popup-overlay">
                    <div className="courier-popup-container">
                        <h2 className="courier-popup-title">Update Courier Details</h2>
                        <input
                            type="text"
                            name="tracking_number"
                            placeholder="Tracking Number"
                            value={formData.tracking_number}
                            onChange={handleChange}
                            className="courier-input"
                        />
                        <input
                            type="text"
                            name="slug"
                            placeholder="Courier Slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="courier-input"
                        />
                        <input
                            type="text"
                            name="delivery_status"
                            placeholder="Delivery Status"
                            value={formData.delivery_status}
                            onChange={handleChange}
                            className="courier-input"
                        />
                        <div className="courier-popup-actions">
                            <button className="courier-btn courier-btn-update" onClick={handleUpdate}>
                                Update
                            </button>
                            <button
                                className="courier-btn courier-btn-cancel"
                                onClick={() => setOpenCourierPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default Home;
