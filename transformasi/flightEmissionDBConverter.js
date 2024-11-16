const { findAllFlightEmissionSQL } = require("../service/flightEmissionSQL");
const { FlightEmissionNoSQL } = require("../model/noSQLModel");

const initDataFlightEmission = async () => {
  try {
    const allFlightEmission = await findAllFlightEmissionSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightEmission.map((flightEmission) => {
      return {
        _id: flightEmission.id,
        co2_emissions: flightEmission.co2_emissions,
        avg_co2_emission_for_this_route:
          flightEmission.avg_co2_emission_for_this_route,
        co2_percentage: flightEmission.co2_percentage,
        flightDataId: flightEmission.flightDataSQLId,
      };
    });

    // Membandingkan nilai unik dari _id yang ada di MongoDB dengan mappedData
    const existingIds = await FlightEmissionNoSQL.find({
      _id: { $in: mappedData.map((data) => data._id) },
    })
      .lean()
      .distinct("_id");

    // Filter data yang belum ada di MongoDB dari data yang sudah diambil dari mappedData
    const newData = mappedData.filter(
      (data) => !existingIds.includes(data._id)
    );

    // Insert data baru ke MongoDB dengan data yang sudah difilter
    await FlightEmissionNoSQL.insertMany(newData);

    console.log("Emission data initialized successfully.");
  } catch (error) {
    console.error("Error initializing emission data:", error);
  }
};

const syncDataFlightEmission = async () => {
  try {
    const allFlightEmission = await findAllFlightEmissionSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightEmission.map((flightEmission) => {
      return {
        _id: flightEmission.id,
        co2_emissions: flightEmission.co2_emissions,
        avg_co2_emission_for_this_route:
          flightEmission.avg_co2_emission_for_this_route,
        co2_percentage: flightEmission.co2_percentage,
        flightDataId: flightEmission.flightDataSQLId,
      };
    });

    // Dapatkan semua _id yang ada di mappedData
    const mongoIds = mappedData.map((data) => data._id);

    // Dapatkan semua _id yang ada di MongoDB dan tidak ada di PostgreSQL
    const idsToDelete = await FlightEmissionNoSQL.find({
      _id: { $nin: mongoIds },
    })
      .lean()
      .distinct("_id");

    // Hapus dokumen yang tidak ada lagi di PostgreSQL
    await FlightEmissionNoSQL.deleteMany({ _id: { $in: idsToDelete } });

    // Simpan atau perbarui data di MongoDB
    await FlightEmissionNoSQL.bulkWrite(
      mappedData.map((data) => ({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data },
          upsert: true, // Tambahkan jika tidak ditemukan
        },
      }))
    );

    console.log("Emission data synced successfully.");
  } catch (error) {
    console.error("Error syncing emission data:", error);
  }
};

module.exports = { initDataFlightEmission, syncDataFlightEmission };
