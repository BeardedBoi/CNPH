import React, { Component, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

function Medicine() {
  const [drugID, setDrugID] = useState("");
  const [drugName, setdrugName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [price, setPrice] = useState("");
  const [currentID, setCurrentID] = useState("");

  const { register, setValue } = useForm({
    defaultValues: {
      getID: "",
    },
  });

  useEffect(() => {
    Axios.get("http://192.168.1.74:3001/api/get").then((response) => {
      setCurrentID(response.data[response.data.length - 1].DrugID);
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
  const refreshPage = () => {
    window.location.reload();
  };
  const resetInputField = () => {
    setDrugID("");
    setdrugName("");
    setBrandName("");
    setCategory("");
    setProductionDate("");
    setExpirationDate("");
    setPrice("");
  };

  const notify = () => {
    toast.success("Save successful!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    refreshPage();
  };

  const verification = () => {
    if (
      currentID === "" ||
      drugName === "" ||
      brandName === "" ||
      category === "" ||
      //productionDate === "" ||
      // expirationDate === "" ||
      price === ""
    ) {
      toast.warn("Cannot leave empty fields chief!", {
        autoClose: 2000,
      });
    } else if (expirationDate < productionDate) {
      toast.warn("Expiration date cannot be lower that production date", {
        autoClose: 2000,
      });
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    Axios.post("http://192.168.1.74:3001/api/medicineadd", {
      drugID: currentID + 1,
      drugName: drugName,
      brandName: brandName,
      category: category,
      // productionDate: productionDate,
      //expirationDate: expirationDate,
      price: price,
    }).then(() => {
      notify();
    });

    //refreshPage();
  };

  return (
    <div>
      <div className="text-4xl text-green-500 my-5 font-bold text-center font-JosefinSans">
        ADD NEW MEDICINE
      </div>
      <div className="p-6 max-w-2xl bg-white rounded-xl shadow-lg flex items-center space-x-3 my-2 mx-auto">
        <Container>
          <Form>
            <Col>
              <Row>
                <Form.Group>
                  <Col>
                    <Row>
                      <Form.Label className="my-1 font-Comfortaa text-red-500">
                        * ID is auto generated.
                      </Form.Label>
                      <Form.Label className="my-1 font-Comfortaa">
                        Drug ID
                      </Form.Label>
                    </Row>
                  </Col>
                  <Form.Control
                    type="text"
                    min="0"
                    placeholder=""
                    id="txt1"
                    value={currentID + 1}
                    disabled
                    className="text-capitalize w-25 font-Comfortaa"
                    onChange={handleID}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Drug Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex. Biogesic, neosep etc."
                    id="txt2"
                    className="font-Comfortaa text-capitalize"
                    value={drugName}
                    onChange={handleName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Brand Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex. Paracetamol , ibuprofen etc."
                    id="txt3"
                    className="font-Comfortaa text-capitalize"
                    value={brandName}
                    onChange={handleBrand}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex. Antibiotic, Painkiller etc."
                    id="txt4"
                    className="font-Comfortaa text-capitalize"
                    value={category}
                    onChange={handleCategory}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa" hidden>
                    Production Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="txt5"
                    className="font-Comfortaa"
                    value={productionDate}
                    onChange={handlePDate}
                    hidden
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa" hidden>
                    Expiration Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="0.00"
                    id="txt6"
                    className="font-Comfortaa"
                    value={expirationDate}
                    onChange={handleEDate}
                    hidden
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-1 font-Comfortaa">Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    id="txt7"
                    className="font-Comfortaa"
                    value={price}
                    onChange={handlePrice}
                  />
                </Form.Group>
              </Row>
            </Col>
            <Button className="mx-1 my-2" onClick={verification}>
              Add
            </Button>
            <ToastContainer />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Medicine;
