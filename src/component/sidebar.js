import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Logo from "../img/logo.png"

const Sidebar = () => {
    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h2>
                        <Link
                            to="/"
                            className="logo align-items-center scrollto float-start"
                        >
                            <img src={Logo} alt="" />
                        </Link>
                    </h2>
                </div>
                {/*Secciones-del-tablero*/}
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <a href="" className="active">
                                <span className="las">
                                    {" "}
                                    <img src="../assets/img/Path 357.svg" alt="" />
                                </span>{" "}
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="collapsed"
                                data-bs-toggle="collapse"
                                href="#ui-basic"
                                aria-expanded="false"
                                aria-controls="ui-basic"
                            >
                                <span className="las">
                                    {" "}
                                    <img src="../assets/img/Path 358.svg" alt="" />
                                </span>
                                <span className="menu-title">Common Collection</span>
                                <i className="bi bi-chevron-down dropdown-indicator" />
                            </a>
                            <div className="collapse" id="ui-basic">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item dropdown">
                                        <a
                                            className="collapsed"
                                            data-bs-toggle="collapse"
                                            href="#ui-basic2"
                                            aria-expanded="false"
                                            aria-controls="ui-basic"
                                        >
                                            <span>Property Tax Collection</span>{" "}
                                            <i className="bi bi-chevron-down dropdown-indicator" />
                                        </a>
                                        <div className="collapse" id="ui-basic2">
                                            <ul className="nav flex-column sub-menu 2">
                                                <li>
                                                    <ul className="nav flex-column sub-menu 2">
                                                        <Link to="/">Single Assessment Property Tax Collection </Link>
                                                        <Link to="/multipleCommonTax">Multiple Assessment Property Tax Collection </Link>
                                                        <Link to="/governmentTax">Government Assessment Property Tax Collection </Link>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a
                                            className="collapsed"
                                            data-bs-toggle="collapse"
                                            href="#ui-basic2"
                                            aria-expanded="false"
                                            aria-controls="ui-basic"
                                        >
                                            <span>Services</span>{" "}
                                            <i className="bi bi-chevron-down dropdown-indicator" />
                                        </a>
                                        <div className="collapse" id="ui-basic2">
                                            <ul className="nav flex-column sub-menu 2">
                                            <li>
                                                <ul className="nav flex-column sub-menu 2">
                                                <Link to="/treasury">Treasury Day </Link>
                                                <Link to="/commonCollection">Common collection day </Link>
                                                <Link to="/counter">Add new counter </Link>
                                                <Link to="/counter/search">Search existing counter </Link>
                                                <Link to="/change-ip">Change IP Address </Link>
                                                <Link to="/officeaccountmap/add">Office Account Map Entry </Link>
                                                <Link to="/officeaccountmap/search">Office Account Map Search </Link>
                                                <Link to="/partymaster/add">Party Add Page </Link>
                                                <Link to="/partymaster">Party Search Page </Link>
                                                <Link to="/counterwisestationarystock">Counter Wise Stationary Stock </Link>
                                                <Link to="/centerwisestationarystock">Center Wise Stationary Stock </Link>
                                                <Link to="/counterstationaryupdate">Counter Staionary Update </Link>

                                                </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>

    )
}


export default Sidebar;

