const ws = require("ws");
const getMac = require("getmac").default;

const mac = getMac();

module.exports = {
  init: (settings) => {
    const socket = new ws.WebSocket("ws://localhost:5001");
    socket.on("open", () => {
      console.log("Connected to websocket");
      socket.send(
        JSON.stringify({
          type: "init",
          mac
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
            case "activeChannelId":
              break;
            case "spokenLanguage":
              break;
            default:
              break;
          }
        }
      }
    });
  },
};
