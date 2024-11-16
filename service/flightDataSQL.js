const prisma = require("../connection/SQLDB");

const findAllFlightDataSQL = async () => {
  try {
    const allFlight = await prisma.FlightDataSQL.findMany(); // SELECT * FROM FlightDataSQL
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightDataSQLbyId = async (id) => {
  try {
    const flight = await prisma.FlightDataSQL.findUnique({
      where: {
        id: parseInt(id),
      }, // SELECT * FROM FlightDataSQL WHERE id = id
    });
    return flight;
  } catch (error) {
    console.error(error);
  }
};

const insertFlightDataSQL = async (dataFlights) => {
  try {
    const flights = await prisma.FlightDataSQL.createMany({
      data: dataFlights.map((dataFlight) => ({
        from_airport_code: dataFlight.from_airport_code || null,
        from_country: dataFlight.from_country || null,
        dest_airport_code: dataFlight.dest_airport_code || null,
        dest_country: dataFlight.dest_country || null,
        aircraft_type: dataFlight.aircraft_type || null,
        airline_name: dataFlight.airline_name || null,
        flight_number: dataFlight.flight_number || null,
        scan_date: dataFlight.scan_date || null,
        flightPriceSQLId: dataFlight.flightPriceSQLId || null,
      })),
    }); // INSERT INTO FlightDataSQL VALUES dataFlights
    return flights;
  } catch (error) {
    console.error("failed to insert flight data", error);
    throw new Error("Failed to insert flight data");
  }
};

const updateFlightDataSQL = async (dataFlights) => {
  try {
    const updatePromises = dataFlights.map(async (dataFlight) => {
      return prisma.FlightDataSQL.update({
        where: {
          id: parseInt(dataFlight.id),
        },
        data: {
          from_airport_code: dataFlight.from_airport_code || "null",
          from_country: dataFlight.from_country || "null",
          dest_airport_code: dataFlight.dest_airport_code || "null",
          dest_country: dataFlight.dest_country || "null",
          aircraft_type: dataFlight.aircraft_type || "null",
          airline_name: dataFlight.airline_name || "null",
          flight_number: dataFlight.flight_number || "null",
          scan_date: dataFlight.scan_date || "null",
          flightPriceSQLId: dataFlight.flightPriceSQLId || 0,
        },
      });
    }); // UPDATE FlightDataSQL SET data WHERE id = id VALUES dataFlight

    const updatedFlights = await Promise.all(updatePromises);
    return updatedFlights;
  } catch (error) {
    console.error("failed to update flight data", error);
    throw new Error("Failed to update flight data");
  }
};

const deleteFlightDataSQL = async (ids) => {
  try {
    const batchSize = 10000; // Ukuran batch dapat disesuaikan
    let totalDeleted = 0;

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      const result = await prisma.FlightDataSQL.deleteMany({
        where: {
          id: {
            in: batch.map((id) => parseInt(id)),
          },
        },
      });

      totalDeleted += result.count;
    }

    return { count: totalDeleted };
  } catch (error) {
    console.error("failed to delete flight data", error);
    throw new Error("Failed to delete flight data");
  }
};

// Export the functions
module.exports = {
  findAllFlightDataSQL,
  findFlightDataSQLbyId,
  insertFlightDataSQL,
  updateFlightDataSQL,
  deleteFlightDataSQL,
};
