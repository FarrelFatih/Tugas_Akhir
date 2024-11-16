const { FlightPriceNoSQL } = require("../model/noSQLModel");

const findAllFlightPriceNoSQL = async () => {
  try {
    const allFlight = await FlightPriceNoSQL.find({}).lean(); // db.flightPriceNoSQL.find()
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightPriceNoSQLbyId = async (priceId) => {
  try {
    const flight = await FlightPriceNoSQL.findOne({ _id: priceId }); // db.flightPriceNoSQL.findOne({ _id})
    return flight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Export the functions
module.exports = {
  findAllFlightPriceNoSQL,
  findFlightPriceNoSQLbyId,
};
