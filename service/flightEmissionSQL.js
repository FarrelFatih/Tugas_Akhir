const prisma = require("../connection/SQLDB");

const findAllFlightEmissionSQL = async () => {
  try {
    const allFlight = await prisma.FlightEmissionSQL.findMany(); // SELECT * FROM FlightEmissionSQL
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightEmissionSQLbyId = async (id) => {
  try {
    const flight = await prisma.FlightEmissionSQL.findUnique({
      where: {
        id: parseInt(id),
      }, // SELECT * FROM FlightEmissionSQL WHERE id = id
    });
    return flight;
  } catch (error) {
    console.error(error);
  }
};

const insertFlightEmissionSQL = async (emissionFlights) => {
  try {
    const flights = await prisma.FlightEmissionSQL.createMany({
      data: emissionFlights.map((emissionFligth) => ({
        co2_emissions: emissionFligth.co2_emissions || 0,
        avg_co2_emission_for_this_route:
          emissionFligth.avg_co2_emission_for_this_route || 0,
        co2_percentage: emissionFligth.co2_percentage || "null",
        flightDataSQLId: emissionFligth.flightDataSQLId || 0,
      })),
    }); // INSERT INTO FlightEmissionSQL VALUES dataFlights
    return flights;
  } catch (error) {
    console.error("failed to insert flight data", error);
    throw new Error("Failed to insert flight data");
  }
};

const updateFlightEmissionSQL = async (emissionFligths) => {
  try {
    const batchSize = 10000; // Ukuran batch dapat disesuaikan
    let totalUpdatedCount = 0;
    for (let i = 0; i < emissionFligths.length; i += batchSize) {
      const batch = emissionFligths.slice(i, i + batchSize);
      const updatePromises = batch.map((emissionFligth) => {
        return prisma.FlightEmissionSQL.update({
          where: {
            id: parseInt(emissionFligth.id),
          },
          data: {
            co2_emissions: emissionFligth.co2_emissions || 0,
            avg_co2_emission_for_this_route:
              emissionFligth.avg_co2_emission_for_this_route || 0,
            co2_percentage: emissionFligth.co2_percentage || "null",
            flightDataSQLId: emissionFligth.flightDataSQLId || 0,
          },
        });
      });

      const result = await Promise.all(updatePromises);
      totalUpdatedCount += result.length;
    }

    return totalUpdatedCount;

    // const updatePromises = emissionFligths.map(async (emissionFligth) => {
    //   return prisma.FlightEmissionSQL.update({
    //     where: {
    //       id: parseInt(emissionFligth.id),
    //     },
    //     data: {
    //       co2_emissions: emissionFligth.co2_emissions || 0,
    //       avg_co2_emission_for_this_route:
    //         emissionFligth.avg_co2_emission_for_this_route || 0,
    //       co2_percentage: emissionFligth.co2_percentage || "null",
    //       flightDataSQLId: emissionFligth.flightDataSQLId || 0,
    //     },
    //   });
    // }); // UPDATE FlightEmissionSQL SET data WHERE id = id VALUES emissionFligth

    // const updatedFlights = await Promise.all(updatePromises);
    // return updatedFlights;
  } catch (error) {
    console.error("failed to update flight data", error);
    throw new Error("Failed to update flight data");
  }
};

const deleteFlightEmissionSQL = async (ids) => {
  try {
    const batchSize = 10000; // Ukuran batch dapat disesuaikan
    let totalDeleted = 0;

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      const result = await prisma.FlightEmissionSQL.deleteMany({
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
  findAllFlightEmissionSQL,
  findFlightEmissionSQLbyId,
  insertFlightEmissionSQL,
  updateFlightEmissionSQL,
  deleteFlightEmissionSQL,
};
