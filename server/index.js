import express from "express";
import kpiRoutes from "./routes/kpi.js";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { fetchKpi,fetchProduct ,fectTransacTionData} from "./model/KPI.js"; // Import fetchData function from KPI module

/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/kpi", kpiRoutes);
app.get("/kpi", kpiRoutes);

app.use("/Product", kpiRoutes);
app.use("/TransacTion", kpiRoutes);

/* Call fetchData function to populate Firebase Realtime Database */
fetchKpi().then(() => {
  console.log("Data fetched successfully");
}).catch((error) => {
  console.error("Error fetching data:", error);
});
fetchProduct().then(() => {
  console.log("Data fetched successfully");
}).catch((error) => {
  console.error("Error fetching data:", error);
});

fectTransacTionData().then(() => {
  console.log("Data fetched successfully");
}).catch((error) => {
  console.error("Error fetching data:", error);
});


/* create port for .env to config */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
