const express = require("express");
const routerData = express.Router();

const { findFlightDataMergedNoSQL } = require("../service/flightMergedNoSQL");
const {
  findAllFlightDataNoSQL,
  findFlightDataNoSQLbyId,
} = require("../service/flightDataNoSQL");
const {
  findAllFlightDataSQL,
  findFlightDataSQLbyId,
  insertFlightDataSQL,
  updateFlightDataSQL,
  deleteFlightDataSQL,
} = require("../service/flightDataSQL");

// routerData.get("/getAllFlightData", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     if (req.isSQL) {
//       const result = await findAllFlightDataSQL(); // Panggil fungsi findAllFlightDataSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightDataSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightDataMergedNoSQL(); // Panggil fungsi findAllFlightDataNoSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightDataNoSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// routerData.get("/getFlightDatabyId/:id", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     const flightId = req.params.id;
//     if (req.isSQL) {
//       const result = await findFlightDataSQLbyId(flightId); // Panggil fungsi findFlightDataSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightDataSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightDataNoSQLbyId(flightId); // Panggil fungsi findFlightDataNoSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightDataNoSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error("Error handling SELECT by ID request", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

routerData.post("/insertFlightData", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const dataFlight = req.body;
    const flight = await insertFlightDataSQL(dataFlight); // Panggil fungsi insertFlightDataSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `insertFlightDataSQL diproses dalam ${processingTime} milliseconds`
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

routerData.put("/updateFlightData", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const dataFlight = req.body;
    if (
      !(
        Array.isArray(dataFlight) ||
        dataFlight.id ||
        dataFlight.from_airport_code ||
        dataFlight.from_country ||
        dataFlight.dest_airport_code ||
        dataFlight.dest_country ||
        dataFlight.aircraft_type ||
        dataFlight.airline_name ||
        dataFlight.flight_number ||
        dataFlight.scan_date
      )
    ) {
      console.log("Missing required fields", dataFlight);
      return res.status(400).send("Missing required fields");
    }
    const flight = await updateFlightDataSQL(dataFlight); // Panggil fungsi updateFlightDataSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `updateFlightDataSQL diproses dalam ${processingTime} milliseconds`
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

routerData.delete("/deleteFlightData", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const flightId = req.body;
    if (!Array.isArray(flightId) || flightId.length === 0) {
      return res.status(404).send("Flight data not found");
    }
    const flight = await deleteFlightDataSQL(flightId); // Panggil fungsi deleteFlightDataSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `deleteFlightDataSQL diproses dalam ${processingTime} milliseconds`
    );
    res.status(200).send({
      data: flight.count,
      message: "Flight data deleted successfully",
    });
  } catch (error) {
    console.error("Error handling DELETE request", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router
module.exports = routerData;
