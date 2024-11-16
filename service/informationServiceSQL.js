const prisma = require("../connection/SQLDB");

const findFlightInformationByPriceSQL = async (price) => {
  try {
    const result = await prisma.FlightPriceSQL.findMany({
      where: {
        price: parseInt(price),
      },
      select: {
        price: true,
        currency: true,
        FlightDataSQL: {
          select: {
            airline_name: true,
            flight_number: true,
            from_country: true,
            dest_country: true,
            FlightEmissionSQL: {
              select: {
                co2_emissions: true,
                co2_percentage: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findFlightInformationByPriceSQL,
};

// SQL Query:
// findFlightInformationBasePrice
// SELECT
//   fp.price,
//   fd.airline_name,
//   fd.flight_number,
//   fe.co2_emissions
// FROM
//   FlightPriceSQL fp
// JOIN
//   FlightDataSQL fd ON fp.id = fd.flightPriceSQLId
// JOIN
//   FlightEmissionSQL fe ON fd.id = fe.flightDataSQLId
// WHERE
//   fp.price = value;
