import React, { Component, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MedicineStock() {
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [pcs, setPcs] = useState(0);
  const [bundles, setBundles] = useState(0);
  const [boxes, setBoxes] = useState(0);
  const [newpcs, setnewPcs] = useState(0);
  const [newbundles, setnewBundles] = useState(0);
  const [newboxes, setnewBoxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentID, setCurrentID] = useState("");
  const [stockID, setStockID] = useState("");
  const [compName, setcompName] = useState("");

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/stockret").then((response) => {
      setCurrentID(response.data[response.data.length - 1].StockID);
    });
  }, []);

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const searchdrugID = () => {
    Axios.get("http://192.168.1.74:3001/api/searchmeds").then((response) => {
      setdrugName(response.data[(response.data.DrugID = drugID - 1)].DrugName);
      setPcs(response.data[(response.data.DrugID = drugID - 1)].Storage);
      setBoxes(response.data[(response.data.DrugID = drugID - 1)].Box);
      setBundles(response.data[(response.data.DrugID = drugID - 1)].Bundles);
      setTotal(response.data[(response.data.DrugID = drugID - 1)].Stock);
    });
  };

  const handleID = (e) => {
    setDrugID(e.target.value);
  };
  const handleName = (e) => {
    setdrugName(e.target.value);
  };
  const handlepcs = (e) => {
    setPcs(e.target.value);
  };
  const handlebundle = (e) => {
    setBundles(e.target.value);
  };
  const handleboxes = (e) => {
    setBoxes(e.target.value);
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

  const notify = () => {
    toast.success("Successfully Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const submitForm = () => {
    Axios.put("http://192.168.1.74:3001/api/updatestock", {
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
    Axios.post("http://192.168.1.74:3001/api/newstock", {
      stockID: currentID + 1,
      drugID: drugID,
      date: date,
      drugName: drugName,
      newpcs: newpcs,
      newbundles: newbundles,
      newboxes: newboxes,
      compName: compName,
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
                    <Col>
                      <Form.Label className="font-Comfortaa">pcs</Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={pcs}
                        onChange={handlepcs}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        bundles
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa "
                        value={bundles}
                        onChange={handlebundle}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">box</Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={boxes}
                        onChange={handleboxes}
                        disabled
                      />
                    </Col>
                    <Form className="my-1"></Form>
                    <Form.Label className="font-Comfortaa">Total</Form.Label>
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
                      <Form.Label className="font-Comfortaa">pcs</Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={newpcs}
                        onChange={handlenewpcs}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">
                        bundles
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa "
                        value={newbundles}
                        onChange={handlenewbundles}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="font-Comfortaa">box</Form.Label>
                      <Form.Control
                        type="number"
                        className="font-Comfortaa"
                        value={newboxes}
                        onChange={handlenewboxes}
                      />
                    </Col>
                    <Form.Label className="my-2 font-Comfortaa"></Form.Label>
                  </Row>
                </Form.Group>
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

export default MedicineStock;
