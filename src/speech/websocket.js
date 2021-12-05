const ws = require("ws");
const getMac = require("getmac").default;
const recorder = require("./recorder");
const MQTT = require("./mqtt");

const mac = getMac();

module.exports = {
  init: (settings) => {
    const socket = new ws.WebSocket("ws://35.223.252.230:5001");
    socket.on("open", () => {
      console.log("Connected to websocket");
      socket.send(
        JSON.stringify({
          type: "init",
          mac,
        })
      );
    });

    socket.on("close", () => {
      console.log("WS connection closed");
    });

    socket.on("message", (data) => {
      const message = JSON.parse(data);
      console.log(message);
      if (message.recipient === mac) {
        if (message.type === "updateSetting") {
          if (message.key in settings) {
            settings[message.key] = message.value;
          } else {
            console.log("Unknown key: " + message.key);
          }

          // TODO: call appropriate function to react to settings change
          switch (message.key) {
            case "activeChannelId": {
              MQTT.changeTopic(message.value);
              break;
            }
            case "spokenLanguage": {
              global.settings.spokenLanguage = message.value;
              recorder.changeLanguageCode((data, err) => {
                if (err) {
                  console.log(err);
                }
                MQTT.publish({
                  data,
                  spokenLanguage: message.value,
                });
              }, message.value);
              break;
            }
            default:
              break;
          }
        }
      }
    });
  },
};
