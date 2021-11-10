const channelRouter = require('./channel');
const deviceRouter = require('./device');

const router = require('express').Router();

// Routes
router.use('/channel', channelRouter);
router.use('/device', deviceRouter);

module.exports = router;