import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// 1. Get address from coordinates (using Nominatim)
app.get("/api/address", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "express-osrm-app" },
    });

    res.json({
      coordinates: { lat, lon },
      address: response.data.display_name,
      details: response.data.address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get route map between two coordinates (using OSRM)
app.get("/api/route", async (req, res) => {
  try {
    const { startLat, startLon, endLat, endLon } = req.query;
    if (!startLat || !startLon || !endLat || !endLon) {
      return res
        .status(400)
        .json({ error: "startLat, startLon, endLat, endLon are required" });
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;

    const response = await axios.get(url);

    res.json({
      waypoints: response.data.waypoints,
      routes: response.data.routes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
