import React, { Component, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Issuance() {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [stock, setStock] = useState(0);
  const [total, setTotal] = useState(0);
  const [currenttransID, setCurrentTransID] = useState("");
  const [quantity, setquantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/rettransactID").then((response) => {
      setCurrentTransID(response.data[response.data.length - 1].TransactionID);
    });
  }, []);

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  //************************ SEARCH MEDS**********************************************
  const searchdrugID = () => {
    Axios.get("http://192.168.1.74:3001/api/searchmeds").then((response) => {
      setdrugName(response.data[(response.data.DrugID = drugID - 1)].DrugName);
      setStock(response.data[(response.data.DrugID = drugID - 1)].Stock);
      setPrice(response.data[(response.data.DrugID = drugID - 1)].Price);
    });
  };

  //****************************RETRIEVE PATIENT ID ****************************************************************************
  const searchpatientID = () => {
    Axios.get("http://192.168.1.74:3001/api/patientret").then((response) => {
      setPatientName(
        response.data[(response.data.PatientID = patientID - 1)].PatientName
      );
    });
  };

  const handleID = (e) => {
    setDrugID(e.target.value);
  };
  const handleName = (e) => {
    setdrugName(e.target.value);
  };
  const handlepatientID = (e) => {
    setPatientID(e.target.value);
  };
  const handlePatientName = (e) => {
    setPatientName(e.target.value);
  };
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  const handlequantity = (e) => {
    setquantity(e.target.value);
  };

  const handlecalculate = () => {
    setTotal(quantity * price);
  };

  const notify = () => {
    toast.success("Successfully Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const submitForm = () => {
    Axios.post("http://192.168.1.74:3001/api/newissuance", {
      patientID: patientID,
      patientName: patientName,
      drugID: drugID,
      drugName: drugName,
      quantity: quantity,
      total: total,
      currenttransID: currenttransID + 1,
      date: date,
    }).then(() => {
      notify();
    });
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        ISSUANCE
      </div>
      <div className="p-6 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                {/******************************* SEARCH FOR PATIENT ID ********************************************************************/}
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label className="my-1 font-Comfortaa">
                        Transaction No.
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={currenttransID + 1}
                        className="text-capitalize font-Comfortaa"
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="my-1 font-Comfortaa">
                        Patient ID
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={patientID}
                        className="text-capitalize font-Comfortaa"
                        onChange={handlepatientID}
                      />
                    </Col>
                    <Col>
                      <Button
                        className="badge badge-primary my-7 w-50 h-50"
                        onClick={searchpatientID}
                      >
                        Search
                      </Button>
                    </Col>
                    <Form.Label className="my-1 font-Comfortaa">
                      Patient Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={patientName}
                      className="text-capitalize font-Comfortaa mx-2 w-75"
                      onChange={handlePatientName}
                      disabled
                    />
                  </Row>
                  <Form.Label className="my-1 font-Comfortaa"></Form.Label>
                </Form.Group>

                {/**************************** SEARCH MEDICINE *******************************************************/}
                <Form.Group className="border-1 border-red-500 rounded">
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa my-1">
                        Medicine ID
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="txt2"
                        className="font-Comfortaa text-capitalize w-100"
                        value={drugID}
                        onChange={handleID}
                      />
                    </Col>
                    <Col>
                      <Button
                        className="badge badge-primary my-7 w-50 h-50"
                        onClick={searchdrugID}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Medicine Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="txt2"
                        className="font-Comfortaa text-capitalize"
                        value={drugName}
                        onChange={handleName}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Current Stock
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa w-75"
                        value={stock}
                        onChange={handleStock}
                        disabled
                      />
                    </Col>
                    <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Quantity
                      </Form.Label>
                      <Form.Control
                        type="number"
                        id="txt2"
                        className="font-Comfortaa text-capitalize"
                        value={quantity}
                        onChange={handlequantity}
                        onKeyUp={handlecalculate}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Total Amount (₱)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        className="font-Comfortaa w-75"
                        value={total}
                        disabled
                      />
                    </Col>
                    <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  </Row>
                </Form.Group>
                <Form.Label className="my-1 font-Comfortaa"></Form.Label>
                <Button
                  className="badge badge-primary w-25 h-10"
                  onClick={submitForm}
                >
                  Add Stock
                </Button>
              </Row>
            </Col>
            <ToastContainer />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Issuance;
