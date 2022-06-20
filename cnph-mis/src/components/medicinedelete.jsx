import React, { Component, useState, useEffect } from "react";
import { Badge, Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";

function MedicineDelete() {
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [price, setPrice] = useState("");
  const [currentID, setCurrentID] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setCurrentID(response.data);
    });
  }, []);

  const handleID = (e) => {
    setDrugID(e.target.value);
  };
  const handleName = (e) => {
    setdrugName(e.target.value);
  };
  const handleBrand = (e) => {
    setBrandName(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePDate = (e) => {
    setProductionDate(e.target.value);
  };
  const handleEDate = (e) => {
    setExpirationDate(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const submitForm = () => {
    Axios.post("http://localhost:3001/api/medicineadd", {
      drugID: drugID,
      drugName: drugName,
      brandName: brandName,
      category: category,
      productionDate: productionDate,
      expirationDate: expirationDate,
      price: price,
    }).then(() => {
      alert("success!");
    });
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center">
        DISPOSE MEDICINE
      </div>
      <div className="p-6 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                <Form.Group>
                  <Form.Label className="my-1">Drug ID</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder=""
                    id="ex2"
                    className="text-capitalize w-25"
                    value={drugID}
                    onChange={handleID}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Drug Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex. Biogesic"
                    id="ex2"
                    className=""
                    value={drugName}
                    onChange={handleName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex. Paracetamol"
                    id="ex2"
                    className=""
                    value={brandName}
                    onChange={handleBrand}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    id="ex2"
                    className=""
                    value={category}
                    onChange={handleCategory}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Production Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="ex2"
                    className=""
                    value={productionDate}
                    onChange={handlePDate}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Expiration Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="ex2"
                    className=""
                    value={expirationDate}
                    onChange={handleEDate}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1">Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    id="ex2"
                    className=""
                    value={price}
                    onChange={handlePrice}
                  />
                </Form.Group>
              </Row>
            </Col>
            <Button className="mx-1 my-2" onClick={submitForm}>
              Add
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default MedicineDelete;
