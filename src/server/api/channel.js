const router = require('express').Router();
const db = require('../db');

// GET all devices
router.get('/', async (req, res) => {
    const channels = await db.getRows('channels');
    res.setHeader('X-Total-Count', channels.length);
    res.finish(200, channels);
});

// GET device by id
router.get('/:id', async (req, res) => {
    const channels = await db.getRows('channels', "*", { id: req.params.id });
    res.finish(200, channels[0]);
});

// POST new device
router.post('/', async (req, res) => {
    if (req.body.password){
        // encrypt password
        req.body.password = await db.encrypt(req.body.password);
    }
    await db.insertRow('channels', req.body);
    res.finish(201, req.body);
});

module.exports = router;