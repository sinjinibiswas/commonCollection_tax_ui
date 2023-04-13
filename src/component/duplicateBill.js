import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import loader from '../img/loader.gif';
import keys from '../keys';
import AlertBox from './Alert Box/AlertBox';
import Sidebar from './sidebar';
import NavBar from './navbar';

const DuplicateBillGeneration = () => {

  const [show, setShow] = useState(false);
  const [commonTaxDetails, setCommonTaxDetails] = useState({
    hrmPhoneNumber: "",
    hrmBillAmount: "",
    hrmBillFromDate: "",
    hrmBillToDate: ""
  });

  // On CHnge event
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newCommonTaxDetails = { ...commonTaxDetails };
    newCommonTaxDetails[id] = value;
    setCommonTaxDetails(newCommonTaxDetails);
    console.log(newCommonTaxDetails);
  }

  // Function for fetching the details for the mobile bill details
  // function fetchTaxDetails() {
  //   let body = {
      
  //   }
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       "access-control-allow-origin": "*",
  //       "Content-type": "application/json; charset=UTF-8"
  //     },
  //     body: JSON.stringify(body)
  //   };
  //   fetch(`${keys.API_URL_COMMON_TAX}/tax...`, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       let taxDetails = (data.responseObject);
  //       setCommonTaxDetails(taxDetails);
  // 
  //     }
  //     );
  // }
  // // Use effect for calling the function on page load
  // useEffect(() => {
  //   fetchTaxDetails()
  // }, [])

  const getDetails =()=>{
    setShow(true)
  }

  function SelectRedirect(){
    // ON selection of section this function will work
    //alert( document.getElementById('s1').value);
    
    switch(document.getElementById('s1').value)
    {
    case "S":
    window.location="/";
    break;
    
    case "M":
    window.location="/multipleCommonTax";
    break;
    
    case "G":
    window.location="/governmentTax";
    break;
    
    /// Can be extended to other different selections of SubCategory //////
    default:
    window.location="/"; // if no selection matches then redirected to home page
    break;
    }// end of switch 
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
            <h2 className="welcome-text">
              {" "}
              Special Regulation Maintenance Modify{" "}
            </h2>
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
                            <p className="col-md-8 control-label text-left"> <b>PRINT DUPLICATE PD BILL</b></p>
                            <hr />
                            <div className="form-group">
                              
                              <div className="form-group">
                                <p className="col-md-8 control-label text-left"><b> Bill Generation Criteria </b></p>
                                <hr />
                                <div className="row">
                                  <label className="col-md-8 control-label text-left">
                                  Enter Assessee Number to print duplicate PD Bill for the current financial year:  <span>*</span>
                                  </label>
                                  <div className="col-md-3">
                                    <input
                                      name="type"
                                      className="form-control"
                                      // placeholder={31}
                                      value="31"
                                      type="text"
                                    />
                                  </div>
                                  <div className="col-auto nw-crn col-md-12 text-center">
                                                                            <button
                                                                                href=""
                                                                                type="button"
                                                                                className="btn btn-primary log-sign1"
                                                                                id="btnsearch"
                                                                            >
                                                                                Search
                                                                            </button>
                                                                            </div>
                                  
                                </div>
                              </div>
                              <hr />
                              <div className="form-group">
                                <p className="col-md-8 control-label text-left"><b> Assessee Details</b></p> <br /> <br />
                                
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Premises: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Street Name: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Owner 1: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Owner 2: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Owner 3: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Owner 4: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Owner 5: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Owner 6: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Owner 7: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Owner 8: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row" style={{ marginTop: "6px" }}>
                                    <label className="col-md-3 control-label text-left" >Owner 9: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <label className="col-md-3 control-label text-left" >Owner 10: <span className="star">* <span></span></span></label>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>
                                  
                                
                              </div>
                              <hr />
                              <div className="row">
                                <ul className="navbar-nav">
                                  <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                                    <h2 className="welcome-text">
                                      <div className="col-auto nw-crn col-md-12 text-center">
                                        <a
                                          href=""
                                          type="button"
                                          className="btn btn-primary log-sign1"
                                          id="btnsearch"
                                        >
                                          Close{" "}
                                        </a>
                                      </div>
                                    </h2>
                                  </li>
                                </ul>
                              </div>
                              <hr />
                              {show == true ?
                              <div>
                              <div className="form-group">
                                {" "}
                                <p className="col-md-8 control-label text-left"><b> 2nd-Summary </b></p>
                                <hr />
                                <div className="row">
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Counter Number <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-3">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder={31}
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Stationary No <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-3">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder="AP	"
                                      type="text"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder={287921}
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr />
                              <div className="form-group">
                                {" "}
                                <p className="col-md-8 control-label text-left"><b> Receipt Header Information </b></p> <br /> <br />
                                <div className="row">
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Receipt No <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder=""
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Receipt Date <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder="07.02.2023"
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Department <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder="ASSESSMENT"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <label className="col-md-2 control-label text-left">
                                  Assessee No <span>*</span>{" "}
                                </label>
                                <div className="col-md-4">
                                  <input
                                    name="type"
                                    className="form-control"
                                    placeholder="Offer Unit"
                                    type="text"
                                  />
                                </div>
                                <label className="col-md-3 control-label text-left">
                                  {" "}
                                  Collection Center Name <span>*</span>{" "}
                                </label>
                                <div className="col-md-3">
                                  <input
                                    name="type"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                  />
                                </div>{" "}
                                <br />
                                <br />
                                <label className="col-md-2 control-label text-left">
                                  {" "}
                                  Barcode <span>*</span>{" "}
                                </label>
                                <div className="col-md-10">
                                  <input
                                    name="type"
                                    className="form-control"
                                    placeholder="Barcode"
                                    type="text"
                                  />
                                </div>{" "}
                                <br /> <br />
                                <div className="row">
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Mobile no <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder="mobile no"
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Email-Id <span>*</span>{" "}
                                  </label>
                                  <div className="col-md-3">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder="Email-Id"
                                      type="text"
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    <a
                                      href=""
                                      type="button"
                                      className="btn btn-primary log-sign1"
                                      id="btnsearch"
                                    >
                                      {" "}
                                      Get Details{" "}
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <hr />
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
                                          {" "}
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                          />{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">2022-2023</th>
                                        <td>1</td>
                                        <td>1132</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td>68.01</td>
                                        <td>113.20</td>
                                        <td>1313</td>
                                        <td>27/06/2022</td>
                                        <td>06/06/2022</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2022-2023</th>
                                        <td>1</td>
                                        <td>1132</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td>68.01</td>
                                        <td>113.20</td>
                                        <td>1313</td>
                                        <td>27/06/2022</td>
                                        <td>06/06/2022</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2022-2023</th>
                                        <td>1</td>
                                        <td>1132</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td>68.01</td>
                                        <td>113.20</td>
                                        <td>1313</td>
                                        <td>27/06/2022</td>
                                        <td>06/06/2022</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2022-2023</th>
                                        <td>1</td>
                                        <td>1132</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td>68.01</td>
                                        <td>113.20</td>
                                        <td>1313</td>
                                        <td>27/06/2022</td>
                                        <td>06/06/2022</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="row">
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Balance Unpaid Amount :{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder=""
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Total Unpaid Amount :{" "}
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder=""
                                      type="text"
                                    />
                                  </div>
                                  <label className="col-md-2 control-label text-left">
                                    {" "}
                                    Total Suspense Balance :
                                  </label>
                                  <div className="col-md-2">
                                    <input
                                      name="type"
                                      className="form-control"
                                      placeholder=""
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                  {" "}
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
                                        <tr>
                                          <th scope="row">1</th>
                                          <td>1</td>
                                          <td>
                                            <select
                                              className="form-control"
                                              id="exampleFormControlSelect1"
                                            >
                                              <option>Cash</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>Cheque</option>
                                            </select>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder=""
                                              aria-label=""
                                              aria-describedby="basic-addon1"
                                            />
                                          </td>
                                          <td> 0 </td>
                                          <td> 0 </td>
                                          <td> 0 </td>
                                          <td>
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="exampleCheck1"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan={7}>
                                            {" "}
                                            Total Amount = 00.00
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <ul className="navbar-nav">
                                      <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                                        <h2 className="welcome-text">
                                          <div className="col-auto nw-crn col-md-12 text-center">
                                            <a
                                              href=""
                                              type="button"
                                              className="btn btn-primary log-sign1"
                                              id="btnsearch"
                                            >
                                              Close{" "}
                                            </a>
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
                              :null}
                             

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


export default DuplicateBillGeneration;

