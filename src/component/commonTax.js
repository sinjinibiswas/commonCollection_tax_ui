import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/Loading_icon.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import axios from 'axios'
import CustomDropdown from '../component/CustomControls/CustomDropdown';
import Select from "react-select";
import Sidebar from './sidebar';
import NavBar from './navbar';

const CommonTax = () => {
  var currentIndex = 0;
  const [isLoading, setisLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [commonTaxDetails, setCommonTaxDetails] = useState({
    receiptDate: "",
    departmentCode: "",
    departmentName: "",
    collectionCenterCode: "",
    barcodeEntered: "",
    counterNo: "",
    stationaryNo: "",
    assesseeNo: "",
    collectionCenterName: "",
    receiptNo: "",
    mobileNo: "",
    email: ""
  });

  const [taxTableList, setTaxTableList] = useState([{
    demandInfoFieldOne: "",
    qtrNo: "",
    demandAmount: "",
    rebateAmount: "",
    extrarebateAmount: "",
    interestAmount: "",
    penaltyAmount: "",
    payableAmount: "",
    rebateDate: "",
    presentationDate: ""
  }]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [paymentModeList, setPaymentModeList] = useState([]);
  const [allItemChecked, setAllItemChecked] = useState([]);
  const [counterDetails, setCounterDetails] = useState({
    collCounterNo: "",
    collStationeryPrefix: "",
    collStationeryNumber: ""

  });
  const [paymentDetailsList, setPaymentDetailsList] = useState([
    {
      paymentMode: "",
      receivedAmount: "",
      receivedAmountEncrypted: "",
      chequeOrDDNo: "",
      chequeOrDDDate: "",
      bankCode: "",
      branchCode: "",
      branchName: "",
      selectedPaymentRow: "",
      hidSelectedPaymentRow: "",
      instrSlNo: "",
      bankName: "",
      isDeleted: "N"
    }
  ]);


  // On Change event
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newCommonTaxDetails = { ...commonTaxDetails };
    newCommonTaxDetails[id] = value;
    setCommonTaxDetails(newCommonTaxDetails);
    console.log(newCommonTaxDetails);
  }

  const handleRecievedAmountChange = (e) => {
    const { id, value } = e.target;
    const newCommonTaxDetails = [ ...paymentDetailsList ];
    newCommonTaxDetails.receivedAmount = id;
    setPaymentDetailsList(newCommonTaxDetails);
    console.log(newCommonTaxDetails);
  }

  // Dropdown change
  const handleDropdownChange = (value, id, rowId) => {
    let newPaymentDetailList = [...paymentDetailsList]
    console.log(rowId, value, "VAL")
    newPaymentDetailList[rowId].paymentMode = id;
    setPaymentDetailsList(newPaymentDetailList);
    console.log(newPaymentDetailList);
  };

  // Dropdown change
  // const handleDropdownChange2 = (dropdownid, id, value, rowId) => {
  //   let newPaymentDetailList = [...paymentDetailsList]
  //   console.log(newPaymentDetailList);
  //   console.log(rowId);
  //   newPaymentDetailList[rowId].bankCode = id;
  //   setPaymentDetailsList(newPaymentDetailList);
  //   var a = newPaymentDetailList;
  //   console.log(newPaymentDetailList);
  //   console.log(id, "Value")
  //   if (id !== "") {
  //     branchListDetails(id);
  //   }
  // };

  // Add row functionality
  const addPaymentRow = (event) => {
    event.preventDefault();
    const newPaymentList = [...paymentDetailsList];
    setPaymentDetailsList([...paymentDetailsList,
    {
      paymentMode: "",
      receivedAmount: "",
      receivedAmountEncrypted: "",
      chequeOrDDNo: "",
      chequeOrDDDate: "",
      bankCode: "",
      branchCode: "",
      branchName: "",
      selectedPaymentRow: "",
      hidSelectedPaymentRow: "",
      instrSlNo: "",
      bankName: ""
    }
    ]);
    console.log(newPaymentList, "PaymentMode");
  }
  const [selectDeleteIndex, setSelectDeleteIndex] = useState(-1);
  const checkDeleteLand = (index) => {
    setSelectDeleteIndex(index);
    console.log(index, "IND");
  }

  // Delete Event
  const handleDeleteEvent = () => {
    const newDeletePaymentList = [...paymentDetailsList];
    let lastDeletedIndex = 0;
    if (newDeletePaymentList.length == 1) {
      setSelectDeleteIndex(-1);
      return;
    }
    let filteredData = newDeletePaymentList.filter((item, index) => {
      return index != selectDeleteIndex;

    })
    setPaymentDetailsList(filteredData);
    setSelectDeleteIndex(-1);
  }


  const getCounterDetails = async () => {
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
      "Counter": {
        "officeName": "",
        "counterNo": "30",
        "ipAddress": ""

      }
    }
    try {
      const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/generic/getCounterDetails`, body, config);
      let counter = (response.data.ResponseDataList);
      setCounterDetails(counter);
      console.log(counter)
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
    }
  }

  const fetchTaxDetails = async () => {
    setisLoading(true)
    const config = {
      method: 'POST',
      headers: {
        "access-control-allow-origin": "*",
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
        "authToken": "d414f188-0761-48ca-97cf-c809b44ca4b9"
      },
      "Collection": {
        receiptDate: commonTaxDetails.barcodeEntered,
        departmentCode: commonTaxDetails.barcodeEntered,
        departmentName: commonTaxDetails.barcodeEntered,
        collectionCenterCode: commonTaxDetails.barcodeEntered,
        counterNo: commonTaxDetails.barcodeEntered,
        // "collType": "S",
        barcodeEntered: commonTaxDetails.barcodeEntered
      }
    }
    try {
      const response = await axios.post(`${keys.API_URL_COMMON_TAX}/collection-services/commonCollection/_getAsmtDemandDetailsFromBarcode`, body, config);
      let taxDetails = (response.data.ResponseDataList);
      if (taxDetails.errorDescription) {
        alert(taxDetails.errorDescription)
        console.log("aaaaa")
      }
      
      console.log(taxDetails.errorDescription)
      console.log(taxDetails)

      // let errorDesc = response.data.ResponseDataList.errorDescription;
      let taxTableLists = (response.data.ResponseDataList.demandDetailsList);
      let modeOfPayment = (response.data.ResponseDataList.paymentDetailsList);
      setCommonTaxDetails(taxDetails);
      setTaxTableList(taxTableLists);
      setPaymentModeList(modeOfPayment);
      setShow(true);
      console.log(modeOfPayment)
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      setisLoading(false)
    }
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
    // fetchTaxDetails();
    getCounterDetails();
    bankListDetails();
  }, [])


  const getDetails = () => {
    // setShow(true)
    fetchTaxDetails();
  }

  function SelectRedirect() {
    // ON selection of section this function will work
    //alert( document.getElementById('s1').value);

    switch (document.getElementById('s1').value) {
      case "S":
        window.location = "/";
        break;

      case "M":
        window.location = "/multipleCommonTax";
        break;

      case "G":
        window.location = "/governmentTax";
        break;

      /// Can be extended to other different selections of SubCategory //////
      default:
        window.location = "/"; // if no selection matches then redirected to home page
        break;
    }// end of switch 
  }

  const [payableAmount, setPayableAmount] = useState(0);

  const handlePayableAmount = (e,value, index) => {
    let temp = payableAmount;
    if(e.target.checked){
      temp = temp + parseInt(value);
    }else{
      temp = temp - parseInt(value);
    }
      setPayableAmount(temp);
    
    console.log(value, payableAmount, temp, "AMOUNT");
  }

  const handleAllPayableAmount = (e,value, index) => {
    let temp = payableAmount;
    if(e.target.checked){
      temp = temp + parseInt(value);
    }else{
      temp = temp - parseInt(value);
    }
      setPayableAmount(temp);
    console.log(value, payableAmount, temp, "AMOUNT");
  }

//   function checkAll(ele) {
//     var checkboxes = document.getElementsByTagName('input');
//     if (ele.checked) {
//         for (var i = 0; i < checkboxes.length; i++) {
//             if (checkboxes[i].type == 'checkbox') {
//                 checkboxes[i].checked = true;
//             }
//         }
//     } else {
//         for (var i = 0; i < checkboxes.length; i++) {
//             console.log(i)
//             if (checkboxes[i].type == 'checkbox') {
//                 checkboxes[i].checked = false;
//             }
//         }
//     }
// }

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
    const newPaymentDetailList = [...paymentDetailsList]
    newPaymentDetailList[dropdownid] = id;
    setPaymentDetailsList(newPaymentDetailList)
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
    const newPaymentDetailList2 = [...paymentDetailsList]
    newPaymentDetailList2[dropdownid] = id;
    setPaymentDetailsList(newPaymentDetailList2)
    let selectedval2 = { ...seletddrpDown2 }
    selectedval2[dropdownid] = value;
    setSeletddrpDown2(selectedval2)

  };
  //---------Branch List Dropdown Ends----------------

  // -----------Payment Mode Dropdown Functionality-----------------------
  const options = [
    // { value: '', text: 'Select Payment Mode' },
    { value: 'Cash', text: 'Cash ' },
    { value: 'Cheque', text: 'Cheque ' },
    { value: 'Demand', text: 'Demand ' },
  ];

  const handleChange2 = (event,index) => {
    let newPay = [...paymentDetailsList];
    newPay[index].paymentMode = event.target.value;
    setPaymentDetailsList(newPay);
  };

  
  const handleChangePaymentChecqueorDemand = (event,index) => {
    let newPaymentCheque = [...paymentDetailsList];
    newPaymentCheque[index].chequeOrDDNo = event.target.value;
    setPaymentDetailsList(newPaymentCheque);
  };

  const handleDateChangeChqueorDemandPayment = (event,index) => {
    let newPaymentCheque = [...paymentDetailsList];
    newPaymentCheque[index].chequeOrDDDate = event.target.value;
    setPaymentDetailsList(newPaymentCheque);
  };
//   const options = [
//     {"paymentMode" : "Cash"},
//     {"paymentMode" : "Cheque"},
//     {"paymentMode" : "Demand"}
//   ];

//   const handleChange2 = (dropdownid, id, value, rowId) => {
//     let newPaymentList = [...paymentDetailsList]
//     console.log(newPaymentList);
//     console.log(rowId);
//     newPaymentList[rowId].paymentMode = id;
//     setPaymentDetailsList(newPaymentList);
//     console.log(newPaymentList);
// };
  // ----------------------------------------------------------------------
  
  return (
    <>
    {isLoading ? <img
                alt="LOADER"
                src={loader}
                style={{
                  position: "fixed",
                  left: "585px",
                  top: "170px",
                  width: "30%",
                  height: "40%",
                }}
            /> : null
            }
      <input type="checkbox" id="nav-toggle" />
      {/* <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <a
              href="../../../dashboard.html"
              className="logo align-items-center scrollto float-start"
            >
              <img src="../assets/img/logo.png" alt="" />
            </a>
          </h2>
        </div>
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
                          <Link to="/">Assessment Property Tax Collection </Link>
                          <Link to="/treasury">Assessment Property Tax Collection </Link>
                          <Link to="/commonCollection">Assessment Property Tax Collection </Link>
                          <Link to="/counter">Assessment Property Tax Collection </Link>
                          <Link to="/counter/search">Assessment Property Tax Collection </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
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
                              <p className="col-md-8 control-label text-left"> <b>ASSESSE PROPERTY TAX COLLECTION</b></p>
                              <hr />
                              <div className="form-group">
                                {/* <div className="form-group">
                                  <div className="row">
                                    <label className="col-md-2 control-label text-left">
                                      Collection Type <span>*</span>
                                    </label>
                                    <div className="col-md-4 add-margin">
                                      <select
                                        id="s1"
                                        name="chartofaccounts.id"
                                        className="form-control"
                                        onChange={SelectRedirect}
                                      >
                                        <option value="">Single</option>
                                        <option value="S"> Single </option>
                                        <option value="M"> Multiple </option>
                                        <option value="G">Government</option>
                                      </select>
                                    </div>
                                  </div>
                                </div> */}
                                <div className="form-group">
                                  {" "}
                                  <p className="col-md-8 control-label text-left"><b> Summary </b></p>
                                  <hr />
                                  <div className="row">
                                    <label className="col-md-2 control-label text-left">
                                      {" "}
                                      Counter Number
                                    </label>
                                    <div className="col-md-3">
                                      <input
                                        disabled={true}
                                        name="type"
                                        className="form-control"
                                        // placeholder={31}
                                        value={counterDetails.collCounterNo}
                                        type="text"
                                      />
                                    </div>
                                    <label className="col-md-2 control-label text-left">
                                      {" "}
                                      Stationary No
                                    </label>
                                    <div className="col-md-3">
                                      <input
                                        disabled={true}
                                        name="type"
                                        className="form-control"
                                        // placeholder="AP	"
                                        value={counterDetails.collStationeryPrefix}
                                        type="text"
                                      />
                                    </div>
                                    <div className="col-md-2">
                                      <input
                                        disabled={true}
                                        name="type"
                                        className="form-control"
                                        // placeholder={287921}
                                        value={counterDetails.collStationeryNumber}
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div>

                                  <div className="form-group">
                                    {" "}
                                    <p className="col-md-8 control-label text-left"><b> Receipt Header Information </b></p> <br /> <br />
                                    <div className="row">
                                      <label className="col-md-2 control-label text-left">
                                        {" "}
                                        Receipt No
                                      </label>
                                      <div className="col-md-2">
                                        <input
                                          name="type"
                                          disabled={true}
                                          className="form-control"
                                          placeholder=""
                                          value={commonTaxDetails.receiptNo}
                                          type="text"
                                        />
                                      </div>
                                      <label className="col-md-2 control-label text-left">
                                        {" "}
                                        Receipt Date
                                      </label>
                                      <div className="col-md-2">
                                        <input
                                          disabled={true}
                                          name="type"
                                          className="form-control"
                                          placeholder="Receipt Date"
                                          value={commonTaxDetails.receiptDate}
                                          type="text"
                                        />
                                      </div>
                                      <label className="col-md-2 control-label text-left">
                                        {" "}
                                        Department
                                      </label>
                                      <div className="col-md-2">
                                        <input
                                          disabled={true}
                                          name="type"
                                          className="form-control"
                                          placeholder="ASSESSMENT"
                                          value={commonTaxDetails.departmentName}
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <label className="col-md-2 control-label text-left">
                                      Assessee No
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        disabled={true}
                                        name="type"
                                        className="form-control"
                                        placeholder="Assessee No"
                                        value={commonTaxDetails.assesseeNo}
                                        type="text"
                                      />
                                    </div>
                                    <label className="col-md-3 control-label text-left">
                                      {" "}
                                      Collection Center Name
                                    </label>
                                    <div className="col-md-3">
                                      <input
                                        disabled={true}
                                        name="type"
                                        className="form-control"
                                        placeholder="Collection center name"
                                        value={commonTaxDetails.collectionCenterName}
                                        type="text"
                                      />
                                    </div>{" "}
                                    <br />
                                    <br />
                                    <label className="col-md-2 control-label text-left">
                                      {" "}
                                      Barcode <span>*</span>{" "}
                                    </label>
                                    <div className="col-md-6">
                                      <input
                                        name="type"
                                        className="form-control"
                                        placeholder="Barcode"
                                        id="barcodeEntered"
                                        value={commonTaxDetails.barcodeEntered}
                                        onChange={handleChange}
                                        type="text"
                                      />
                                    </div>
                                    <div className="col-md-3">
                                      <button
                                        href=""
                                        type="button"
                                        className="btn btn-primary log-sign1"
                                        id="btnsearch"
                                        onClick={getDetails}
                                      >

                                        Get Details
                                      </button>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="row" >
                                      <label className="col-md-2 control-label text-left">
                                        {" "}
                                        Mobile no <span>*</span>{" "}
                                      </label>
                                      <div className="col-md-2">
                                        <input
                                          // disabled={true}
                                          name="type"
                                          className="form-control"
                                          // placeholder="mobile no"
                                          value={commonTaxDetails.mobileNo}
                                          type="text"
                                        />
                                        {/* {errorState && commonTaxDetails.mobileNo == "" ?
                                                                <div className="form-error">Please enter a valid mobile number</div>
                                                                : ""} */}
                                      </div>
                                      <label className="col-md-2 control-label text-left">
                                        {" "}
                                        Email-Id <span>*</span>{" "}
                                      </label>
                                      <div className="col-md-3">
                                        <input
                                          // disabled={true}
                                          name="type"
                                          className="form-control"
                                          // placeholder="Email-Id"
                                          value={commonTaxDetails.email}
                                          type="text"
                                        />
                                        {/* {errorState && commonTaxDetails.email == "" ?
                                                                <div className="form-error">Please enter a valid mobile number</div>
                                                                : ""} */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <ul className="navbar-nav">
                                      <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                                        <h2 className="welcome-text">
                                        </h2>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <hr />
                                {show == true ?
                                  <div>
                                    <div className="form-group">
                                      {" "}
                                      <p className="col-md-8 control-label text-left"><b> Demand Details</b></p>
                                      <hr />
                                      <div className="table-responsive-lg">
                                        <table className="table">
                                          <thead>
                                            <tr>
                                              <th scope="col">Demand year</th>
                                              <th scope="col">Quater No</th>
                                              <th scope="col">Demand Amount</th>
                                              <th scope="col">Rebate Amount</th>
                                              <th scope="col">Extra Rebate Amount </th>
                                              <th scope="col">Interest Amount</th>
                                              <th scope="col">Penalty Amount</th>
                                              <th scope="col">Payable Amount</th>
                                              <th scope="col">Rebate Allowed Upto </th>
                                              <th scope="col">Presentation Date </th>
                                              <th scope="col">
                                                <input
                                                  type="checkbox"
                                                  className="form-check-input"
                                                  id="exampleCheck1"
                                                  onChange={(e) => handleAllPayableAmount(e)}
                                                />
                                                {/* <input type="checkbox" onchange="checkAll(this)" name="chk[]" /> */}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {taxTableList && taxTableList.length > 0 && taxTableList.map((item, index) => {
                                              return (
                                                <tr >
                                                  <th scope="row">{item.demandInfoFieldOne}</th>
                                                  <td>{item.qtrNo}</td>
                                                  <td>{item.demandAmount}</td>
                                                  <td>{item.rebateAmount}</td>
                                                  <td>{item.extrarebateAmount}</td>
                                                  <td>{item.interestAmount}</td>
                                                  <td>{item.penaltyAmount}</td>
                                                  <td>{item.payableAmount}</td>
                                                  <td>{item.rebateDate}</td>
                                                  <td>{item.presentationDate}</td>
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      id="exampleCheck1"
                                                      onChange={(e,index) => handlePayableAmount(e,item.payableAmount, index)}
                                                    />
                                                  </td>
                                                </tr>
                                              )
                                            }
                                            )
                                            }
                                          </tbody>
                                        </table>
                                      </div>
                                      <div className="row">
                                        <label className="col-md-2 control-label text-left">
                                          Balance Unpaid Amount :
                                        </label>
                                        <div className="col-md-2">
                                          <input
                                            disabled={true}
                                            name="type"
                                            className="form-control"
                                            placeholder=""
                                            value={commonTaxDetails.totalDemandAmount}
                                            type="text"
                                          />
                                        </div>
                                        <label className="col-md-2 control-label text-left">
                                          Total Unpaid Amount :
                                        </label>
                                        <div className="col-md-2">
                                          <input
                                            disabled={true}
                                            name="type"
                                            className="form-control"
                                            placeholder=""
                                            type="text"
                                            value={payableAmount}
                                          />

                                        </div>
                                        <label className="col-md-2 control-label text-left">
                                          Total Suspense Balance :
                                        </label>
                                        <div className="col-md-2">
                                          <input
                                            disabled={true}
                                            name="type"
                                            className="form-control"
                                            placeholder=""
                                            value={commonTaxDetails.totalSuspenseBal}
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="form-group">
                                        <p className="col-md-8 control-label text-left"><b> Payment Details </b></p>
                                        <hr />
                                        <div className="table-responsive-lg">
                                          <table className="table">
                                            <thead>
                                              <tr>
                                                <th scope="col">Sl.No</th>
                                                <th scope="col">Payment Mode</th>
                                                <th scope="col">Receivable Amount</th>
                                                <th scope="col">Cheque/DD/TXN/No.</th>
                                                <th scope="col">Cheque/DD/TXN/Date </th>
                                                <th scope="col">Bank</th>
                                                <th scope="col">Branch</th>
                                                <th scope="col">Select</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {paymentDetailsList && paymentDetailsList.length > 0 && paymentDetailsList.map((item, index) => {
                                                currentIndex = (currentIndex + 1);
                                                return (
                                                  <tr key={index}>
                                                    <th scope="row">{currentIndex}</th>
                                                    <td>

                                                      <select value={item.paymentMode} onChange={(e)=>handleChange2(e,index)}>
                                                        {options.map(option => (
                                                          <option key={option.value} value={option.value}>
                                                            {option.text}
                                                          </option>
                                                        ))}
                                                      </select>

                                                      {/* <CustomDropdown
                                                                id="dropdown-basic-button-3"
                                                                PropertyName="paymentMode"
                                                                Title="Select"
                                                                SelectedID=""
                                                                DropdownList={options}
                                                                ItemId="paymentMode"
                                                                ItemValue="paymentMode"
                                                                HandleDropdownChange={handleChange2}
                                                                ParentRowId={index}
                                                            /> */}
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        id = "receivedAmount"
                                                        value={payableAmount}
                                                        aria-label=""
                                                        aria-describedby="basic-addon1"
                                                        onChange={handleRecievedAmountChange}
                                                        // disabled={item.paymentMode == "Cash" || item.paymentMode == ""}
                                                      />
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        value={item.chequeOrDDNo}
                                                        id="chequeOrDDNo"
                                                        aria-label=""
                                                        aria-describedby="basic-addon1"
                                                        onChange={(e)=>handleChangePaymentChecqueorDemand(e,index)}
                                                      disabled={item.paymentMode == "Cash" || item.paymentMode == ""}
                                                      />
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder=""
                                                        value={item.chequeOrDDDate}
                                                        aria-describedby="basic-addon1"
                                                        onChange={(e)=>handleDateChangeChqueorDemandPayment(e,index)}
                                                      disabled={item.paymentMode == "Cash" || item.paymentMode == ""}
                                                      />
                                                    </td>
                                                    <td>
                                                      <input id="comBankCode" className="form-control" placeholder="Search Bank" type="text" onChange={(e) => handleBankNameSearch(e.target.value)}
                                                        value={selectedBankNameList} disabled={item.paymentMode == "Cash" || item.paymentMode == ""} />
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
                                                    </td>
                                                    <td>
                                                      <input id="comBankBranchName" className="form-control" placeholder="Search Branch" type="text" onChange={(e) => handleBranchNameListSearch(e.target.value)}
                                                        value={selectedBranchNameList} disabled={item.paymentMode == "Cash" || item.paymentMode == ""}/>
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
                                                    </td>
                                                    <td>
                                                      <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="exampleCheck1"
                                                        onChange={() => checkDeleteLand(index)}

                                                      />
                                                    </td>
                                                  </tr>

                                                )
                                              })}
                                            </tbody>
                                          </table>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <ul className="navbar-nav">
                                            <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                                              <h2 className="welcome-text">
                                                <div className="col-auto nw-crn col-md-12 text-center">
                                                  <button
                                                    href=""
                                                    type="button"
                                                    className="btn btn-primary log-sign1"
                                                    id="btnsearch"
                                                    onClick={addPaymentRow}
                                                  >
                                                    Add Payment Row
                                                  </button>

                                                  <button
                                                    href=""
                                                    type="button"
                                                    className="btn btn-primary log-sign1"
                                                    id="btnsearch"
                                                    onClick={handleDeleteEvent}
                                                  >
                                                    Clear Payment Row
                                                  </button>

                                                  <button
                                                    href=""
                                                    type="button"
                                                    className="btn btn-primary log-sign1"
                                                    id="btnsearch"
                                                  >
                                                    Save and Print
                                                  </button>

                                                  <button
                                                    href=""
                                                    type="button"
                                                    className="btn btn-primary log-sign1"
                                                    id="btnsearch"
                                                  >
                                                    Clear de select
                                                  </button>
                                                </div>
                                              </h2>
                                            </li>
                                          </ul>
                                        </div>
                                        <hr />
                                        <div></div>
                                      </div>
                                    </div>
                                  </div>
                                  : null}


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
        </main>
        {/* <AlertBox
                showConfirm={showConfirmBox}
                ConfirmHeaderText="Save Data Confirmation"
                ConfirmText="Are you sure you want to save the data?"
                ConfirmYesText="Yes"
                ConfirmNoText="No"
                CloseConfirm={CloseBoxConfirm}
                DoEvent={saveRecrutmenetEntry}
            /> */}
      </div>
    </>

  )
}


export default CommonTax;

