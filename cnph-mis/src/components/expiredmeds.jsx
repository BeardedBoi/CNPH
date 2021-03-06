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

function ExpiredMeds() {
  const [listdrugnames, setlistdrugnames] = useState({ drNm: [] });
  const [listdrugid, setlistdrugid] = useState({ drid: [] });
  const [liststockid, setliststockid] = useState({ stid: [] });
  const [liststockdate, setliststockdate] = useState({ stdt: [] });
  const [liststock, setliststock] = useState({ stk: [] });
  const [listexpdate, setlistexpdate] = useState({ exdt: [] });
  const [searchTerm, setsearchTerm] = useState("");
  const [toggle, settoggle] = useState(false);
  const [liststatus, setliststatus] = useState({ sts: [] });

  useEffect(() => {
    overallswitch();
  }, []);

  const toggledisplay = () => {
    toggle ? settoggle(false) : settoggle(true);
  };

  const trytoggle = () => {
    if (toggle == true) {
      overallswitch();
    } else {
      expiredswitch();
    }
  };

  const overallswitch = () => {
    Axios.get("http://localhost:3001/api/expiredret").then((response) => {
      setliststockid({ stid: response.data });
      setliststockdate({ stdt: response.data });
      setlistdrugnames({ drNm: response.data });
      setlistdrugid({ drid: response.data });
      setliststock({ stk: response.data });
      setlistexpdate({ exdt: response.data });
      setliststatus({ sts: response.data });
    });
  };

  const expiredswitch = () => {
    Axios.get("http://localhost:3001/api/expiredret2").then((response) => {
      setliststockid({ stid: response.data });
      setliststockdate({ stdt: response.data });
      setlistdrugnames({ drNm: response.data });
      setlistdrugid({ drid: response.data });
      setliststock({ stk: response.data });
      setlistexpdate({ exdt: response.data });
      setliststatus({ sts: response.data });
    });
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        INVENTORY
      </div>
      <div className="p-6 max-w-3xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
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
                    </Col>
                    <Col>
                      <Form.Check
                        type="switch"
                        label="See Expired"
                        onClick={toggledisplay}
                        onChange={trytoggle}
                      />
                      {toggle ? expiredswitch : overallswitch}
                    </Col>
                    <Form.Control
                      type="TEXT"
                      min="0"
                      className="text-capitalize font-Comfortaa"
                      onChange={(event) => {
                        setsearchTerm(event.target.value);
                      }}
                    />
                  </Row>
                  <Form.Label className="my-1 font-Comfortaa"></Form.Label>
                </Form.Group>
              </Row>
            </Col>

            <Table striped bordered hover size="sm">
              <thead>
                <th>Stock ID</th>
                <th>Stock Date</th>
                <th>Drug ID</th>
                <th>Drug Name</th>
                <th>Stock</th>
                <th>Expiration Date</th>
                <th>Status</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {Object.values(liststockid.stid)
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
                        <tr key={value.StockID}>
                          <td>{value.StockID}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(liststockdate.stdt)
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
                        <tr key={value.StockID}>
                          <td>{value.StockDate}</td>
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
                        <tr key={value.StockID}>
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
                        <tr key={value.StockID}>
                          <td>{value.DrugName}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(liststock.stk)
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
                        <tr key={value.StockID}>
                          <td>{value.TotalStock}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(listexpdate.exdt)
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
                        <tr key={value.StockID}>
                          <td>{value.ExpirationDate}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {Object.values(liststatus.sts)
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
                        <tr key={value.StockID}>
                          <td>{value.Status}</td>
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

export default ExpiredMeds;
