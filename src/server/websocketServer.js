const wss = require("ws");

class WSS {
  constructor() {
    console.log("websocket server");
    this.server = new wss.WebSocketServer({
      port: 5001,
    });
    this.registry = {};
  }

  init() {
    this.server.on(
      "connection",
      function connection(ws) {
        ws.on(
          "message",
          function message(data) {
            let message = JSON.parse(data);
            if (message.type === "init") {
              console.log("WS Init MAC: ", message.mac);
              this.registry[message.mac] = ws;
            }
          }.bind(this)
        );

        ws.on(
          "close",
          function close() {
            // find mac in registry
            for (const mac in this.registry) {
              if (this.registry[mac] === ws) {
                delete this.registry[mac];
              }
            }
          }.bind(this)
        );
      }.bind(this)
    );
  }

  updateSetting(mac, key, value) {
    const message = JSON.stringify({
      type: "updateSetting",
      recipient: mac,
      key,
      value,
    });
    if (
      this.registry[mac] &&
      this.registry[mac].readyState === wss.WebSocket.OPEN
    ) {
      this.registry[mac].send(message);
    } else {
      // broadcast to all
      this.server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }
}

module.exports = new WSS();
