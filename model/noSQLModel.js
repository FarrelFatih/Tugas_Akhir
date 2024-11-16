const mongoose = require("mongoose");
const { mongooseConnect } = require("../connection/NoSQLDB");

mongooseConnect;

const FlightPriceSchema = new mongoose.Schema(
  {
    _id: { type: Number, unique: false },
    price: { type: Number, unique: false },
    currency: { type: String, unique: false },
  },
  { _id: false, autoCreate: false, collection: "FlightPriceNoSQL" }
);

const FlightPriceNoSQL = mongoose.model("FlightPriceNoSQL", FlightPriceSchema);

const FlightDataSchema = new mongoose.Schema(
  {
    _id: { type: Number, unique: false },
    from_airport_code: { type: String, unique: false },
    from_country: { type: String, unique: false },
    dest_airport_code: { type: String, unique: false },
    dest_country: { type: String, unique: false },
    aircraft_type: { type: String, unique: false },
    airline_name: { type: String, unique: false },
    flight_number: { type: String, unique: false },
    scan_date: { type: String, unique: false },
    flightPriceId: { type: Number, unique: false },
  },
  {
    _id: false,
    autoCreate: false,
    collection: "FlightDataNoSQL",
  }
);

const FlightDataNoSQL = mongoose.model("FlightDataNoSQL", FlightDataSchema);

const FlightEmissionSchema = new mongoose.Schema(
  {
    _id: { type: Number, unique: false },
    co2_emissions: { type: Number, unique: false },
    avg_co2_emission_for_this_route: { type: Number, unique: false },
    co2_percentage: { type: String, unique: false },
    flightDataId: { type: Number, unique: false },
    update_at: { type: String, unique: false },
  },
  { _id: false, autoCreate: false, collection: "FlightEmissionNoSQL" }
);

const FlightEmissionNoSQL = mongoose.model(
  "FlightEmissionNoSQL",
  FlightEmissionSchema
);

const FlightMergedSchema = new mongoose.Schema(
  {
    _id: { type: Number, unique: false },
    price: { type: Number, unique: false },
    currency: { type: String, unique: false },
    flight_data: { type: mongoose.Schema.Types.Mixed, unique: false },
  },
  { _id: false, autoCreate: false, collection: "FlightMergedNoSQL" }
);

const FlightMergedNoSQL = mongoose.model(
  "FlightMergedNoSQL",
  FlightMergedSchema
);

module.exports = {
  FlightDataNoSQL,
  FlightPriceNoSQL,
  FlightEmissionNoSQL,
  FlightMergedNoSQL,
};
