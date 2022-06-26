import React, { Component, useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Table,
  Overlay,
  Offcanvas,
} from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./searchbar.css";

function Assessment() {
  const [patientName, setPatientName] = useState("");
  const [listdrugnames, setlistdrugnames] = useState({ drNm: [] });
  const [listpatientname, setlistpatientname] = useState({ ptnm: [] });
  const [listpatientid, setlistpatientid] = useState({ ptid: [] });
  const [listquantity, setlistquanity] = useState({ quan: [] });
  const [listcost, setlistcost] = useState({ cost: [] });
  const [listtransdate, setlisttransdate] = useState({ trdt: [] });
  const [searchTerm, setsearchTerm] = useState("");
  const [searchDate, setsearchDate] = useState("");

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/assessmentret").then((response) => {
      setlistpatientid({ ptid: response.data });
      setlistpatientname({ ptnm: response.data });
      setlistdrugnames({ drNm: response.data });
      setlistquanity({ quan: response.data });
      setlistcost({ cost: response.data });
      setlisttransdate({ trdt: response.data });
    });
  }, []);

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const handlePatientName = (e) => {
    setPatientName(e.target.value);
  };
  const notify = () => {
    toast.success("Successfully Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        ASSESSMENT
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
                      <Form.Label className="my-1 font-Comfortaa ">
                        Patient Name
                      </Form.Label>
                      <Form.Control
                        type="TEXT"
                        min="0"
                        className="text-capitalize font-Comfortaa"
                        onChange={(event) => {
                          setsearchTerm(event.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="my-1 font-Comfortaa " hidden>
                        Transaction Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        min="0"
                        className="font-Comfortaa"
                        onChange={(event) => {
                          setsearchDate(event.target.value);
                        }}
                        hidden
                      />
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
              </Row>
            </Col>

            <Table striped bordered hover size="sm">
              <thead>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Transaction Date</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {Object.values(listpatientid.ptid)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.PatientID}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listpatientname.ptnm)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //  return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.PatientName}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listdrugnames.drNm)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //  return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.DrugName}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listquantity.quan)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //  return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.Quantity}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listcost.cost)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //  return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.Cost}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listtransdate.trdt)
                      .filter((val) => {
                        if (searchTerm == "") {
                          //  return val;
                        } else if (
                          val.PatientName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.TransactionDate}</td>
                        </tr>
                      ))}
                  </td>
                </tr>
              </tbody>
            </Table>
            <ToastContainer />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Assessment;
