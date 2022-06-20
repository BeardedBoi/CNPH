const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "192.168.1.74",
  user: "root",
  password: "",
  database: "cnphdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT MAX(DrugID) FROM `medicine`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const patientID = req.body.patientID;
  const patientName = req.body.patientName;

  const sqlInsert = "INSERT INTO patient (PatientID, PatientName) VALUES (?,?)";
  db.query(sqlInsert, [patientID, patientName], (err, result) => {});
  console.log(result);
});

app.post("/api/medicineadd", (req, res) => {
  const drugID = req.body.drugID;
  const drugName = req.body.drugName;
  const brandName = req.body.brandName;
  const category = req.body.category;
  const productionDate = req.body.productionDate;
  const expirationDate = req.body.expirationDate;
  const price = req.body.price;
  const sqlInsert =
    "INSERT INTO medicine (DrugID, DrugName, BrandName, Category, ProductionDate, ExpirationDate, Price) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      drugID,
      drugName,
      brandName,
      category,
      productionDate,
      expirationDate,
      price,
    ],
    (err, result) => {}
  );
  console.log(result);
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
