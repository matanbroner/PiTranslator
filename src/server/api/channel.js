const router = require('express').Router();
const db = require('../db');

// GET all devices
router.get('/', async (req, res) => {
    const channels = await db.getRows('channels');
    res.finish(200, channels);
});

// GET device by id
router.get('/:id', async (req, res) => {
    const channel = await db.getRow('channels', "*", { id: req.params.id });
    res.finish(200, device);
});

// POST new device
router.post('/', async (req, res) => {
    if (req.body.password){
        // encrypt password
        req.body.password = await db.encrypt(req.body.password);
    }
    await db.insertRow('channels', req.body);
    res.finish(201);
});

module.exports = router;