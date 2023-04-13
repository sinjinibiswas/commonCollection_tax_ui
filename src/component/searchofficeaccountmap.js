import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Sidebar from './sidebar';
import NavBar from './navbar';
import Pagination from './Pagination/pagination';
// import data from '../component/Pagination/mock-data.json'
const SearchOfficeAccountMap = () => {

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

    // ------PAGINATION START--------

    let PageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        // return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    // ------PAGINATION END--------
    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <Sidebar />
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
                                                            <p className="col-md-8 control-label text-left"> <b>OFFICE ACCOUNT MAP</b></p>
                                                            <hr />
                                                            <p className="col-md-8 control-label text-left"><b> Office Account Map Search</b></p> <br />
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-2 control-label text-left" >Module Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-2">
                                                                    <input
                                                                        disabled={true}
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                </div>

                                                                <label className="col-md-2 control-label text-left" >Office Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-2">
                                                                    <select
                                                                        id="s1"
                                                                        name="chartofaccounts.id"
                                                                        className="form-control"
                                                                    >
                                                                        <option value="">HATIBAGAN</option>
                                                                        <option value="">GARIA</option>
                                                                        <option value=""> JADAVPUR </option>
                                                                    </select>
                                                                </div>


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
                                                                        <p className="col-md-8 control-label text-left"><b>Search Result</b></p>
                                                                        <hr />
                                                                        <div className="table-responsive-lg">
                                                                            <table className="table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col">Account Code</th>
                                                                                        <th scope="col">Bank Name</th>
                                                                                        <th scope="col">Branch Name</th>
                                                                                        <th scope="col">Account Number</th>
                                                                                        {/* <th>ID</th>
                                                                                        <th>FIRST NAME</th>
                                                                                        <th>LAST NAME</th>
                                                                                        <th>EMAIL</th>
                                                                                        <th>PHONE</th> */}
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {/* {currentTableData.map(item => { */}
                                                                                        {/* return (  */}

                                                                                            <tr >
                                                                                                <td scope="row">103</td>
                                                                                        <td>ORIENTAL_BANK_OF_COMMERCE</td>
                                                                                        <td>PARK STREET</td>
                                                                                        <td>1234567890</td>

                                                                                                {/* <td>{item.id}</td>
                                                                                                <td>{item.first_name}</td>
                                                                                                <td>{item.last_name}</td>
                                                                                                <td>{item.email}</td>
                                                                                                <td>{item.phone}</td> */}
                                                                                            </tr>
                                                                                         {/* ); */}
                                                                                     {/* })} */}
                                                                                     {/* <Pagination
                                                                                        className="pagination-bar"
                                                                                        currentPage={currentPage}
                                                                                        totalCount={data.length}
                                                                                        pageSize={PageSize}
                                                                                        onPageChange={page => setCurrentPage(page)}
                                                                                    />  */}
                                                                                </tbody>
                                                                            </table>
                                                                            <div className="form-group">
                                                                                <div className="row">
                                                                                    <div className="col-auto nw-crn col-md-12 text-center">

                                                                                        <button
                                                                                            href=""
                                                                                            type="button"
                                                                                            className="btn btn-primary log-sign1"
                                                                                            id="btnsearch"
                                                                                            onClick={() => closeDetails()}
                                                                                        >
                                                                                            Close
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
                        ConfirmText="Are you sure you want to start the treasury day?"
                        ConfirmYesText="Yes"
                        ConfirmNoText="No"
                        CloseConfirm={CloseBoxConfirm}
                    // DoEvent={treasuryDayBegin}
                    />

                    {/* AlertBox for closing the treasury day */}
                    <AlertBox
                        showConfirm={showConfirmBox2}
                        ConfirmHeaderText="Confirmation"
                        ConfirmText="Are you sure you want to end the treasury day?"
                        ConfirmYesText="Yes"
                        ConfirmNoText="No"
                        CloseConfirm={CloseBoxConfirm2}
                    // DoEvent={treasuryDayEnd}
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


export default SearchOfficeAccountMap;

