const { findAllFlightPriceSQL } = require("../service/flightPriceSQL");
const { FlightPriceNoSQL } = require("../model/noSQLModel");

const initDataFlightPrice = async () => {
  try {
    const allFlightPrice = await findAllFlightPriceSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightPrice.map((flightPrice) => {
      return {
        _id: flightPrice.id,
        price: flightPrice.price,
        currency: flightPrice.currency,
      };
    });

    // Membandingkan nilai unik dari _id yang ada di MongoDB dengan mappedData
    const existingIds = await FlightPriceNoSQL.find({
      _id: { $in: mappedData.map((data) => data._id) },
    })
      .lean()
      .distinct("_id");

    // Filter data yang belum ada di MongoDB dari data yang sudah diambil dari mappedData
    const newData = mappedData.filter(
      (data) => !existingIds.includes(data._id)
    );

    // Insert data baru ke MongoDB dengan data yang sudah difilter
    await FlightPriceNoSQL.insertMany(newData);

    console.log("Price data initialized successfully.");
  } catch (error) {
    console.error("Error initializing Price data:", error);
  }
};

const syncDataFlightPrice = async () => {
  try {
    const allFlightPrice = await findAllFlightPriceSQL(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightPrice.map((flightPrice) => {
      return {
        _id: flightPrice.id,
        price: flightPrice.price,
        currency: flightPrice.currency,
      };
    });

    // Dapatkan semua _id yang ada di mappedData
    const mongoIds = mappedData.map((data) => data._id);

    // Dapatkan semua _id yang ada di MongoDB dan tidak ada di PostgreSQL
    const idsToDelete = await FlightPriceNoSQL.find({
      _id: { $nin: mongoIds },
    })
      .lean()
      .distinct("_id");

    // Hapus dokumen yang tidak ada lagi di PostgreSQL
    await FlightPriceNoSQL.deleteMany({ _id: { $in: idsToDelete } });

    // Simpan atau perbarui data di MongoDB
    await FlightPriceNoSQL.bulkWrite(
      mappedData.map((data) => ({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data },
          upsert: true, // Tambahkan jika tidak ditemukan
        },
      }))
    );

    console.log("Price data synced successfully.");
  } catch (error) {
    console.error("Error syncing Price data:", error);
  }
};

module.exports = { initDataFlightPrice, syncDataFlightPrice };
