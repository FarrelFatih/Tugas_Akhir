const { findAllFlightDataSQL } = require("../service/flightDataSQL");
const { FlightDataNoSQL } = require("../model/noSQLModel");

const initDataFlightData = async () => {
  try {
    const allFlightData = await findAllFlightDataSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightData.map((flightData) => {
      return {
        _id: flightData.id,
        from_airport_code: flightData.from_airport_code,
        from_country: flightData.from_country,
        dest_airport_code: flightData.dest_airport_code,
        dest_country: flightData.dest_country,
        aircraft_type: flightData.aircraft_type,
        airline_name: flightData.airline_name,
        flight_number: flightData.flight_number,
        scan_date: flightData.scan_date,
        flightPriceId: flightData.flightPriceSQLId,
        flightEmissionId: flightData.flightPriceSQLId,
      };
    });

    // Membandingkan nilai unik dari id yang ada di MongoDB dengan mappedData
    const existingIds = await FlightDataNoSQL.find({
      _id: { $in: mappedData.map((data) => data._id) },
    })
      .lean()
      .distinct("_id");

    // Filter data yang belum ada di MongoDB dari data yang sudah diambil dari mappedData
    const newData = mappedData.filter(
      (data) => !existingIds.includes(data._id)
    );

    // Insert data baru ke MongoDB dengan data yang sudah difilter
    await FlightDataNoSQL.insertMany(newData);

    console.log("Flight data initialized successfully.");
  } catch (error) {
    console.error("Error initializing flight data:", error);
  }
};

const syncDataFlightData = async () => {
  try {
    const allFlightData = await findAllFlightDataSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightData.map((flightData) => {
      return {
        _id: flightData.id,
        from_airport_code: flightData.from_airport_code,
        from_country: flightData.from_country,
        dest_airport_code: flightData.dest_airport_code,
        dest_country: flightData.dest_country,
        aircraft_type: flightData.aircraft_type,
        airline_name: flightData.airline_name,
        flight_number: flightData.flight_number,
        scan_date: flightData.scan_date,
        flightPriceId: flightData.flightPriceSQLId,
        flightEmissionId: flightData.flightPriceSQLId,
      };
    });

    // Dapatkan semua _id yang ada di mappedData
    const mongoIds = mappedData.map((data) => data._id);

    // Dapatkan semua _id yang ada di MongoDB dan tidak ada di PostgreSQL
    const idsToDelete = await FlightDataNoSQL.find({
      _id: { $nin: mongoIds },
    })
      .lean()
      .distinct("_id");

    // Hapus dokumen yang tidak ada lagi di PostgreSQL
    await FlightDataNoSQL.deleteMany({ _id: { $in: idsToDelete } });

    // Simpan atau perbarui data di MongoDB
    await FlightDataNoSQL.bulkWrite(
      mappedData.map((data) => ({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data },
          upsert: true, // Tambahkan jika tidak ditemukan
        },
      }))
    );
    console.log("Flight data synced successfully.");
  } catch (error) {
    console.error("Error syncing flight data:", error);
  }
};

module.exports = { initDataFlightData, syncDataFlightData };
