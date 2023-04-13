import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Router, Routes } from 'react-router-dom';
import './App.css';
import CommonTax from './commonTax';
import MultipleCommonTax from './multipleCommonTax';
import GovernmentCommonTax from './governmentTax';
import TreasuryDayBeginEnd from './treasuryDay';
import CommonCollectionDayBeginEnd from './commonCollectionDay';
import DuplicateBillGeneration from './duplicateBill';
import Counter from './counter';
import SearchCounter from './searchCounter';
import Sidebar from './sidebar';
import ChangeIp from './changeIp';
import CenterWiseStationary from './centerwisestationarystock';
import CounterWiseStationary from './counterwisestationarystock';
import AddOfficeAccountMap from './addofficeaccountmap';
import SearchOfficeAccountMap from './searchofficeaccountmap';
import PartyMaster from './partymaster';
import CounterStationaryUpdate from './counterstationaryupdate';
import PartyMasterAdd from './partymasteradd';

function App() {
  const [selected, setSelected] = useState("");
  
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CommonTax/>} />
          <Route path="/multipleCommonTax" element={<MultipleCommonTax/>} />
          <Route path="/governmentTax" element={<GovernmentCommonTax/>} />
          <Route path="/treasury" element={<TreasuryDayBeginEnd/>} />
          <Route path="/commonCollection" element={<CommonCollectionDayBeginEnd/>} />
          <Route path="/duplicateBill" element={<DuplicateBillGeneration/>} />
          <Route path="/counter" element={<Counter/>} />
          <Route path="/counter/search" element={<SearchCounter/>} />
          <Route path="/change-ip" element={<ChangeIp/>} />
          <Route path="/centerwisestationarystock" element={<CenterWiseStationary/>} />
          <Route path="/counterwisestationarystock" element={<CounterWiseStationary/>} />
          <Route path="/officeaccountmap/add" element={<AddOfficeAccountMap/>} />
          <Route path="/officeaccountmap/search" element={<SearchOfficeAccountMap/>} />
          <Route path="/partymaster" element={<PartyMaster/>} />
          <Route path="/counterstationaryupdate" element={<CounterStationaryUpdate/>} />
          <Route path="/partymaster/add" element={<PartyMasterAdd/>} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
