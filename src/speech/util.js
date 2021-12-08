// Utilities for the speech library
const axios = require("axios");

// Register device if not already registered
async function getDeviceSettings(mac) {
  return new Promise(async (resolve, reject) => {
    let settings;
    try {
      settings = await _getDeviceSettings(mac);
      return resolve(settings);
    } catch (err) {
      console.log(err);
      if (err.response.status !== 404) {
        return reject(err);
      }
    }
    try {
      const url = "http://35.223.252.230:5000/api/devices";
      const body = {
        mac,
        name: process.env.DEVICE_NAME || `Device ${randomString(5)}`,
      };
      await axios({
        method: "post",
        url,
        data: body,
      });
      settings = await _getDeviceSettings(mac);
      return resolve(settings);
    } catch (err) {
      return reject(err);
    }
  });
}

async function _getDeviceSettings(mac) {
  return new Promise((resolve, reject) => {
    const url = "http://35.223.252.230:5000/api/settings/mac/" + mac;
    axios({
      method: "get",
      url,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  getDeviceSettings,
  randomString,
};
