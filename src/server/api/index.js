const 
channelRouter = require('./channel');
const deviceRouter = require('./device');
const settingsRouter = require('./settings')

const router = require('express').Router();

// Routes
router.use('/channels', channelRouter);
router.use('/devices', deviceRouter);
router.use('/settings', settingsRouter);

module.exports = router;