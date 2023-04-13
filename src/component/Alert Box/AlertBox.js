import React, { useState, useEffect, Fragment } from "react";
import './AlertBox.css';


function AlertBox(props) {
  // const cancelButton = React.createRef();
  // useEffect({
  //   cancelButton.focus();
  // },[]);
  

  return (
    <>
      <div className="confirmBox-dialog-ovelay" style={{ display: props.showConfirm ? 'block' : 'none' }}>
        <div className="confirmBox-dialog">
          <div className="confirmBox-Header"><h3> {props.ConfirmHeaderText} </h3><i className="confirmBox-fa confirmBox-fa-close" onClick={props.CloseConfirm}></i></div>

          <div className="confirmBox-dialog-msg"> <p> {props.ConfirmText} </p> </div>
          <div className="confirmBox-Footer">
            <div className="confirmBox-controls">
              {!props.isAlert &&
              <button className="confirmBox-button confirmBox-button-default confirmBox-cancelAction" onClick={props.DoEvent} >{props.ConfirmYesText}</button>}
              <button className="confirmBox-button confirmBox-button-danger" onClick={props.CloseConfirm} >{props.ConfirmNoText}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertBox;