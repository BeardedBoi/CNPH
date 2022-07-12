import React, { Component, useState } from "react";
import { Badge, Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";

function Inventory() {
  const [patientID, PatientID] = useState("");
  const [patientName, PatientName] = useState("");
  const handleID = (e) => {
    PatientID(e.target.value);
  };
  const handleName = (e) => {
    PatientName(e.target.value);
  };
  const submitForm = () => {
    Axios.post("http://localhost:3001/api/insert", {
      patientID: patientID,
      patientName: patientName,
    }).then(() => {
      alert("success!");
    });
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold font text-center">
        PATIENT INFORMATION
      </div>
      <div className="p-10 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-4 my-2 mx-6">
        <Container>
          <Form>
            <Form.Label className="text-red-500">
              *Put maiden name if married
            </Form.Label>
            <Col>
              <Row>
                <Form.Label className="bg-green-500 badge w-25 mx-3 ">
                  {"Patient Number"}
                </Form.Label>
                <Form.Group className="input-group">
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Patient no."
                    id="ex2"
                    className="text-capitalize w-25"
                    value={patientID}
                    onChange={handleID}
                  />
                  <Button className="input-group-addon">Search </Button>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full name"
                    id="ex2"
                    className="text-capitalize"
                    value={patientName}
                    onChange={handleName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Total</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    id="ex2"
                    className="text-capitalize w-25"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Overall</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    id="ex2"
                    className="text-capitalize w-25"
                  />
                </Form.Group>
              </Row>
            </Col>
            <Button className="m-2" onClick={submitForm}>
              Add
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Inventory;
