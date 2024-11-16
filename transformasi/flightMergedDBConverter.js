const prisma = require("../connection/SQLDB");
const { FlightMergedNoSQL } = require("../model/noSQLModel");

const initDataFlightMerged = async () => {
  try {
    const allFlightMerged = await prisma.FlightMergedSQL.findMany(); // Ambil semua data dari PostgreSQL

    // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
    const mappedData = allFlightMerged.map((flightmerged) => {
      return {
        _id: flightmerged.id,
        price: flightmerged.price,
        currency: flightmerged.currency,
        flight_data: flightmerged.flight_data,
      };
    });

    // Membandingkan nilai unik dari _id yang ada di MongoDB dengan mappedData
    const existingIds = await FlightMergedNoSQL.find({
      _id: { $in: mappedData.map((data) => data._id) },
    })
      .lean()
      .distinct("_id");

    // Filter data yang belum ada di MongoDB dari data yang sudah diambil dari mappedData
    const newData = mappedData.filter(
      (data) => !existingIds.includes(data._id)
    );

    // Insert data baru ke MongoDB dengan data yang sudah difilter
    await FlightMergedNoSQL.insertMany(newData);

    console.log("Merged data initialized successfully.");
  } catch (error) {
    console.error("Error initializing Merged data:", error);
  }
};

const syncDataFlightMerged = async () => {
  try {
    // Get the last synchronization time
    const lastSyncRecord = await prisma.syncTimeSQL.findFirst({
      orderBy: { lastSync: "desc" },
    });
    const lastSync = lastSyncRecord ? lastSyncRecord.lastSync : new Date(0); // If no sync time found, default to epoch

    // Fetch only the updated records from PostgreSQL
    const updatedFlightMerged = await prisma.FlightMergedSQL.findMany({
      where: {
        updateAt: {
          gt: lastSync,
        },
      },
    });

    // Transform data from PostgreSQL to the format suitable for MongoDB
    const mappedData = updatedFlightMerged.map((flightMerged) => ({
      _id: flightMerged.id,
      price: flightMerged.price,
      currency: flightMerged.currency,
      flight_data: flightMerged.flight_data,
    }));

    // Get all _id present in mappedData
    const mongoIds = mappedData.map((data) => data._id);

    // Get all _id present in MongoDB but not in PostgreSQL
    const idsToDelete = await FlightMergedNoSQL.find({
      _id: { $nin: mongoIds },
    })
      .lean()
      .distinct("_id");

    // Delete documents no longer present in PostgreSQL
    await FlightMergedNoSQL.deleteMany({ _id: { $in: idsToDelete } });

    // Save or update data in MongoDB
    await FlightMergedNoSQL.bulkWrite(
      mappedData.map((data) => ({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data },
          upsert: true, // Add if not found
        },
      }))
    );

    // Update the synchronization time
    await prisma.syncTimeSQL.create({
      data: {
        lastSync: new Date(),
      },
    });

    console.log("Merged data synced successfully.");
  } catch (error) {
    console.error("Error syncing Merged data:", error);
  }
};

// const syncDataFlightMerged = async () => {
//   try {
//     const allFlightMerged = await prisma.FlightMergedSQL.findMany(); // Ambil semua data dari PostgreSQL

//     // Transformasi data dari PostgreSQL ke format yang sesuai untuk MongoDB
//     const mappedData = allFlightMerged.map((flightMerged) => {
//       return {
//         _id: flightMerged.id,
//         price: flightMerged.price,
//         currency: flightMerged.currency,
//         flight_data: flightMerged.flight_data,
//       };
//     });

//     // Dapatkan semua _id yang ada di mappedData
//     const mongoIds = mappedData.map((data) => data._id);

//     // Dapatkan semua _id yang ada di MongoDB dan tidak ada di PostgreSQL
//     const idsToDelete = await FlightMergedNoSQL.find({
//       _id: { $nin: mongoIds },
//     })
//       .lean()
//       .distinct("_id");

//     // Hapus dokumen yang tidak ada lagi di PostgreSQL
//     await FlightMergedNoSQL.deleteMany({ _id: { $in: idsToDelete } });

//     // Simpan atau perbarui data di MongoDB
//     await FlightMergedNoSQL.bulkWrite(
//       mappedData.map((data) => ({
//         updateOne: {
//           filter: { _id: data._id },
//           update: { $set: data },
//           upsert: true, // Tambahkan jika tidak ditemukan
//         },
//       }))
//     );

//     console.log("Merged data synced successfully.");
//   } catch (error) {
//     console.error("Error syncing Merged data:", error);
//   }
// };

module.exports = {
  initDataFlightMerged,
  syncDataFlightMerged,
};

// B-Tree Algorithm
// algoritma bTreeSearchDescending(x, k):
//     // x adalah node saat ini, k adalah kunci yang dicari
//     i = n // Mulai dari kunci terakhir
//     while i > 0 dan k < x.key[i] do
//         i = i - 1
//     if i > 0 dan k == x.key[i] then
//         return (x, i) // Kunci ditemukan
//     elseif x.leaf then
//         return NIL // Kunci tidak ditemukan di leaf
//     else
//         disk-read(x.child[i+1])
//         return bTreeSearchDescending(x.child[i+1], k)
