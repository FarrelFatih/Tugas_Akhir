const express = require("express");
const routerInformation = express.Router();

const {
  findFlightInformationByPriceNoSQL,
} = require("../service/flightMergedNoSQL");

const {
  findFlightInformationByPriceSQL,
} = require("../service/informationServiceSQL");

routerInformation.get("/getFlightInfoByPrice", async (req, res) => {
  const startTime = Date.now(); // Mulai pencatatan waktu
  try {
    const price = req.query.price;
    if (req.isSQL) {
      const result = await findFlightInformationByPriceSQL(price); // Panggil fungsi findFlightInformationByPriceSQL
      const endTime = Date.now(); // Akhiri pencatatan waktu
      const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
      console.log(
        `findFlightInformationByPriceSQL diproses dalam ${processingTime} milliseconds`
      ); // Cetak waktu proses
      res.status(200).json(result);
      // await FlightInformationNoSQL.insertMany(result);
    } else {
      const result = await findFlightInformationByPriceNoSQL(price); // Panggil fungsi findFlightInformationByPriceNoSQL
      const endTime = Date.now(); // Akhiri pencatatan waktu
      const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
      console.log(
        `findFlightInformationByPriceNoSQL diproses dalam ${processingTime} milliseconds`
      ); // Cetak waktu proses
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router
module.exports = routerInformation;
