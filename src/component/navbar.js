import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Image1 from "../img/about.png"
const NavBar = () => {
    return (
        <>
           <header>
                    <h2> </h2>
                    <div className="user-wrapper">
                        <div className="d-flex flex-row-reverse">
                            <div>
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link count-indicator"
                                            id="notificationDropdown"
                                            href="#"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {" "}
                                            Language <i className="bi bi-arrow-down-circle-fill" />{" "}
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
                                            aria-labelledby="notificationDropdown"
                                        >
                                            <a className="dropdown-item preview-item py-1">
                                                <div className="preview-item-content">
                                                    <h6 className="preview-subject fw-normal text-dark mb-1">
                                                        English
                                                    </h6>
                                                </div>
                                            </a>
                                            <a className="dropdown-item preview-item py-1">
                                                <div className="preview-item-content">
                                                    <h6 className="preview-subject fw-normal text-dark mb-1">
                                                        {" "}
                                                        বাংলা{" "}
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                                        <a
                                            className="nav-link nm"
                                            id="UserDropdown"
                                            href="#"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                className="img-fluid logo"
                                                src={Image1}
                                            />{" "}
                                            <i className="bi bi-arrow-down-circle-fill" />
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
                                            aria-labelledby="notificationDropdown"
                                        >
                                            <a className="dropdown-item preview-item py-1">
                                                <div className="preview-item-content">
                                                    <h6 className="preview-subject fw-normal text-dark mb-1">
                                                        {" "}
                                                        <i className="bi bi-pencil-square" /> Profile{" "}
                                                    </h6>
                                                </div>
                                            </a>
                                            <a className="dropdown-item preview-item py-1">
                                                <div className="preview-item-content">
                                                    <h6 className="preview-subject fw-normal text-dark mb-1">
                                                        {" "}
                                                        <i className="bi bi-box-arrow-left" /> Logout{" "}
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
        </>

    )
}


export default NavBar;

