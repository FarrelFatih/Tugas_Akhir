const prisma = require("../connection/SQLDB");

const findAllFlightPriceSQL = async () => {
  try {
    const allFlight = await prisma.FlightPriceSQL.findMany(); // SELECT * FROM FlightPriceSQL
    return allFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findFlightPriceSQLbyId = async (id) => {
  try {
    const flight = await prisma.FlightPriceSQL.findUnique({
      where: {
        id: parseInt(id),
      }, // SELECT * FROM FlightPriceSQL WHERE id = id
    });
    return flight;
  } catch (error) {
    console.error(error);
  }
};

const insertFlightPriceSQL = async (priceFlights) => {
  try {
    const flights = await prisma.FlightPriceSQL.createMany({
      data: priceFlights.map((priceFlight) => ({
        price: priceFlight.price || 0,
        currency: priceFlight.currency || "null",
      })),
    }); // INSERT INTO FlightPriceSQL VALUES dataFlights
    return flights;
  } catch (error) {
    console.error("failed to insert flight data", error);
    throw new Error("Failed to insert flight data");
  }
};

const updateFlightPriceSQL = async (priceFlights) => {
  try {
    const batchSize = 10000; // Ukuran batch dapat disesuaikan
    let totalUpdatedCount = 0;

    for (let i = 0; i < priceFlights.length; i += batchSize) {
      const batch = priceFlights.slice(i, i + batchSize);
      const updatePromises = batch.map((priceFlight) => {
        return prisma.FlightPriceSQL.update({
          where: {
            id: parseInt(priceFlight.id),
          },
          data: {
            price: priceFlight.price || 0,
            currency: priceFlight.currency || "null",
          },
        });
      });

      const result = await Promise.all(updatePromises);
      totalUpdatedCount += result.length;
    }

    return totalUpdatedCount;
  } catch (error) {
    console.error("failed to update many flight data", error);
    throw new Error("Failed to update many flight data");
  }
};

const deleteFlightPriceSQL = async (ids) => {
  try {
    const batchSize = 10000; // Ukuran batch dapat disesuaikan
    let totalDeleted = 0;

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      const result = await prisma.FlightPriceSQL.deleteMany({
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

// const updateFlightPriceSQL = async (id, priceFlight) => {
//   try {
//     const flight = await prisma.FlightPriceSQL.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         price: priceFlight.price || 0,
//         currency: priceFlight.currency || "null",
//       },
//     }); // UPDATE FlightPriceSQL SET data WHERE id = id VALUES dataFlight
//     return flight;
//   } catch (error) {
//     console.error("failed to update flight data", error);
//     throw new Error("Failed to update flight data");
//   }
// };

// const deleteFlightPriceSQL = async (id) => {
//   try {
//     const flight = await prisma.FlightPriceSQL.delete({
//       where: {
//         id: parseInt(id),
//       },
//     }); // DELETE FROM FlightPriceSQL WHERE id = id
//     return flight;
//   } catch (error) {
//     console.error("failed to delete flight data", error);
//     throw new Error("Failed to delete flight data");
//   }
// };

// Export the functions
module.exports = {
  findAllFlightPriceSQL,
  findFlightPriceSQLbyId,
  insertFlightPriceSQL,
  updateFlightPriceSQL,
  deleteFlightPriceSQL,
};
