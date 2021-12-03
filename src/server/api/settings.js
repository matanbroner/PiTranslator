const router = require('express').Router();
const db = require('../db');
const WSS = require("../websocketServer")

// GET settings by deviceId
router.get('/id/:deviceId', async (req, res) => {
    const settings = await db.getRows('settings', "*", {
        deviceId: req.params.deviceId
    });
    let result = settings[0];
    const channel = await db.getRows('channels', "*", {
        id: settings[0].activeChannelId
    });
    result.topic = channel[0].topic;
    res.finish(200, result);
});

// GET settings by mac address
router.get('/mac/:mac', async (req, res) => {
    const devices = await db.getRows('devices', "*", {
        mac: `\'${req.params.mac}\'`
    });
    if (!devices.length) {
        res.finish(404, "Device not found");
        return;
    }
    const settings = await db.getRows('settings', "*", {
        deviceId: devices[0].id
    });
    let result = settings[0];
    const channel = await db.getRows('channels', "*", {
        id: settings[0].activeChannelId
    });
    result.topic = channel[0].topic;
    res.finish(200, result);
});

// PUT settings by deviceId
router.put('/id/:id', async (req, res) => {
    await db.updateRow('settings', req.body, {
        id: req.params.id
    });
    // get device mac address
    const device = await db.getRows('devices', "mac", {
        id: req.params.id
    });
    const mac = device[0].mac;
    const alertedSettings = ["activeChannelId", "spokenLanguage"]
    Object.entries(req.body).forEach(async ([key, value]) => {
        if (alertedSettings.indexOf(key) > -1) {
            console.log(`${key} updated to ${value}`);
            if(key === "activeChannelId"){
                const channels = await db.getRows('channels', "*", {
                    id: value
                });
                value = channels[0].topic;
            }
            WSS.updateSetting(mac, key, value);
        }
    });
    res.finish(200);
})



module.exports = router;