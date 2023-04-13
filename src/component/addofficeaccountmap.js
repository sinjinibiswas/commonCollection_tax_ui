import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import Sidebar from './sidebar';
import NavBar from './navbar';
import { Modal, Button } from "react-bootstrap";

const AddOfficeAccountMap = () => {

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

    const [officeAccountMap, setOfficeAccountMap] = useState();

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

    const bankListDetails = async () => {
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
            }

        }
        try {
            const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/generic/getBanklist`, body, config);
            let bankDetails = (response.data.ResponseDataList);
            // setBankList(bankDetails);
            // console.log(bankDetails)
            setBankNameList(response.data.ResponseDataList);
            setOriginalBankNameList(response.data.ResponseDataList);
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
        }
    }



    const branchListDetails = async (value) => {
        const config = {
            method: 'POST',
            headers: {
                "access-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            },
        };
        const body = {
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
            comBankCode: value
        }
        try {
            const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/generic/getBranchesFromBankCode`, body, config);
            let branchDetails = (response.data.ResponseDataList);
            // setBranchList(branchDetails);
            // console.log(branchDetails)
            setBranchNameList(response.data.ResponseDataList);
            setOriginalBranchNameList(response.data.ResponseDataList);
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
        }
    }
    // Use effect for calling the function on page load
    useEffect(() => {
        bankListDetails();
    }, [])

    // ------------Bank List Dropdown Starts-------------------------------------
    const [bankNameList, setBankNameList] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedBankNameList, setSelectedBankNameList] = useState('');
    const [originalSelectedBankNameList, setOriginalBankNameList] = useState([]);

    const handleBankNameSearch = (value) => {
        setSelectedBankNameList(value.trim());
        if (value.trim().length > 0) {
            setOpenDropdown(true);
            const tempArr = [...originalSelectedBankNameList];
            let filterData = tempArr.filter((item) => {
                return item.comBankName.toLowerCase().includes(value.toLowerCase().trim());
            });
            setBankNameList(filterData);
        } else {
            setOpenDropdown(false);
            setBankNameList(originalSelectedBankNameList);
        }
    }
    const [seletddrpDown, setSeletddrpDown] = useState({
        comBankName: "Select",
        comBankCode: "Select"
    })

    const handleDropDown = (dropdownid, id, value) => {
        const newPaymentDetailList = { ...officeAccountMap }
        newPaymentDetailList[dropdownid] = id;
        setOfficeAccountMap(newPaymentDetailList)
        let selectedval = { ...seletddrpDown }
        selectedval[dropdownid] = value;
        setSeletddrpDown(selectedval)
        if (id !== "") {
            branchListDetails(value);
        }
    };
    //---------Bank List Dropdown Ends----------------

    // ------------Branch List Dropdown Starts-------------------------------------
    const [branchNameList, setBranchNameList] = useState([]);
    const [openDropdown2, setOpenDropdown2] = useState(false);
    const [selectedBranchNameList, setSelectedBranchNameList] = useState('');
    const [originalSelectedBranchNameList, setOriginalBranchNameList] = useState([]);

    const handleBranchNameListSearch = (value) => {
        setSelectedBranchNameList(value.trim());
        if (value.trim().length > 0) {
            setOpenDropdown2(true);
            const tempArr = [...originalSelectedBranchNameList];
            let filterData = tempArr.filter((item) => {
                return item.comBankBranchName.toLowerCase().includes(value.toLowerCase().trim());
            });
            setBranchNameList(filterData);
        } else {
            setOpenDropdown2(false);
            setBranchNameList(originalSelectedBranchNameList);
        }
    }
    const [seletddrpDown2, setSeletddrpDown2] = useState({
        comBankBranchName: "Select",
        comBankBranchCode: "Select"
    })

    const handleDropDownBranch = (dropdownid, id, value) => {
        const newPaymentDetailList2 = { ...officeAccountMap }
        newPaymentDetailList2[dropdownid] = id;
        setOfficeAccountMap(newPaymentDetailList2)
        let selectedval2 = { ...seletddrpDown2 }
        selectedval2[dropdownid] = value;
        setSeletddrpDown2(selectedval2)

    };
    //---------Branch List Dropdown Ends----------------

    const [showModal, setShow3] = useState(false);
    const handleClose = () => setShow3(false);
    const handleShow = () => setShow3(true);

    const [storeBranchListValue, setStoreBranchListValue] = useState();

    const handleStoreBranchNameValue = (e,value, index) => {
        const newBranchNameList = [ ...branchNameList ];
        newBranchNameList[index] = value;
        setStoreBranchListValue(newBranchNameList);
        console.log(storeBranchListValue, "StoreBranchName")
    }

    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <Sidebar />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Branch Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* <label className="col-md-3 control-label text-left" >Branch Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <input id="comBankBranchName" className="form-control" placeholder="Search Branch" type="text" onChange={(e) => handleBranchNameListSearch(e.target.value)}
                                                                        value={selectedBranchNameList} />
                                                                    {
                                                                        openDropdown2 && <div className="dropdown-menu show custom-dropdown mt-1">
                                                                            {
                                                                                branchNameList && branchNameList.length > 0 ? (
                                                                                    branchNameList.map((data, index) => (
                                                                                        <label key={index} className="w-100 custom-dropdown-label" onClick={() => { handleDropDownBranch('comBankBranchName', data.comBankBranchName); setOpenDropdown2(false); setSelectedBranchNameList(data.comBankBranchName) }}>{`${data.comBankBranchName}`}</label>
                                                                                    ))
                                                                                ) : (
                                                                                    <label className="w-100 custom-dropdown-label">No result found</label>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div> */}

                        <div className="table-responsive-lg">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th scope="col">Branch Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {branchNameList && branchNameList.length > 0 && branchNameList.map((item, index) => {
                                        return (
                                            <tr >
                                                <td>
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      id="exampleCheck1"
                                                      onChange={(e,index, value) => handleStoreBranchNameValue(e,item.comBankBranchName, value, index)}
                                                    />
                                                  </td>
                                                <th scope="row">{item.comBankBranchName}</th>
                                                
                                            </tr>
                                        )
                                    }
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                                            <p className="col-md-8 control-label text-left"><b> Office Account Map Entry </b></p> <br />
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-3 control-label text-left" >Module Name:  <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <input
                                                                        disabled={true}
                                                                        type="text"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                        value="COLLECTION"
                                                                    />
                                                                </div>

                                                                <label className="col-md-3 control-label text-left" >Office Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <select
                                                                        id="s1"
                                                                        name="chartofaccounts.id"
                                                                        className="form-control"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value=""></option>
                                                                        <option value=""></option>
                                                                    </select>
                                                                    {/* {errorState && {state.officeName} == "" ?
                                                                <div className="form-error">Please select an office name from the dropdown</div>
                                                                : ""} */}
                                                                </div>
                                                            </div>
                                                            {/* <br/> */}
                                                            <br />
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-3 control-label text-left" >Bank Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">

                                                                    <input id="comBankCode" className="form-control" placeholder="Search Bank" type="text" onChange={(e) => handleBankNameSearch(e.target.value)}
                                                                        value={selectedBankNameList} />
                                                                    {
                                                                        openDropdown && <div className="dropdown-menu show custom-dropdown mt-1">
                                                                            {
                                                                                bankNameList && bankNameList.length > 0 ? (
                                                                                    bankNameList.map((data, index) => (
                                                                                        <label key={index} className="w-100 custom-dropdown-label" onClick={() => { handleDropDown('comBankBranchName', data.comBankName, data.comBankCode); setOpenDropdown(false); setSelectedBankNameList(data.comBankName) }}>{`${data.comBankName}`}</label>
                                                                                    ))
                                                                                ) : (
                                                                                    <label className="w-100 custom-dropdown-label">No result found</label>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {/* {errorState && {state.comBankName} == "" ?
                                                                <div className="form-error">Please select a bank name from the dropdown</div>
                                                                : ""} */}
                                                                </div>

                                                                {/* <label className="col-md-3 control-label text-left" >Branch Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <input id="comBankBranchName" className="form-control" placeholder="Search Branch" type="text" onChange={(e) => handleBranchNameListSearch(e.target.value)}
                                                                        value={selectedBranchNameList} />
                                                                    {
                                                                        openDropdown2 && <div className="dropdown-menu show custom-dropdown mt-1">
                                                                            {
                                                                                branchNameList && branchNameList.length > 0 ? (
                                                                                    branchNameList.map((data, index) => (
                                                                                        <label key={index} className="w-100 custom-dropdown-label" onClick={() => { handleDropDownBranch('comBankBranchName', data.comBankBranchName); setOpenDropdown2(false); setSelectedBranchNameList(data.comBankBranchName) }}>{`${data.comBankBranchName}`}</label>
                                                                                    ))
                                                                                ) : (
                                                                                    <label className="w-100 custom-dropdown-label">No result found</label>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div> */}
                                                                <label className="col-md-3 control-label text-left" >Branch Name: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    {/* <button
                                                                        href=""
                                                                        type="button"
                                                                        className="btn btn-primary log-sign1"
                                                                        id="btnsearch"
                                                                        // onClick={() => confirmBoxOpen()}
                                                                        onClick={handleShow}
                                                                    >Open Branch Popup
                                                                    </button> */}
                                                                    <input
                                                                className="form-control icon"
                                                                type="text"
                                                                onClick={handleShow}
                                                                // onChange={handleChangeRow(idx)}
                                                            />
                                                                    {/* {errorState && {state.comBranchName} == "" ?
                                                                <div className="form-error">Please select branch name from the popup</div>
                                                                : ""} */}
                                                                </div>
                                                            </div>
                                                            {/* <br/> */}
                                                            <br />
                                                            <div className="row" style={{ marginTop: "6px" }}>
                                                                <label className="col-md-3 control-label text-left" >Account Number: <span className="star">* <span></span></span></label>
                                                                <div className="col-md-3">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name=""
                                                                        id=""
                                                                    />
                                                                    {/* {errorState && {state.accNumber} == "" ?
                                                                <div className="form-error">Account number cannot be empty. Please provide a proper account number</div>
                                                                : ""} */}
                                                                </div>
                                                            </div>
                                                            <br />
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
                                                                            onClick={() => confirmBoxOpen()}
                                                                            // onClick={handleShow}
                                                                            >
                                                                                Save
                                                                            </button>

                                                                            <button
                                                                                href=""
                                                                                type="button"
                                                                                className="btn btn-primary log-sign1"
                                                                                id="btnsearch"
                                                                            >Close
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
                        ConfirmText="Are you sure you want to save the office account map?"
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


export default AddOfficeAccountMap;

