import React, { Component, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MedicineStock() {
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [newpcs, setnewPcs] = useState(0);
  const [newbundles, setnewBundles] = useState(0);
  const [newboxes, setnewBoxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentID, setCurrentID] = useState("");
  const [stockID, setStockID] = useState("");
  const [compName, setcompName] = useState("");
  const [proddate, setproddate] = useState("");
  const [expdate, setexpdate] = useState("");
  const [addtotal, setaddtotal] = useState(0);
  const [deldate, setdeldate] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/stockret").then((response) => {
      setCurrentID(response.data[response.data.length - 1].StockID);
    });
  }, []);

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const searchdrugID = () => {
    Axios.get("http://localhost:3001/api/searchstock")
      .then((response) => {
        setdrugName(
          response.data[(response.data.DrugID = stockID - 1)].DrugName
        );
        setTotal(
          response.data[(response.data.DrugID = stockID - 1)].TotalStock
        );
        setdeldate(
          response.data[(response.data.DrugID = stockID - 1)].StockDate
        );
        setcompName(
          response.data[(response.data.DrugID = stockID - 1)].CompanyName
        );
        setproddate(
          response.data[(response.data.DrugID = stockID - 1)].ProductionDate
        );
        setexpdate(
          response.data[(response.data.DrugID = stockID - 1)].ExpirationDate
        );
        setDrugID(response.data[(response.data.DrugID = stockID - 1)].DrugID);
      })
      .catch((error) => {
        notifyresult();
      });
  };

  const notifyresult = () => {
    toast.error("No result", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const handleID = (e) => {
    setDrugID(e.target.value);
  };
  const handleName = (e) => {
    setdrugName(e.target.value);
  };
  const handlenewpcs = (e) => {
    setnewPcs(e.target.value);
  };
  const handlenewbundles = (e) => {
    setnewBundles(e.target.value);
  };
  const handlenewboxes = (e) => {
    setnewBoxes(e.target.value);
  };
  const handleCompName = (e) => {
    setcompName(e.target.value);
  };
  const handlestockID = (e) => {
    setStockID(e.target.value);
  };

  const handleproddate = (e) => {
    setproddate(e.target.value);
  };

  const handleexpdate = (e) => {
    setexpdate(e.target.value);
  };

  const handleaddstock = () => {
    setaddtotal(newpcs * 1 + newbundles * 10 + newboxes * 100);
  };

  const handledeldate = (e) => {
    setdeldate(e.target.value);
  };

  const notify = () => {
    toast.success("Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const verification = () => {
    if (
      stockID == "" ||
      drugName == "" ||
      deldate == "" ||
      compName == "" ||
      proddate == "" ||
      expdate == ""
    ) {
      toast.warn("Do not leave empty fields chief!", {
        autoClose: 2000,
      });
    } else {
      confirm();
    }
  };

  const confirm = () => {
    disposestock();
    disposemeds();
    notify();
  };

  const disposestock = () => {
    Axios.put("http://localhost:3001/api/disposestock", {
      stockID: stockID,
    }).then(() => {});
  };

  const disposemeds = () => {
    Axios.put("http://localhost:3001/api/disposemeds", {
      drugID: drugID,
      total: total,
    }).then(() => {});
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        DISPOSE
      </div>
      <div className="p-6 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                {/* SEARCHING FOR ID ********************************************************************/}
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label className="my-1 font-Comfortaa">
                        Stock ID
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={stockID}
                        className="text-capitalize font-Comfortaa"
                        onChange={handlestockID}
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
                </Form.Group>

                {/* SEARCH ID RESULT/ CURRENT STOCKS ********************************************************/}
                <Form.Group>
                  <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  <Form.Label className="font-Comfortaa">Drug Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="font-Comfortaa text-capitalize "
                    value={drugName}
                    onChange={handleName}
                    disabled
                  />
                  <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Current Stock
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={total}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Delivery Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className="font-Comfortaa"
                        value={deldate}
                        onChange={handledeldate}
                        disabled
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* ADDING STOCK *****************************************************************/}
                <Form.Group>
                  <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  <Row>
                    <Col xs={9}>
                      <Form.Label className="font-Comfortaa">
                        Company Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="font-Comfortaa text-capitalize"
                        value={compName}
                        onChange={handleCompName}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Form className="my-2"></Form>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Production Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className="font-Comfortaa"
                        value={proddate}
                        onChange={handleproddate}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Expiration Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className="font-Comfortaa"
                        value={expdate}
                        onChange={handleexpdate}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Form className="my-2"></Form>
                </Form.Group>
                <Button
                  className="badge badge-primary w-25 h-10"
                  onClick={verification}
                >
                  Confirm
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

export default MedicineStock;
