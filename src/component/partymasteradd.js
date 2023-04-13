import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Sidebar from './sidebar';
import NavBar from './navbar';

const PartyMasterAdd = () => {

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
    const [treasuryDayResponse, setTreasuryDayResponse] = useState({

    });
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

    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <Sidebar/>
            <div className="main-content">
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
                                                            <p className="col-md-8 control-label text-left"> <b>PARTY ADD PAGE</b></p>
                                                            <hr />
                                                            <p className="col-md-8 control-label text-left"><b>New Party Details </b></p> <br /> 
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-3 control-label text-left" >Party Code:  <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <br/> */}
                                                            <br/>
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-3 control-label text-left" >Party Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                </div>

                                                                <label className="col-md-3 control-label text-left" >Party Address: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <br/> */}
                                                            <br/>
                                                            
                                                            <div className="form-group">
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <div>
                                                                            {/* <h2>{response== null ? "Day":""}</h2> */}
                                                                            <h2 hidden={!response}>Treasury day has begin</h2>
                                                                        </div>
                                                                        <div className="col-auto nw-crn col-md-12 text-center">
                                                                            <button
                                                                                href=""
                                                                                type="button"
                                                                                className="btn btn-primary log-sign1"
                                                                                id="btnsearch"
                                                                                onClick={() => confirmBoxOpen()}
                                                                            >
                                                                                Save
                                                                            </button>

                                                                            <button
                                                                                href=""
                                                                                type="button"
                                                                                className="btn btn-primary log-sign1"
                                                                                id="btnsearch"
                                                                                // onClick={() => confirmBoxOpen2()}
                                                                            >
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <hr />
                                                            </div>
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
                        ConfirmText="Are you sure you want to start the treasury day?"
                        ConfirmYesText="Yes"
                        ConfirmNoText="No"
                        CloseConfirm={CloseBoxConfirm}
                        DoEvent={treasuryDayBegin}
                    />

                    {/* AlertBox for closing the treasury day */}
                    <AlertBox
                        showConfirm={showConfirmBox2}
                        ConfirmHeaderText="Confirmation"
                        ConfirmText="Are you sure you want to end the treasury day?"
                        ConfirmYesText="Yes"
                        ConfirmNoText="No"
                        CloseConfirm={CloseBoxConfirm2}
                        DoEvent={treasuryDayEnd}
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


export default PartyMasterAdd;

