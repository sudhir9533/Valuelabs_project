const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const MODELS = {
    ford: {
        Ranger: ["Raptor", "RaptorX", "Wildtrak"],
        Falcon: ["XR6", "XR6 Turbo", "XR8"],
        "Falcon Ute": ["XR6", "XR6 Turbo"]
    },
    bmw: {
        "130d": ["Drive 26d", "xDrive 30d"],
        "240i": ["xDrive 30d", "xDrive 50d"],
        "320e": ["Drive 75d", "xDrive 80d", "xDrive 85d"]
    },
    tesla: {
        "Model 3": ["Performance", "Long Range", "Dual Motor"]
    }
};

app.post("/submit", upload.single("logbook"), (req, res) => {
    const { make, model, badge } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "Logbook file required" });
    }

    const logbookContents = req.file.buffer.toString("utf8");

    res.json({
        vehicle: { make, model, badge },
        logbook: logbookContents
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));