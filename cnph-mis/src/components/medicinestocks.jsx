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
    Axios.get("http://localhost:3001/api/searchmeds").then((response) => {
      setdrugName(response.data[(response.data.DrugID = drugID - 1)].DrugName);
      setTotal(response.data[(response.data.DrugID = drugID - 1)].Stock);
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

  const notify = () => {
    toast.success("Successfully Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const verification = () => {
    if (compName === "" || proddate === "" || expdate === "") {
      toast.warn("Do not leave empty fields chief!", {
        autoClose: 2000,
      });
    } else if (expdate < proddate) {
      toast.warn("Expiration date cannot be lower that production date", {
        autoClose: 2000,
      });
    } else if (newpcs === 0 && newbundles === 0 && newboxes === 0) {
      toast.warn("Really?", {
        autoClose: 2000,
      });
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    Axios.put("http://localhost:3001/api/updatestock", {
      newpcs: newpcs,
      newbundles: newbundles,
      newboxes: newboxes,
      drugID: drugID,
    }).then(() => {
      addtostock();
      notify();
    });
  };

  const addtostock = () => {
    Axios.post("http://localhost:3001/api/newstock", {
      stockID: currentID + 1,
      drugID: drugID,
      date: date,
      drugName: drugName,
      newpcs: newpcs,
      newbundles: newbundles,
      newboxes: newboxes,
      compName: compName,
      proddate: proddate,
      expdate: expdate,
      addtotal: addtotal,
    }).then(() => {});
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        MANAGE STOCKS
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
                        Drug ID
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={drugID}
                        className="text-capitalize font-Comfortaa"
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
                </Form.Group>

                {/* SEARCH ID RESULT/ CURRENT STOCKS ********************************************************/}
                <Form.Group className="border-1 border-red-500 rounded">
                  <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  <Form.Label className="font-Comfortaa">Drug Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="txt2"
                    className="font-Comfortaa text-capitalize "
                    value={drugName}
                    onChange={handleName}
                    disabled
                  />
                  <Row>
                    <Form.Label className="font-Comfortaa my-2">
                      Current Stock
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="font-Comfortaa w-25 mx-3"
                      value={total}
                      disabled
                    />
                    <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  </Row>
                </Form.Group>

                {/* ADDING STOCK *****************************************************************/}
                <Form.Group className="border-1 border-green-500 rounded my-3">
                  <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        Stock ID
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={currentID + 1}
                        onChange={handlestockID}
                        disabled
                      />
                    </Col>
                    <Col xs={9}>
                      <Form.Label className="font-Comfortaa">
                        Company Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="font-Comfortaa text-capitalize"
                        value={compName}
                        onChange={handleCompName}
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
                      />
                    </Col>
                  </Row>
                  <Form className="my-2"></Form>
                  <Row>
                    <Col>
                      <Form.Label className="font-Comfortaa">pcs</Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        min="0"
                        value={newpcs}
                        onChange={handlenewpcs}
                        onKeyUp={handleaddstock}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        bundles(*10)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa "
                        min="0"
                        value={newbundles}
                        onChange={handlenewbundles}
                        onKeyUp={handleaddstock}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        box(*100)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        min="0"
                        value={newboxes}
                        onChange={handlenewboxes}
                        onKeyUp={handleaddstock}
                      />
                    </Col>
                    <Row>
                      <Form.Label className="font-Comfortaa my-2">
                        Total
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa w-25 mx-3"
                        value={addtotal}
                        disabled
                      />
                      <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                    </Row>
                    <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  </Row>
                </Form.Group>
                <Button
                  className="badge badge-primary w-25 h-10"
                  onClick={verification}
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

export default MedicineStock;
