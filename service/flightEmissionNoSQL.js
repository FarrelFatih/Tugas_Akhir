const { FlightEmissionNoSQL } = require("../model/noSQLModel");

const findAllFlightEmissionNoSQL = async () => {
  try {
    const allFlight = await FlightEmissionNoSQL.find({}).lean(); // db.flightEmissionNoSQL.find()
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightEmissionNoSQLbyId = async (emissionId) => {
  try {
    const flight = await FlightEmissionNoSQL.findOne({
      _id: emissionId,
    }); // db.flightEmissionNoSQL.findOne({ _id})
    return flight;
  } catch (error) {
    console.error(error);
  }
};

// Export the functions
module.exports = {
  findAllFlightEmissionNoSQL,
  findFlightEmissionNoSQLbyId,
};
