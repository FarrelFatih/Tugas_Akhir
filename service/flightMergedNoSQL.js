const { FlightMergedNoSQL } = require("../model/noSQLModel");

// const findFlightPriceMergedNoSQL = async () => {
//   try {
//     const result = await FlightMergedNoSQL.find(
//       {},
//       {
//         price: 1,
//         currency: 1,
//       }
//     ).lean();
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const findFlightDataMergedNoSQL = async () => {
//   try {
//     const result = await FlightMergedNoSQL.find(
//       {},
//       {
//         _id: 0,
//         price: 0,
//         currency: 0,
//         __v: 0,
//         "flight_data.emissions": 0,
//       }
//     ).lean();
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const findFlightEmissionMergedNoSQL = async () => {
//   try {
//     const result = await FlightMergedNoSQL.find(
//       {},
//       {
//         _id: 0,
//         "flight_data.emissions.co2_emissions": 1,
//         "flight_data.emissions.co2_percentage": 1,
//         "flight_data.emissions.avg_co2_emission_for_this_route": 1,
//       }
//     ).lean();
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

const findFlightInformationByPriceNoSQL = async (price) => {
  try {
    const result = await FlightMergedNoSQL.find(
      {
        price: parseInt(price),
      },
      {
        price: 1,
        currency: 1,
        "flight_data.airline_name": 1,
        "flight_data.flight_number": 1,
        "flight_data.from_country": 1,
        "flight_data.dest_country": 1,
        "flight_data.emissions.co2_emissions": 1,
        "flight_data.emissions.co2_percentage": 1,
      }
    ).lean();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const insertFlightMergedNoSQL = async (mergedFlights) => {
//   try {
//     const flights = await FlightPriceNoSQL.insertMany({
//       data: mergedFlights.map((mergedFlight) => ({
//         price: mergedFlight.price,
//         currency: mergedFlight.currency,
//         flight_data: mergedFlight.flight_data,
//       })),
//     }); // INSERT INTO FlightDataSQL VALUES dataFlights
//     return flights;
//   } catch (error) {
//     console.error("failed to insert flight data", error);
//     throw new Error("Failed to insert flight data");
//   }
// };

// const insertFlightPriceNoSQL = async (flightPrices) => {
//   try {
//     const flights = await FlightPriceNoSQL.insertMany({
//       data: flightPrices.map((flightPrice) => ({
//         price: flightPrice.price,
//         currency: flightPrice.currency,
//       })),
//     }); // INSERT INTO FlightDataSQL VALUES dataFlights
//     return flights;
//   } catch (error) {
//     console.error("failed to insert flight data", error);
//     throw new Error("Failed to insert flight data");
//   }
// };

// const insertFlightDataNoSQL = async (dataFlights) => {
//   try {
//     const flights = await FlightDataNoSQL.insertMany({
//       data: dataFlights.map((dataFlight) => ({
//         from_airport_code: dataFlight.from_airport_code,
//         from_country: dataFlight.from_country,
//         dest_airport_code: dataFlight.dest_airport_code,
//         dest_country: dataFlight.dest_country,
//         aircraft_type: dataFlight.aircraft_type,
//         airline_name: dataFlight.airline_name,
//         flight_number: dataFlight.flight_number,
//         scan_date: dataFlight.scan_date,
//         flightPriceId: dataFlight.flightPriceId,
//       })),
//     }); // INSERT INTO FlightDataSQL VALUES dataFlights
//     return flights;
//   } catch (error) {
//     console.error("failed to insert flight data", error);
//     throw new Error("Failed to insert flight data");
//   }
// };

// const insertFlightEmissionNoSQL = async (emissionFLights) => {
//   try {
//     const flights = await FlightEmissionNoSQL.insertMany({
//       data: emissionFLights.map((emissionFLight) => ({
//         co2_emissions: emissionFLight.co2_emissions,
//         avg_co2_emission_for_this_route:
//           emissionFLight.avg_co2_emission_for_this_route,
//         co2_percentage: emissionFLight.co2_percentage,
//         flightDataId: emissionFLight.flightDataId,
//       })),
//     }); // INSERT INTO FlightDataSQL VALUES dataFlights
//     return flights;
//   } catch (error) {
//     console.error("failed to insert flight data", error);
//     throw new Error("Failed to insert flight data");
//   }
// };

module.exports = {
  findFlightInformationByPriceNoSQL,
};

// const findFlightInformationByPriceNoSQL = async (price) => {
//   try {
//     const result = await FlightPriceNoSQL.aggregate([
//       {
//         $match: {
//           price: parseInt(price),
//         },
//       },
//       {
//         $lookup: {
//           from: "FlightDataNoSQL",
//           localField: "_id",
//           foreignField: "flightPriceId",
//           as: "flightData",
//         },
//       },
//       {
//         $unwind: {
//           path: "$flightData",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $lookup: {
//           from: "FlightEmissionNoSQL",
//           localField: "flightData._id",
//           foreignField: "flightDataId",
//           as: "flightEmission",
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           price: 1,
//           currency: 1,
//           flightData: {
//             airline_name: "$flightData.airline_name",
//             flight_number: "$flightData.flight_number",
//             from_country: "$flightData.from_country",
//             dest_country: "$flightData.dest_country",
//             flightEmission: {
//               co2_emissions: {
//                 $arrayElemAt: ["$flightEmission.co2_emissions", 0],
//               },
//               co2_percentage: {
//                 $arrayElemAt: ["$flightEmission.co2_percentage", 0],
//               },
//             },
//           },
//         },
//       },
//     ]);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// NoSQL Query:
// findFlightInformationBasePrice
// db.FlightPriceNoSQL.aggregate([
//     {
//       $match: {
//         price: parseInt(price),
//       },
//     },
//     {
//       $lookup: {
//         from: "FlightDataNoSQL",
//         localField: "_id",
//         foreignField: "flightPriceId",
//         as: "flightData",
//       },
//     },
//     {
//       $unwind: {
//         path: "$flightData",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $lookup: {
//         from: "FlightEmissionNoSQL",
//         localField: "flightData._id",
//         foreignField: "flightDataId",
//         as: "flightEmission",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         price: 1,
//         currency: 1,
//         flightData: {
//           airline_name: "$flightData.airline_name",
//           flight_number: "$flightData.flight_number",
//           from_country: "$flightData.from_country",
//           dest_country: "$flightData.dest_country",
//           flightEmission: {
//             co2_emissions: {
//               $arrayElemAt: ["$flightEmission.co2_emissions", 0],
//             },
//             co2_percentage: {
//               $arrayElemAt: ["$flightEmission.co2_percentage", 0],
//             },
//           },
//         },
//       },
//     },
//   ]);
