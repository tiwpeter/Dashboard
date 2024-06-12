import express from "express";
import { fetchKpi,fetchProduct ,fectTransacTionData} from "../model/KPI.js"; // Import fetchData function from KPI module
// data = model
//import KPI from "../data/read";

const router = express.Router();

router.get("/kpis", async (req, res) => {
    try {
        const data = await fetchKpi();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/Product", async (req, res) => {
    try {
        const data = await fetchProduct();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/TransacTion", async (req, res) => {
    try {
        const data = await fectTransacTionData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;