import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
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

function NavBar() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
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
                    Delete Medicine
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
                  <NavDropdown.Item as={Link} to={"/transact"}>
                    Issuance
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/transact-search"}>
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
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
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
        </Routes>
      </div>
    </Router>
  );
}

export default NavBar;
