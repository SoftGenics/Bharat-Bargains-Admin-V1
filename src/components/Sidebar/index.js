import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [openPurse, setOpenPurse] = useState(true);
    const [openEyewear, setOpenEyewear] = useState(false);
    const [openJewelry, setOpenJewelry] = useState(false);
    const [openClothing, setOpenClothing] = useState(true);
    const [openFootwear, setOpenFootwear] = useState(false);

    const handleLogout = async () => {
        try {
            // LocalStorage se token remove
            localStorage.removeItem("admin_access_token");

            // Redirect to login page
            navigate("/login");

        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className='sidebar-main-container'>
            <input type="checkbox" checked="true" id="check" />
            {/* <label htmlFor="check">
            <i className="fas fa-bars " id="btn"></i>
            <i className="fas fa-times " id="cancel"></i>
            </label> */}

            <div className="sidebar">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/cashfree/sale" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Cash Free Sale</span>
                </NavLink>

                <NavLink to="/bargains" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-tags"></i>
                    <span>Bargains </span>
                </NavLink>

                {/* PURSE MENU */}
                <div className="menu-item" onClick={() => setOpenEyewear(!openEyewear)}>
                    <div className='' style={{ marginLeft: "5px" }}>
                        <i className="fas fa-wallet"></i>
                        <span className='item-name' style={{ fontSize: "18px", }}>Eyewears</span>
                    </div>
                    <i className={`fas fa-chevron-${openEyewear ? 'up' : 'down'} arrow`}></i>
                </div>

                {openEyewear && (
                    <div className="submenu">
                        <NavLink to="/eyewear" className={({ isActive }) => isActive ? "active" : ""}>
                            ➕ Add Eyewears
                        </NavLink>

                        <NavLink to="/eyewear-manage" className={({ isActive }) => isActive ? "active" : ""}>
                            🛠 Manage Eyewears
                        </NavLink>
                    </div>
                )}

                {/* PURSE MENU */}
                <div className="menu-item" onClick={() => setOpenPurse(!openPurse)}>
                    <div className='' style={{ marginLeft: "5px" }}>
                        <i className="fas fa-wallet"></i>
                        <span className='item-name' style={{ fontSize: "18px", }}>Purse</span>
                    </div>
                    <i className={`fas fa-chevron-${openPurse ? 'up' : 'down'} arrow`}></i>
                </div>

                {openPurse && (
                    <div className="submenu">
                        <NavLink to="/purse" className={({ isActive }) => isActive ? "active" : ""}>
                            ➕ Add Purse
                        </NavLink>

                        <NavLink to="/purse-manage" className={({ isActive }) => isActive ? "active" : ""}>
                            🛠 Manage Purse
                        </NavLink>
                    </div>
                )}


                {/* JEWELRY MENU */}
                <div className="menu-item" onClick={() => setOpenJewelry(!openJewelry)}>
                    <div className='' style={{ marginLeft: "4px" }}>
                        <i className="fas fa-gem" style={{ fontSize: "20px" }}></i>
                        <span className='item-name' style={{ fontSize: "16px", marginLeft: "20px" }}>JEWELRY</span>
                    </div>
                    <i className={`fas fa-chevron-${openJewelry ? 'up' : 'down'} arrow`}></i>
                </div>

                {openJewelry && (
                    <div className="submenu">
                        <NavLink to="/jewelry" className={({ isActive }) => isActive ? "active" : ""}>
                            ➕ Add Jewelry
                        </NavLink>

                        <NavLink to="/jewelry-manage" className={({ isActive }) => isActive ? "active" : ""}>
                            🛠 Manage Jewelry
                        </NavLink>
                    </div>
                )}


                {/* CLOTHING MENU */}
                <div className="menu-item" onClick={() => setOpenClothing(!openClothing)}>
                    <div style={{ marginLeft: "5px" }}>
                        <i className="fas fa-tshirt" style={{ fontSize: "20px" }}></i>
                        <span className='item-name' style={{ fontSize: "16px", marginLeft: "20px" }}>CLOTHINGS</span>
                    </div>
                    <i className={`fas fa-chevron-${openClothing ? 'up' : 'down'} arrow`}></i>
                </div>

                {openClothing && (
                    <div className="submenu">
                        <NavLink to="/clothings" className={({ isActive }) => isActive ? "active" : ""}>
                            ➕ Add Clothing
                        </NavLink>

                        <NavLink to="/clothings-manage" className={({ isActive }) => isActive ? "active" : ""}>
                            🛠 Manage Clothing
                        </NavLink>
                    </div>
                )}


                {/* FOOTWEAR MENU */}
                <div className="menu-item" onClick={() => setOpenFootwear(!openFootwear)}>
                    <div style={{ marginLeft: "5px" }}>
                        <i className="fas fa-shoe-prints" style={{ fontSize: "20px" }}></i>
                        <span className='item-name' style={{ fontSize: "16px", marginLeft: "20px" }}>FOOTWEAR</span>
                    </div>
                    <i className={`fas fa-chevron-${openFootwear ? 'up' : 'down'} arrow`}></i>
                </div>

                {openFootwear && (
                    <div className="submenu">
                        <NavLink to="/footwear" className={({ isActive }) => isActive ? "active" : ""}>
                            ➕ Add Footwear
                        </NavLink>

                        <NavLink to="/footwear-manage" className={({ isActive }) => isActive ? "active" : ""}>
                            🛠 Manage Footwear
                        </NavLink>
                    </div>
                )}


                <NavLink to="/add-images" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-plus-circle"></i>
                    <span>Add Product</span>
                </NavLink>

                <NavLink to="/manage-image" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-tasks"></i>
                    <span>Manage Product</span>
                </NavLink>

                <NavLink to="/banner" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-home"></i>
                    <span>Home Page</span>
                </NavLink>

                <NavLink to="/manage-video" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-video"></i>
                    <span>Manage Video</span>
                </NavLink>

                <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-concierge-bell"></i>
                    <span>Services</span>
                </NavLink>

                <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-envelope"></i>
                    <span>Contact</span>
                </NavLink>

                <NavLink to="/seller" className={({ isActive }) => isActive ? "active" : ""}>
                    <i className="fas fa-store"></i>
                    <span>Sellers</span>
                </NavLink>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>
    )
};

export default Sidebar;
