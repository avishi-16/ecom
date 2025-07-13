import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/ecom-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { TiHomeOutline } from "react-icons/ti";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Navbar = ({onSearch}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="logo" className="navbar-logo" />
                <h2 className="navbar-title">ShopNShine</h2>
            </div>
            <Search onSearch={onSearch}/>
            <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
                <Link to="/" className="nav-link-vertical">
                    <TiHomeOutline className="nav-icon" />
                    <span className="nav-label">Home</span>
                </Link>
                <Link to="/dashboard" className="nav-link-vertical">
                    <AiOutlineProduct className="nav-icon" />
                    <span className="nav-label">Products</span>
                </Link>
                <Link to="/cart" className="nav-link-vertical">
                    <BsCart4 className="nav-icon" />
                    <span className="nav-label">Cart</span>
                </Link>
                <Link to="/profile" className="nav-link-vertical">
                    <CgProfile className="nav-icon" />
                    <span className="nav-label">Profile</span>
                </Link>
            </div>

            <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
};

export default Navbar;

