const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const routerData = require("./controller/flightDataController");
const routerEmission = require("./controller/flightEmissionController");
const routerPrice = require("./controller/flightPriceController");
const routerInformation = require("./controller/flightInformationController");

const {
  initDataFlightMerged,
  syncDataFlightMerged,
} = require("./transformasi/flightMergedDBConverter");

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));

let isInitialized = false;
let isSyncInProgress = false;

// dbConverter
const initData = async (dataType) => {
  try {
    switch (dataType) {
      case "flightData":
        await initDataFlightMerged();
        break;
      case "flightEmission":
        await initDataFlightMerged();
        break;
      case "flightPrice":
        await initDataFlightMerged();
        break;
      default:
        break;
    }
    console.log(`${dataType} initialized successfully.`);
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

const syncData = async (dataType) => {
  try {
    switch (dataType) {
      case "flightData":
        await syncDataFlightMerged();
        break;
      case "flightEmission":
        await syncDataFlightMerged();
        break;
      case "flightPrice":
        await syncDataFlightMerged();
        break;
      default:
        break;
    }
    console.log(`${dataType} synced successfully.`);
  } catch (error) {
    console.error("Error syncing data:", error);
  }
};

const dbConverter = async (dataType) => {
  if (!isInitialized) {
    const startTime = Date.now(); // Mulai pencatatan waktu
    await initData(dataType); // Inisialisasi data
    isInitialized = true; // Set status inisialisasi menjadi true
    const endTime = Date.now(); // Akhiri pencatatan waktu
    const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
    console.log(`dbConverter processed in ${processingTime}ms`); // Cetak waktu proses
  } else {
    if (!isSyncInProgress && isInitialized) {
      // Jika tidak ada proses sinkronisasi yang sedang berlangsung dan data sudah diinisialisasi
      isSyncInProgress = true; // Set status sinkronisasi menjadi true
      const startTime = Date.now(); // Mulai pencatatan waktu
      try {
        await syncData(dataType); // Sinkronisasi data
      } finally {
        isSyncInProgress = false; // Set status sinkronisasi menjadi false
        const endTime = Date.now(); // Akhiri pencatatan waktu
        const processingTime = endTime - startTime; // Hitung waktu proses dalam milidetik
        console.log(`dbConverter processed in ${processingTime}ms`); // Cetak waktu proses
      }
    }
  }
};

// Middleware for SELECT Query
const dbAdapter = async (req, res, next) => {
  try {
    if (!isSyncInProgress) {
      req.isSQL = false;
    } else {
      console.log("Sync in progress, request will directed to PostgreSQL");
      req.isSQL = true;
    }
    next();
  } catch (error) {
    console.log("Error handlig SELECT query: ", error);
    res.status(500).send("internal server error");
  }
};

// Jalankan middleware
app.use(express.json());
app.use(
  "/api/data",
  dbAdapter,
  (req, res, next) => {
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      res.on("finish", () => {
        dbConverter("flightData");
      });
    }
    next();
  },
  routerData
);
app.use(
  "/api/emission",
  dbAdapter,
  (req, res, next) => {
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      res.on("finish", () => {
        dbConverter("flightEmission");
      });
    }
    next();
  },
  routerEmission
);
app.use(
  "/api/price",
  dbAdapter,
  (req, res, next) => {
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      res.on("finish", () => {
        dbConverter("flightPrice");
      });
    }
    next();
  },
  routerPrice
);

app.use("/api/information", dbAdapter, routerInformation);

// Jalankan server Express
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
