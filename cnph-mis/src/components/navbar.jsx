import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Offcanvas,
  Table,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import cnphlogo from "C:/Users/Digitization2/Documents/react/backup/CNPH/cnph-mis/src/cnphlogo.png";
import Medicine from "./medicine";
import Inventory from "./inventory";
import MedicineSearch from "./medicinesearch";
import MedicineEdit from "./medicineedit";
import MedicineDelete from "./medicinedelete";
import MedicineStocks from "./medicinestocks";
import Issuance from "./issuance";
import Assessment from "./assessment";
import Axios from "axios";

function NavBar() {
  const [clockState, setClockState] = useState();
  const hiddenState = true;

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [drugName, setdrugName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [listdrugid, setlistdrugid] = useState({ drid: [] });
  const [listdrugnames, setlistdrugnames] = useState({ drNm: [] });
  const [listStock, setlistStock] = useState({ stck: [] });
  const [listpatientname, setlistpatientname] = useState({ ptnm: [] });
  const [listpatientid, setlistpatientid] = useState({ ptid: [] });
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/patientret").then((response) => {
      setlistpatientname({ ptnm: response.data });
      setlistpatientid({ ptid: response.data });
      console.log(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/searchmeds").then((response) => {
      setlistdrugid({ drid: response.data });
      setlistdrugnames({ drNm: response.data });
      setlistStock({ stck: response.data });
      console.log(response.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <Navbar className="bg-blue-300 text-lg" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" className="font-KdamThmorPro">
              <img
                src={cnphlogo}
                alt="logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              CNPH
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link
                  className="hover:bg-blue-400 rounded font-JosefinSans"
                  as={Link}
                  to={"/home"}
                >
                  Home
                </Nav.Link>

                <Nav.Link
                  className="hover:bg-blue-400 rounded font-JosefinSans"
                  as={Link}
                  to={"/patient-info"}
                >
                  Patient Information
                </Nav.Link>

                {/* MEDICINE NAV DROP DOWN*/}
                <NavDropdown
                  title="Medicine"
                  id="navbarScrollingDropdown"
                  className="hover:bg-blue-400 rounded font-JosefinSans"
                >
                  <NavDropdown.Item as={Link} to={"/api/medicine-add"}>
                    Add new Medicine
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/medicine-search"}>
                    Search Medicine
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/medicine-edit"}>
                    Edit Medicine
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/medicine-delete"}>
                    Dispose
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/medicine-expired"}>
                    See expired
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/medicine-stock"}>
                    Add Stocks
                  </NavDropdown.Item>
                </NavDropdown>

                {/* PURCHASE NAV DROP DOWN */}
                <NavDropdown
                  title="Transactions"
                  id="navbarScrollingDropdown"
                  className="hover:bg-blue-400 rounded font-JosefinSans"
                >
                  <NavDropdown.Item as={Link} to={"/issuance"}>
                    Issuance
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/assessment"}>
                    Assessment
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/transact-history"}>
                    Transaction History
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  {clockState}
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Button variant="success" className="mx-2" onClick={handleShow}>
                  View Patient List
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Patient Names</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {Object.values(listpatientid.ptid).map((value) => (
                              <tr>{value.PatientID}</tr>
                            ))}
                          </td>
                          <td>
                            {Object.values(listpatientname.ptnm).map(
                              (value) => (
                                <tr>{value.PatientName}</tr>
                              )
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Offcanvas.Body>
                </Offcanvas>
                <Button variant="success" onClick={handleShow2}>
                  View Drug List
                </Button>

                <Offcanvas show={show2} onHide={handleClose2}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Drug Names</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Form.Control
                    placeholder="Search Drug Name..."
                    className="w-50 mx-2"
                    onChange={(event) => {
                      setsearchTerm(event.target.value);
                    }}
                  ></Form.Control>
                  <Offcanvas.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <th>Drug ID</th>
                        <th>Drug Name</th>
                        <th>Stock</th>
                      </thead>
                      <tbody>
                        <tr>
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
                                <tr key={value.DrugID}>
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
                                <tr key={value.DrugID}>
                                  <td>{value.DrugName}</td>
                                </tr>
                              ))}
                          </td>
                          <td>
                            {Object.values(listStock.stck)
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
                                <tr key={value.DrugID}>
                                  <td>{value.Stock}</td>
                                </tr>
                              ))}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Offcanvas.Body>
                </Offcanvas>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route exact path="/api/medicine-add" element={<Medicine />} />
          <Route exact path="/patient-info" element={<Inventory />} />
          <Route exact path="/medicine-search" element={<MedicineSearch />} />
          <Route exact path="/medicine-edit" element={<MedicineEdit />} />
          <Route exact path="/medicine-delete" element={<MedicineDelete />} />
          <Route exact path="/patient-info" element={<Inventory />} />
          <Route exact path="/medicine-stock" element={<MedicineStocks />} />
          <Route exact path="/issuance" element={<Issuance />} />
          <Route exact path="/assessment" element={<Assessment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NavBar;
