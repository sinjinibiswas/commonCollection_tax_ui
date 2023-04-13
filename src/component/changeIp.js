import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Sidebar from './sidebar';
import NavBar from './navbar';

const ChangeIp = () => {

    // Alert Box 1 
    const [show, setShow] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    // Alert Box 2
    const [show2, setShow2] = useState(false);
    const [showConfirmBox2, setShowConfirmBox2] = useState(false);

    // Popup confirmation Box Message
    const [showAlertBox, setShowAlertBox] = useState(false);
    const [alertBoxHeaderText, setAlertBoxHeaderText] = useState('');
    const [alertBoxmsg, setAlertBoxmsg] = useState('');



    // Use state for storing response data
    const [treasuryDayResponse, setTreasuryDayResponse] = useState({});
    const [response, setResponse] = useState(false);

    // Treasury Day Begin Function
    const treasuryDayBegin = async () => {
        setShowConfirmBox(false)
        const config = {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            },
        };
        const body =
        {
            "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_create",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": "d414f188-0761-48ca-97cf-c809b44ca4b8"
            },
            "Collection": {
                "receiptDate": "15/02/2023",
                "departmentCode": "99",
                "departmentName": "ASSESSMENT",
                "collectionCenterCode": "1",
                "counterNo": "30",
                "collType": "S",
                "barcodeEntered": "15015040030212200001132000011320000180220221"
            }
        }
        try {
            const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/dayBeginEnd/treasuryBegin/`, body, config);
            let treasuryResponse = (response.data);
            setTreasuryDayResponse(treasuryResponse);
            //   if (response.data.status === "200") {
            setAlertBoxHeaderText('Success')
            setAlertBoxmsg('Treasury day begin updated successfully')
            setShowAlertBox(true)
            if (response.data.ResponseDataList == "Saved Successfully") {
                setResponse(true)
            }
            // }

        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
        }
    }

    // Treasury Day End Function
    const treasuryDayEnd = async () => {
        setShowConfirmBox2(false)
        const config = {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            },
        };
        const body =
        {
            "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_create",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": "d414f188-0761-48ca-97cf-c809b44ca4b8"
            },
            "Collection": {
                "receiptDate": "15/02/2023",
                "departmentCode": "99",
                "departmentName": "ASSESSMENT",
                "collectionCenterCode": "1",
                "counterNo": "30",
                "collType": "S",
                "barcodeEntered": "15015040030212200001132000011320000180220221"
            }
        }
        try {
            const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/dayBeginEnd/treasuryEnd/`, body, config);
            let treasuryResponse = (response.data);
            setTreasuryDayResponse(treasuryResponse);
            //   if (response.data.status === "200") {
            setAlertBoxHeaderText('Success')
            setAlertBoxmsg('Treasury day end updated successfully')
            setShowAlertBox(true);

            // if(response.data.ResponseDataList=="Please Perform Day Begin First;"){
            //     setAlertBoxHeaderText('Warning')
            //     setAlertBoxmsg('Please Perform Day Begin First')
            //     setShowAlertBox(true)
            //   }else{
            //     setAlertBoxHeaderText('Success')
            //     setAlertBoxmsg('Treasury day end updated successfully')
            //     setShowAlertBox(true);
            //   }
            // }
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
        }
    }

    // Function for the alert box to start the day
    const confirmBoxOpen = () => {
        setShowConfirmBox(true)
    }
    const CloseBoxConfirm = () => {
        setShowConfirmBox(false)
    }

    // Function for the alert box to end the day
    const confirmBoxOpen2 = () => {
        setShowConfirmBox2(true)
    }
    const CloseBoxConfirm2 = () => {
        setShowConfirmBox2(false)
    }

    // Closing alert box popup
    const closeAlert = () => {
        setShowAlertBox(false)
    }
    const searchDetails = () => {
        setShow(true)
    }

    const closeDetails = () => {
        setShow(false)
    }
    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <Sidebar />
            <div className="main-content">
                {/* <header>
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
                                                src="../assets/img/about.png"
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
                </header> */}
                <NavBar />
                <main>
                    <ul className="navbar-nav">
                        <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">

                        </li>
                    </ul>
                    <section>
                        <div
                            className="container aos-init aos-animate pt-form1"
                            data-aos="fade-up"
                        >
                            <div className="row">
                                <div className="col-lg-12 certificate1">
                                    <div className="application1">
                                        <form action="" method="post" role="form" className="">
                                            <div className="form1">
                                                <div className="row">
                                                    <div className="col-md-12" id="business">
                                                        <div className="panel-body">
                                                            <p className="col-md-8 control-label text-left"> <b>CHANGE IP ADDRESS</b></p>
                                                            <hr />
                                                            <p className="col-md-8 control-label text-left"><b> Search IP Address </b></p> <br />
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-2 control-label text-left" >Current IP Address: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                </div>

                                                                {/* <label className="col-md-2 control-label text-left" >Counter No.: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-2">
                                                                    <select
                                                                        id="s1"
                                                                        name="chartofaccounts.id"
                                                                        className="form-control"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="">2</option>
                                                                        <option value=""> 3 </option>
                                                                        <option value=""> 4 </option>
                                                                        <option value="">5</option>
                                                                    </select>
                                                                </div> */}
                                                            </div>
                                                            {/* <br/> */}
                                                            <br />
                                                            <div className="form-group">
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <div className="col-auto nw-crn col-md-12 text-center">
                                                                            <button
                                                                                href=""
                                                                                type="button"
                                                                                className="btn btn-primary log-sign1"
                                                                                id="btnsearch"
                                                                                onClick={() => searchDetails()}
                                                                            >
                                                                                Search
                                                                            </button>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <hr />
                                                            </div>

                                                            {show == true ?
                                                                <div>

                                                                    <div className="form-group">
                                                                        {" "}
                                                                        <p className="col-md-8 control-label text-left"><b>Counter Details</b></p>
                                                                        <hr />
                                                                        <div className="table-responsive-lg">
                                                                            <table className="table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col">Office Code</th>
                                                                                        <th scope="col">Office Description</th>
                                                                                        <th scope="col">Counter Number</th>
                                                                                        <th scope="col">Latest Financial Year</th>
                                                                                        <th scope="col">IP Address </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {/* {taxTableList && taxTableList.length > 0 && taxTableList.map((item, index) => {
                                              return ( */}
                                                                                    <tr >
                                                                                        <th scope="row">1</th>
                                                                                        <td>H.Q (DIST-III)</td>
                                                                                        <td>32</td>
                                                                                        <td>2020-2021</td>
                                                                                        <td>
                                                                                            <input 
                                                                                            type="text"
                                                                                            value="192.23.4.5"
                                                                                            className="form-control"
                                                                                            // onChange={(e) => {handleChange()}}
                                                                                            />
                                                                                        </td>

                                                                                    </tr>
                                                                                    {/* )
                                            }
                                            )
                                            } */}
                                                                                </tbody>
                                                                            </table>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <div className="col-auto nw-crn col-md-12 text-center">

                                                                                        <button
                                                                                            href=""
                                                                                            type="button"
                                                                                            className="btn btn-primary log-sign1"
                                                                                            id="update-value"
                                                                                            onClick={() => confirmBoxOpen()}
                                                                                        >
                                                                                            UPDATE
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : null}

                                                            <br />
                                                            <br />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* End Inner Page */}
                    {/*Tabla*/}
                    {/* AlertBox for starting the treasury day */}
                    <AlertBox
                        showConfirm={showConfirmBox}
                        ConfirmHeaderText="Confirmation"
                        ConfirmText="Are you sure you want to update the IP Address?"
                        ConfirmYesText="Yes"
                        ConfirmNoText="No"
                        CloseConfirm={CloseBoxConfirm}
                    // DoEvent={treasuryDayBegin}
                    />


                    <AlertBox
                        showConfirm={showAlertBox}
                        ConfirmHeaderText={alertBoxHeaderText}
                        ConfirmText={alertBoxmsg}
                        ConfirmYesText="Yes"
                        ConfirmNoText="Ok"
                        CloseConfirm={closeAlert}
                        DoEvent={closeAlert}
                        isAlert={true}
                    />
                </main>
            </div>
        </>

    )
}


export default ChangeIp;

