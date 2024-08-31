const express = require("express");
const dotenv = require("dotenv");
const process = require("process");
const workoutRoutes = require("./routes/workouts.js");
const usersRoutes = require("./routes/users.js");
const transactionsRoutes = require("./routes/Transactions.js");
const userPortfolio = require("./routes/userPortfolio.js");
const nftMetadataRoutes = require("./routes/nftMetadata.js");
const trackingRoutes = require("./routes/txTracking.js");
const balanceRoutes = require("./routes/balance.js");
const smartContractRoutes = require("./routes/smartContract.js");
const textStorageRoutes = require("./routes/textStorage.js");
const mongoose = require("mongoose");
const cors = require("cors");

require("./helpers/bigint.js");

dotenv.config();

const app = express();

// configuration cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://api.coingecko.com/"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// middleware pour parser le json
app.use(express.json());

// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/portfolio/", userPortfolio);
app.use("/api/transactions/", transactionsRoutes);
app.use("/api/users/", usersRoutes);
app.use("/api/metadata/", nftMetadataRoutes);
app.use("/api/txtracking/", trackingRoutes);
app.use("/api/balance/", balanceRoutes);
app.use("/api/smartContract/", smartContractRoutes);
app.use("/api/textStorage/", textStorageRoutes);

//connect to db et lancement du server
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen requests
    console.log(`connected to db`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
