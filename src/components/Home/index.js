import React, { useEffect, useState, useContext } from 'react';
// import Header from '../Header';
import { SERVER_API_URL } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../Sidebar';
import UserContext from "../../store/userData";

import './index.css';
// import { toast } from 'react-toastify';

const Home = () => {
    const { user, isLoggedIn, login, logout } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState([]);
    const [addressInfo, setAddressInfo] = useState([]);
    const [openCourierPopup, setOpenCourierPopup] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [formData, setFormData] = useState({
        delivery_status: "",
        slug: "",
        tracking_number: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.result); // Set all products
            console.log("data.result", data.result)
            fetchAdditionalInfo(); // Call the second API
            fetchAddressInfo()
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch additional information from the second API
    const fetchAdditionalInfo = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/payment/details`);
            if (!response.ok) {
                throw new Error('Failed to fetch additional info');
            }
            const data = await response.json();
            console.log("data", data)
            setAdditionalInfo(data); // Save additional info to state
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
            console.log("Address", data)
            setAddressInfo(data); // Save additional info to state
        } catch (error) {
            console.error('Error fetching additional Address info:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getProductImage = (productId) => {
        const product = products.find((product) => String(product.product_id) === String(productId));
        return product && product.product_thumnail_img
            ? `${SERVER_API_URL}/${product.product_thumnail_img}`
            : null;
    };

    // const getAddress = (mobile_number, id) => {
    //     const address = addressInfo.find((userAddress) => String(userAddress.mobile_num) === String(mobile_number));
    //     return address ? (
    //         <div className='address-td'>
    //             <p>{address.contact_name}</p>
    //             <p>{address.address}</p>
    //             <p>{address.city}, {address.state}, {address.pincode}</p>
    //         </div>
    //     ) : 'No Address Found';
    // };

    const getAddress = (mobile_number, id) => {
        console.log("id", id)
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
            const response = await fetch(`${SERVER_API_URL}/api/payment/orders/${selectedOrderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("✅ Order updated:", data);
            toast.success("Order updated successfully!");
            setOpenCourierPopup(false);
            fetchAdditionalInfo();
        } catch (error) {
            console.error("❌ Error updating order:", error);
            toast.error("❌ Error updating order:", error);
        }
    };


    return (
        <>
            {/* <Header /> */}
            <ToastContainer position="top-right" autoClose={4000} />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>
                <div className="component-layout" style={{ padding: "0" }}>
                    <div className="home-dashbord-container" style={{ padding: "0" }}>
                        {/* Display Additional Info in Table */}
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
                                            <th>QTY.</th>
                                            <th>Lens Type</th>
                                            <th>Selected Type</th>
                                            <th>Left Sph</th>
                                            <th>Left Cyl</th>
                                            <th>Right Sph</th>
                                            <th>Right Cyl</th>
                                            <th>Axis</th>
                                            <th>Traking Number</th>
                                            <th>Courier</th>
                                            <th>Delivery Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {additionalInfo.map((info) => (
                                            <tr key={info.id}>
                                                <td>{info.id}</td>
                                                <td>{info.mobile_number}</td>
                                                <td>
                                                    {getProductImage(info.product_id) ? (
                                                        <img
                                                            src={getProductImage(info.product_id)}
                                                            alt="Product"
                                                            style={{ width: '100%', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        'No Image'
                                                    )}
                                                </td>
                                                <td>{info.product_id}</td>
                                                <td>{info.paymentId}</td>
                                                <td >{getAddress(info.mobile_number, info.addresses_id) ? (
                                                    getAddress(info.mobile_number, info.selected_address_id)
                                                ) : (
                                                    'Something is missing'
                                                )}</td>
                                                <td>{info.selectLansType}</td>
                                                <td>{info.selected_Lens_Or_ProductPrice}</td>
                                                <td>{info.selected_type}</td>
                                                <td>{info.left_sph}</td>
                                                <td>{info.left_cyl}</td>
                                                <td>{info.right_sph}</td>
                                                <td>{info.right_cyl}</td>
                                                <td>{info.axis || 'N/A'}</td>
                                                <td>{info.traking_number || 'N/A'}</td>
                                                <td>{info.delivery_status || 'N/A'}</td>
                                                <td>{new Date(info.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))} */}
                                        {[...additionalInfo]
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                            .map((info) => (
                                                <tr key={info.id}>
                                                    <td>{info.id}</td>
                                                    <td>{info.mobile_number}</td>
                                                    <td>
                                                        {getProductImage(info.product_id) ? (
                                                            <img
                                                                src={getProductImage(info.product_id)}
                                                                alt="Product"
                                                                style={{ width: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </td>
                                                    <td>{info.product_id}</td>
                                                    <td>{info.paymentId}</td>
                                                    <td>
                                                        {getAddress(info.mobile_number, info.addresses_id) ? (
                                                            getAddress(info.mobile_number, info.selected_address_id)
                                                        ) : (
                                                            'Something is missing'
                                                        )}
                                                    </td>
                                                    <td>{info.selected_Lens_Or_ProductPrice}</td>
                                                    <td>{info.product_quantity ? info.product_quantity : "1"}</td>
                                                    <td>{info.selectLansType}</td>
                                                    <td>{info.selected_type}</td>
                                                    <td>{info.left_sph}</td>
                                                    <td>{info.left_cyl}</td>
                                                    <td>{info.right_sph}</td>
                                                    <td>{info.right_cyl}</td>
                                                    <td>{info.axis || 'N/A'}</td>
                                                    <td onClick={() => updateCourierDetails(info)}>{info.tracking_number || 'N/A'}</td>
                                                    <td onClick={() => updateCourierDetails(info)}>{info.slug || 'N/A'}</td>
                                                    <td onClick={() => updateCourierDetails(info)}>{info.delivery_status || 'N/A'}</td>
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
