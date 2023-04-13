import { Label } from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState, useEffect } from "react";


const CustomDropdown= (props)=>{
    console.log(props.DropdownList);
    const [state, setState] = useState({
        id:"",
        value:""
    });
    
    
useEffect(()=>{
    console.log(props.DropdownList);
    console.log(props.SelectedID);
    if(props.DropdownList!== null || props.DropdownList.length > 0){
        
    
            if(props.SelectedID!="")
            {
                props.DropdownList.map((item,index)=>{
                    if(item[props.ItemId]==props.SelectedID)
                    {
                        const newstate = { ...state }
                    newstate.id = item[props.ItemId];
                    newstate.value = item[props.ItemValue];
                    setState(newstate);
                    }
                });
            }
        }
    },[props.DropdownList]);

    


    const handleDropDown = (dropdownid, id, value) => {
        const newstate = { ...state }

        newstate.id = id;
        newstate.value = value;
        setState(newstate)
        props.HandleDropdownChange(dropdownid, id, value, props.ParentRowId)
        
    };

    return (
        <>
    {/* <Label className="col-md-3" for="Employee Number">Qualified For Wriiten: </Label> */}
    <div className="col-md-3 ">
        <DropdownButton id={props.id} title={state.value==""?props.Title:state.value} disabled={props.disabled} >
        <Dropdown.Item onClick={() => handleDropDown(props.PropertyName, '', props.Title)}>{props.Title}</Dropdown.Item>
            {props.DropdownList && props.DropdownList.map(item => {

                return (
                    <Dropdown.Item onClick={() => handleDropDown(props.PropertyName, item[props.ItemId], item[props.ItemValue])}>{item[props.ItemValue]}</Dropdown.Item>
                )
            })
        }
        </DropdownButton>
    </div>
    </>
    )
    
}

export default CustomDropdown;
