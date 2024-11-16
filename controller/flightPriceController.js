const express = require("express");
const routerPrice = express.Router();

const {
  insertFlightPriceSQL,
  updateFlightPriceSQL,
  deleteFlightPriceSQL,
} = require("../service/flightPriceSQL");

// routerPrice.get("/getAllFlightPrice", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     if (req.isSQL) {
//       const result = await findAllFlightPriceSQL(); // Panggil fungsi findAllFlightPriceSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightPriceSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightPriceMergedNoSQL(); // Panggil fungsi findAllFlightPriceNoSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightPriceNoSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// routerPrice.get("/getFlightPricebyId/:id", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     const flightId = req.params.id;
//     if (req.isSQL) {
//       const result = await findFlightPriceSQLbyId(flightId); // Panggil fungsi findFlightPriceSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightPriceSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightPriceNoSQLbyId(flightId); // Panggil fungsi findFlightPriceNoSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightPriceNoSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error("Error handling SELECT by ID request", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

routerPrice.post("/insertFlightPrice", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const dataFlight = req.body;
    const flight = await insertFlightPriceSQL(dataFlight); // Panggil fungsi insertFlightPriceSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `insertFlightPriceSQL diproses dalam ${processingTime} milliseconds`
    ); // Cetak waktu proses
    res.status(201).send({
      data: flight,
      message: "Flight data inserted successfully",
    });
  } catch (error) {
    console.error("Error handling INSERT request", error);
    res.status(500).send("Internal Server Error");
  }
});

routerPrice.put("/updateFlightPrice", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const priceFlight = req.body;
    if (
      !(
        Array.isArray(priceFlight) ||
        priceFlight.id ||
        priceFlight.price ||
        priceFlight.currency
      )
    ) {
      console.log("Missing required fields", priceFlight);
      return res.status(400).send("Missing required fields");
    }

    const flight = await updateFlightPriceSQL(priceFlight); // Panggil fungsi updateFlightPriceSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `updateFlightPriceSQL diproses dalam ${processingTime} milliseconds`
    ); // Cetak waktu proses
    res.status(200).send({
      data: flight,
      message: "Flight data updated successfully",
    });
  } catch (error) {
    console.error("Error handling UPDATE request", error);
    res.status(500).send("Internal Server Error");
  }
});

routerPrice.delete("/deleteFlightPrice", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const flightId = req.body;
    if (!Array.isArray(flightId) || flightId.length === 0) {
      return res.status(404).send("Missing required fields");
    }
    const flight = await deleteFlightPriceSQL(flightId); // Panggil fungsi deleteFlightPriceSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `deleteFlightPriceSQL diproses dalam ${processingTime} milliseconds`
    );
    res.status(200).send({
      data: flight,
      message: "Flight data deleted successfully",
    });
  } catch (error) {
    console.error("Error handling DELETE request", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router
module.exports = routerPrice;
