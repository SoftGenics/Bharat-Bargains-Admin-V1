import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { SERVER_API_URL } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

const Seller = () => {
    const [sellerData, setSellerData] = useState([]);

    // 🔥 FETCH USERS
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("admin_access_token");
            if (!token) {
                toast.error("Session expired");
                console.log("Session expired")
                return;
            }

            const res = await axios.get(`${SERVER_API_URL}/api/admin/seller/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                setSellerData(res.data.data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    // 🔥 HANDLE TOGGLE (FINAL)
    const handleToggle = async (admin_id, field, type) => {
        // ✅ Confirmation Alert
        const confirmAction = window.confirm(
            `Confirm ${type} Change\n\nDo you really want to change the user's ${type} to "${field}"?\n\nClick OK to proceed or Cancel to go back.`
          );

        if (!confirmAction) {
            return; // ❌ User clicked NO
        }

        try {
            const token = localStorage.getItem("admin_access_token");

            if (!token) {
                toast.error("Session expired");
                return;
            }

            let updatedData = sellerData.map((seller) => {
                if (seller.admin_id === admin_id) {

                    // 🔁 PERMISSION
                    if (type === "permissions") {
                        return {
                            ...seller,
                            permissions: {
                                ...seller.permissions,
                                [field]: !seller.permissions[field]
                            }
                        };
                    }

                    // 🔁 STATUS
                    if (type === "status") {
                        return {
                            ...seller,
                            admin_status:
                                seller.admin_status === "Approved"
                                    ? "Pending"
                                    : "Approved"
                        };
                    }

                    // ✅ ROLE (DIRECT SET FROM DROPDOWN)
                    if (type === "role") {
                        return {
                            ...seller,
                            role: field
                        };
                    }
                }
                return seller;
            });

            setSellerData(updatedData);

            const currentSeller = updatedData.find(s => s.admin_id === admin_id);

            let payload = {};

            if (type === "permission") {
                payload = {
                    permissions: {
                        [field]: true
                    }
                };
            }

            if (type === "status") {
                payload = {
                    admin_status: currentSeller.admin_status
                };
            }

            if (type === "role") {
                payload = {
                    role: field
                };
            }

            const res = await axios.put(
                `${SERVER_API_URL}/api/seller/update/${admin_id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.status === 200) {
                toast.success("Updated successfully");
                fetchUsers();
            }

        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Update failed");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={4000} />

            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>
                <div className="component-layout" style={{ padding: "0" }}>
                    <div className="home-dashbord-container" style={{ padding: "0" }}>
                        <div className="seller-page-container">

                            <div className="seller-page-header">
                                <h2 className="seller-page-title">Sellers Management</h2>
                            </div>

                            <div className="seller-table-wrapper">

                                <table className="seller-main-table">

                                    <thead className="seller-table-head">
                                        <tr className="seller-head-row">

                                            <th className="seller-head-name">Name</th>
                                            <th className="seller-head-email">Email</th>
                                            <th className="seller-head-admin">Admin Status</th>
                                            <th className="seller-head-admin">Role</th>
                                            <th className="seller-head-eyewear">Eyewear</th>
                                            <th className="seller-head-footwear">Footwear</th>
                                            <th className="seller-head-clothings">Clothings</th>
                                            <th className="seller-head-bags">Bags</th>
                                            <th className="seller-head-jewellery">Jewellery</th>

                                        </tr>
                                    </thead>

                                    <tbody className="seller-table-body">

                                        {sellerData.map((seller) => (
                                            <tr key={seller.admin_id} className="seller-body-row">

                                                <td className="seller-col-name">
                                                    {seller.firstName} {seller.lastName}
                                                </td>

                                                <td className="seller-col-email">{seller.email}</td>

                                                {/* 🔁 STATUS */}
                                                <td
                                                    className="seller-col-admin"
                                                    onClick={() => handleToggle(seller.admin_id, null, "status")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={
                                                        seller.admin_status === "Approved"
                                                            ? "seller-status-active"
                                                            : "seller-status-inactive"
                                                    }>
                                                        {seller.admin_status === "Approved" ? "Active" : "Inactive"}
                                                    </span>
                                                </td>

                                                {/* ✅ ROLE DROPDOWN */}
                                                <td className="seller-col-admin">
                                                    <select
                                                        value={seller.role}
                                                        onChange={(e) =>
                                                            handleToggle(seller.admin_id, e.target.value, "role")
                                                        }
                                                        style={{
                                                            padding: "5px",
                                                            borderRadius: "5px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        <option value="User">User</option>
                                                        <option value="Seller_Admin">Seller Admin</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </td>

                                                {/* 🔁 PERMISSIONS */}
                                                <td
                                                    className="seller-col-eyewear"
                                                    onClick={() => handleToggle(seller.admin_id, "eyewear", "permission")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={
                                                        seller.permissions.eyewear
                                                            ? "seller-approved"
                                                            : "seller-pending"
                                                    }>
                                                        {seller.permissions.eyewear ? "Approved" : "Pending"}
                                                    </span>
                                                </td>

                                                <td
                                                    className="seller-col-footwear"
                                                    onClick={() => handleToggle(seller.admin_id, "footwear", "permission")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={seller.permissions.footwear ? "seller-approved" : "seller-pending"}>
                                                        {seller.permissions.footwear ? "Approved" : "Pending"}
                                                    </span>
                                                </td>

                                                <td
                                                    className="seller-col-clothings"
                                                    onClick={() => handleToggle(seller.admin_id, "clothing", "permission")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={seller.permissions.clothing ? "seller-approved" : "seller-pending"}>
                                                        {seller.permissions.clothing ? "Approved" : "Pending"}
                                                    </span>
                                                </td>

                                                <td
                                                    className="seller-col-bags"
                                                    onClick={() => handleToggle(seller.admin_id, "bags", "permission")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={seller.permissions.bags ? "seller-approved" : "seller-pending"}>
                                                        {seller.permissions.bags ? "Approved" : "Pending"}
                                                    </span>
                                                </td>

                                                <td
                                                    className="seller-col-jewellery"
                                                    onClick={() => handleToggle(seller.admin_id, "jewellery", "permission")}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className={seller.permissions.jewellery ? "seller-approved" : "seller-pending"}>
                                                        {seller.permissions.jewellery ? "Approved" : "Pending"}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Seller;