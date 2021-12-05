const router = require("express").Router();
const db = require("../db");

// GET all devices
router.get("/", async (req, res) => {
  try {
    const devices = await db.getRows("devices");
    res.setHeader("X-Total-Count", devices.length);
    res.finish(200, devices);
  } catch (err) {
    res.finish(500, err);
  }
});

// GET device by id
router.get("/:id", async (req, res) => {
  try {
    const devices = await db.getRows("devices", "*", { id: req.params.id });
    if (devices.length === 0) {
      res.finish(404, "Device not found");
    }
    res.finish(200, devices[0]);
  } catch (err) {
    res.finish(500, err);
  }
});

// GET device by mac address
router.get("/mac/:mac", async (req, res) => {
  try {
    const devices = await db.getRows("devices", "*", {
      mac: `\'${req.params.mac}\'`,
    });
    if (devices.length) {
      res.finish(200, devices[0]);
    } else {
      res.finish(404, "Device not found");
    }
  } catch (err) {
    res.finish(500, err);
  }
});

// POST new device
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const deviceId = await db.insertRow("devices", req.body);
    await db.insertRow("settings", {
      deviceId,
      spokenLanguage: "en-US",
    });
    res.finish(201, req.body);
  } catch (err) {
    console.log(err);
    res.finish(500, err);
  }
});

// PUT device by id
router.put("/id/:id", async (req, res) => {
  try {
    await db.updateRow("devices", req.body, { id: req.params.id });
    res.finish(200);
  } catch (err) {
    console.log(err);
    res.finish(500, err);
  }
});

module.exports = router;
