const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cnphdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//**********************************SEARCHING MEDS**********************************************************/
app.get("/api/searchmeds", (req, res) => {
  const sqlSelect = "SELECT * FROM `medicine`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
//******************************************************************************************************* */
//
//
//

//********************************* NEW MEDICINE ******************************************************************/
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT DrugID FROM `medicine`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
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
//*******************************************************************************************************************/
//
//
//

//********************************* MEDICINE STOCKS ****************************************************************************/
app.get("/api/stockret", (req, res) => {
  const sqlSelect = "SELECT StockID FROM `stock`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/searchstock", (req, res) => {
  const sqlSelect = "SELECT * FROM `stock`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/updatestock", (req, res) => {
  const newpcs = req.body.newpcs;
  const newbundles = req.body.newbundles;
  const newboxes = req.body.newboxes;
  const drugID = req.body.drugID;
  const sqlUpdate =
    "UPDATE `medicine` SET Storage = Storage + ?, Bundles = Bundles + ?, Box = Box + ?, Stock = Stock + ? +  (? * 10) + (? * 100) WHERE DrugID = ?";
  db.query(
    sqlUpdate,
    [newpcs, newbundles, newboxes, newpcs, newbundles, newboxes, drugID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/newstock", (req, res) => {
  const drugID = req.body.drugID;
  const drugName = req.body.drugName;
  const stockID = req.body.stockID;
  const pcs = req.body.newpcs;
  const bundles = req.body.newbundles;
  const boxes = req.body.newboxes;
  const compName = req.body.compName;
  const proddate = req.body.proddate;
  const expdate = req.body.expdate;
  const addtotal = req.body.addtotal;
  const sqlUpdate =
    "INSERT INTO stock (StockID, StockDate, DrugID, DrugName, Pcs, Bundles, Box, CompanyName, ProductionDate, ExpirationDate, TotalStock, Status) VALUES (?,DATE(CURRENT_DATE),?,?,?,?,?,?,?,?,?,'Active')";
  db.query(
    sqlUpdate,
    [
      stockID,
      drugID,
      drugName,
      pcs,
      bundles,
      boxes,
      compName,
      proddate,
      expdate,
      addtotal,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//******************************************************************************************************************************* */
//
//
//

//**************************** UPDATE MEDS *******************************************************************************************/
app.put("/api/updatemeds", (req, res) => {
  const drugID = req.body.drugID;
  const drugName = req.body.drugName;
  const brandName = req.body.brandName;
  const category = req.body.category;
  const productionDate = req.body.productionDate;
  const expirationDate = req.body.expirationDate;
  const price = req.body.price;
  const sqlUpdate =
    "UPDATE `medicine` SET DrugName = ?, BrandName = ?, Category = ?, ProductionDate = ?, ExpirationDate = ?, Price = ? WHERE DrugID = ?";
  db.query(
    sqlUpdate,
    [
      drugName,
      brandName,
      category,
      productionDate,
      expirationDate,
      price,
      drugID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//**********************************************************************************************************************************/
//
//
//

//************************* ISSUANCE *******************************************************************************************************/
app.get("/api/rettransactID", (req, res) => {
  const sqlSelect = "SELECT TransactionID FROM `patient_assessment`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/patientret", (req, res) => {
  const sqlSelect = "SELECT * FROM `patient`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/fcfsmedret", (req, res) => {
  const drugID = req.body.drugID;
  const sqlSelect =
    "SELECT * FROM `stock` WHERE ProductionDate IN (SELECT MIN(ProductionDate) FROM stock) AND DrugID = ? AND TotalStock > 0";
  db.query(sqlSelect, [drugID], (err, result) => {
    res.send(result);
  });
});

app.post("/api/newissuance", (req, res) => {
  const currenttransID = req.body.currenttransID;
  const patientID = req.body.patientID;
  const patientName = req.body.patientName;
  const drugID = req.body.drugID;
  const drugName = req.body.drugName;
  const quantity = req.body.quantity;
  const total = req.body.total;
  const date = req.body.date;
  const sqlUpdate =
    "INSERT INTO patient_assessment (PatientID, PatientName, DrugID, DrugName, Quantity, Cost, TransactionID, TransactionDate) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlUpdate,
    [
      patientID,
      patientName,
      drugID,
      drugName,
      quantity,
      total,
      currenttransID,
      date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/api/updateissuance", (req, res) => {
  const drugID = req.body.drugID;
  const stock = req.body.stock;
  const quantity = req.body.quantity;
  const sqlUpdate = "UPDATE medicine SET Stock = Stock - ? WHERE DrugID = ?";
  db.query(sqlUpdate, [quantity, drugID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updatepatientissuance", (req, res) => {
  const patientID = req.body.patientID;
  const total = req.body.total;
  const sqlUpdate =
    "UPDATE patient SET Pharmatotal = Pharmatotal + ? WHERE PatientID = ?";
  db.query(sqlUpdate, [total, patientID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updatestockissuance", (req, res) => {
  const stockID = req.body.stockID;
  const quantity = req.body.quantity;
  const sqlUpdate = "UPDATE stock SET TotalStock = TotalStock - ? WHERE StockID = ?";
  db.query(sqlUpdate, [quantity, stockID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//***************************************************************************************************************************************/

app.post("/api/insert", (req, res) => {
  const patientID = req.body.patientID;
  const patientName = req.body.patientName;

  const sqlInsert = "INSERT INTO patient (PatientID, PatientName) VALUES (?,?)";
  db.query(sqlInsert, [patientID, patientName], (err, result) => {});
  console.log(result);
});

app.get("/api/retdrugname", (req, res) => {
  const sqlSelect = "SELECT DrugName FROM `medicine`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/assessmentret", (req, res) => {
  const sqlSelect = "SELECT * FROM `patient_assessment`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/expiredret", (req, res) => {
  const sqlSelect = "SELECT * FROM `stock`";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/expiredret2", (req, res) => {
  const sqlSelect = "SELECT * FROM `stock` WHERE ExpirationDate < DATE(CURRENT_DATE)";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/transactret", (req, res) => {
  const sqlSelect = "SELECT * FROM patient_assessment";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/retexp/", (req, res) => {
  const sqlSelect = "SELECT a.* FROM stock AS a JOIN (SELECT DrugName, Min(StockDate) AS m FROM stock WHERE ExpirationDate > DATE(CURRENT_DATE) AND TotalStock > 0 GROUP BY DrugName) AS b ON ( a.DrugName= b.DrugName AND a.StockDate = b.m ) GROUP BY DrugID;";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    }else{
      res.send(result);
    }   
  });
});

app.put("/api/disposestock", (req, res) => {
  const stockID = req.body.stockID
  const sqlUpdate =
    "UPDATE `stock` SET Pcs = 0, Bundles = 0, Box = 0, TotalStock = 0, Status = 'Disposed' WHERE StockID = ?";
  db.query(
    sqlUpdate,
    [stockID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/api/disposemeds", (req, res) => {
  const drugID = req.body.drugID
  const total = req.body.total
  const sqlUpdate =
    "UPDATE `medicine` SET Stock = Stock - ? WHERE DrugID = ?";
  db.query(
    sqlUpdate,
    [total, drugID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
