const router = require('express').Router();
const db = require('../db');

// GET all devices
router.get('/', async (req, res) => {
    const devices = await db.getRows('devices');
    res.finish(200, devices);
});

// GET device by id
router.get('/:id', async (req, res) => {
    const device = await db.getRow('devices', "*", { id: req.params.id });
    res.finish(200, device);
});

// POST new device
router.post('/', async (req, res) => {
    await db.insertRow('devices', req.body);
    res.finish(201);
});

module.exports = router;