import React, { Component, useState, useEffect } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransactHistory() {
  const [listpatientname, setlistpatientname] = useState({ ptnm: [] });
  const [listpatientid, setlistpatientid] = useState({ ptid: [] });
  const [listdrugnames, setlistdrugnames] = useState({ drNm: [] });
  const [listdrugid, setlistdrugid] = useState({ drid: [] });
  const [listquantity, setlistquantity] = useState({ quan: [] });
  const [listcost, setlistcost] = useState({ cst: [] });
  const [listtransactID, setlisttransactID] = useState({ trid: [] });
  const [listtransactdate, setlisttransactdate] = useState({ trdt: [] });
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/transactret").then((response) => {
      setlistpatientname({ ptnm: response.data });
      setlistpatientid({ ptid: response.data });
      setlistdrugnames({ drNm: response.data });
      setlistdrugid({ drid: response.data });
      setlistquantity({ quan: response.data });
      setlistcost({ cst: response.data });
      setlisttransactID({ trid: response.data });
      setlisttransactdate({ trdt: response.data });
    });
  }, []);

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        TRANSACTIONS HISTORY
      </div>
      <div className="p-6 max-w-4xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                {/******************************* SEARCH FOR PATIENT ID ********************************************************************/}
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label className="my-1 font-Comfortaa ">
                        Search Drug Name
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
                  </Row>
                  <Form.Label className="my-1 font-Comfortaa"></Form.Label>
                </Form.Group>
              </Row>
            </Col>

            <Table striped bordered hover size="sm">
              <thead>
                <th>Transaction ID</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Drug ID</th>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Transaction Date</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {Object.values(listtransactID.trid)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.TransactionID}</td>
                        </tr>
                      ))}
                  </td>

                  <td>
                    {Object.values(listpatientid.ptid)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
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
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
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
                    {Object.values(listdrugid.drid)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>{value.DrugID}</td>
                        </tr>
                      ))}
                  </td>

                  <td>
                    {Object.values(listdrugnames.drNm)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
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
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
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
                    {Object.values(listcost.cst)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((value) => (
                        <tr key={value.TransactionID}>
                          <td>₱{value.Cost}.00</td>
                        </tr>
                      ))}
                  </td>

                  <td>
                    {Object.values(listtransactdate.trdt)
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          val.DrugName.toLowerCase().includes(
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

export default TransactHistory;
