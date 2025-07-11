import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/ecom-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoIosLogOut } from 'react-icons/io';
import { TiHomeOutline } from "react-icons/ti";
import Search from '../Search/Search';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="logo" className="navbar-logo" />
                <h2 className="navbar-title">ShopNShine</h2>
            </div>
            <Search/>
            <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
                <a href="/" className="nav-link-vertical">
                    <TiHomeOutline className="nav-icon" />
                    <span className="nav-label">Home</span>
                </a>
                <a href="/products" className="nav-link-vertical">
                    <AiOutlineProduct className="nav-icon" />
                    <span className="nav-label">Products</span>
                </a>
                <a href="/cart" className="nav-link-vertical">
                    <BsCart4 className="nav-icon" />
                    <span className="nav-label">Cart</span>
                </a>
                <a href="/account" className="nav-link-vertical">
                    <CgProfile className="nav-icon" />
                    <span className="nav-label">Profile</span>
                </a>
                <a className="nav-link-vertical" style={{ cursor: 'pointer' }}>
                    <IoIosLogOut className="nav-icon" />
                    <span className="nav-label">Logout</span>
                </a>
            </div>

            <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
};

export default Navbar;

