import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Inventory from "./components/inventory";
import Axios from "axios";
import Medicine from "./components/medicine";
import NavBarrs from "./components/navbar";

function App() {
  const [patientID, PatientID] = useState("");
  const [patientName, PatientName] = useState("");
  const submitForm = () => {
    Axios.post("http://localhost:3001/api/insert", {
      patientID: patientID,
      patientName: patientName,
    }).then(() => {
      alert("success!");
    });
  };
  const [active, setActive] = useState("");
  return (
    <div>
      <NavBarrs />
    </div>
  );
}

//<Inventory submitForm={submitForm} />

export default App;
