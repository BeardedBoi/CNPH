import React, { Component, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Medicine() {
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const searchbyID = () => {
    Axios.get("http://192.168.1.74:3001/api/searchmeds").then((response) => {
      setdrugName(response.data[(response.data.DrugID = drugID - 1)].DrugName);
      setBrandName(
        response.data[(response.data.DrugID = drugID - 1)].BrandName
      );
      setCategory(response.data[(response.data.DrugID = drugID - 1)].Category);
      setProductionDate(
        response.data[(response.data.DrugID = drugID - 1)].ProductionDate
      );
      setExpirationDate(
        response.data[(response.data.DrugID = drugID - 1)].ExpirationDate
      );
      setStock(response.data[(response.data.DrugID = drugID - 1)].Stock);
      setPrice(response.data[(response.data.DrugID = drugID - 1)].Price);
    });
  };

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
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        SEARCH MEDICINE
      </div>
      <div className="p-6 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Drug ID
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      min="0"
                      className="text-capitalize w-25 font-Comfortaa"
                      onChange={handleID}
                    />
                    <Button
                      className="badge badge-primary"
                      onClick={searchbyID}
                    >
                      Search
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Drug Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="txt2"
                    className="font-Comfortaa text-capitalize"
                    value={drugName}
                    onChange={handleName}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Brand Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="txt3"
                    className="font-Comfortaa text-capitalize"
                    value={brandName}
                    onChange={handleBrand}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="txt4"
                    className="font-Comfortaa text-capitalize"
                    value={category}
                    onChange={handleCategory}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Production Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="txt5"
                    className="font-Comfortaa"
                    value={productionDate}
                    onChange={handlePDate}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Expiration Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="txt6"
                    className="font-Comfortaa"
                    value={expirationDate}
                    onChange={handleEDate}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">Price</Form.Label>
                  <Form.Control
                    type="number"
                    id="txt7"
                    className="font-Comfortaa"
                    value={price}
                    onChange={handlePrice}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">Stock</Form.Label>
                  <Form.Control
                    type="number"
                    id="txt7"
                    className="font-Comfortaa"
                    value={stock}
                    onChange={handleStock}
                    disabled
                  />
                </Form.Group>
              </Row>
            </Col>
            <ToastContainer />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Medicine;
