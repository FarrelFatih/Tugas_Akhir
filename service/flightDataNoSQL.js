const { FlightDataNoSQL } = require("../model/noSQLModel");

const findAllFlightDataNoSQL = async () => {
  try {
    const allFlight = await FlightDataNoSQL.find({}).lean(); // db.flightDataNoSQL.find({_idData: true})
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightDataNoSQLbyId = async (flightId) => {
  try {
    const flight = await FlightDataNoSQL.findOne({ _id: flightId }).lean(); // db.flightDataNoSQL.findOne({ _idData})
    return flight;
  } catch (error) {
    console.error(error);
  }
};

// Export the functions
module.exports = {
  findAllFlightDataNoSQL,
  findFlightDataNoSQLbyId,
};
