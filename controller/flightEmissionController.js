const express = require("express");
const routerEmission = express.Router();

const {
  insertFlightEmissionSQL,
  updateFlightEmissionSQL,
  deleteFlightEmissionSQL,
} = require("../service/flightEmissionSQL");

// routerEmission.get("/getAllFlightEmission", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     if (req.isSQL) {
//       const result = await findAllFlightEmissionSQL(); // Panggil fungsi findAllFlightEmissionSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightEmissionSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightEmissionMergedNoSQL(); // Panggil fungsi findAllFlightEmissionNoSQL
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findAllFlightEmissionNoSQL diproses dalam ${processingTime} milliseconds`
//       ); // Cetak waktu proses
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// routerEmission.get("/getFlightEmissionbyId/:id", async (req, res) => {
//   const startTime = Date.now(); // Mulai pencatatan waktu
//   try {
//     const flightId = req.params.id;
//     if (req.isSQL) {
//       const result = await findFlightEmissionSQLbyId(flightId); // Panggil fungsi findFlightEmissionSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightEmissionSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     } else {
//       const result = await findFlightEmissionNoSQLbyId(flightId); // Panggil fungsi findFlightEmissionNoSQLbyId
//       const endTime = Date.now(); // Akhiri pencatatan waktu
//       const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
//       console.log(
//         `findFlightEmissionNoSQLbyId diproses dalam ${processingTime} milliseconds`
//       );
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error("Error handling SELECT by ID request", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

routerEmission.post("/insertFlightEmission", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const dataFlight = req.body;
    const flight = await insertFlightEmissionSQL(dataFlight); // Panggil fungsi insertFlightEmissionSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `insertFlightEmissionSQL diproses dalam ${processingTime} milliseconds`
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

routerEmission.put("/updateFlightEmission", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const dataFlight = req.body;
    if (
      !(
        Array.isArray(dataFlight) ||
        dataFlight.id ||
        dataFlight.co2_emissions ||
        dataFlight.avg_co2_emission_for_this_route ||
        dataFlight.co2_percentage
      )
    ) {
      console.log("Missing required fields", dataFlight);
      return res.status(400).send("Missing required fields");
    }
    const flight = await updateFlightEmissionSQL(dataFlight); // Panggil fungsi updateFlightEmissionSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `updateFlightEmissionSQL diproses dalam ${processingTime} milliseconds`
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

routerEmission.delete("/deleteFlightEmission", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const flightId = req.body;
    if (!Array.isArray(flightId) || flightId.length === 0) {
      return res.status(404).send("Flight data not found");
    }
    const flight = await deleteFlightEmissionSQL(flightId); // Panggil fungsi deleteFlightEmissionSQL
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(
      `deleteFlightEmissionSQL diproses dalam ${processingTime} milliseconds`
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
module.exports = routerEmission;
