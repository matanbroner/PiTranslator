const mqtt = require("mqtt");

const host = "35.223.252.230";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

class MQTT {
  constructor() {
    this._connected = false;
    this.client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on("connect", () => {
      this._connected = true;
      console.log("Connected");
    });
  }

  _waitForConnection() {
    while (!this._connected) {
      setTimeout(() => {}, 1000);
    }
  }

  init(topic, onMessage) {
    this._waitForConnection();
    if (topic) {
      this.topic = topic;
      this.subscribe(topic);
    }
    this.client.on("message", (_, message) => {
        message = JSON.parse(message.toString());
        if(message.sender !== clientId) {
            onMessage(message);
        }
    });
  }

  subscribe(topic) {
    this._waitForConnection();
    this.client.subscribe([topic], () => {
      console.log(`Subscribed to topic '${topic}'`);
    });
  }

  changeTopic(topic) {
    this._waitForConnection();
    if (this.topic) {
      this.client.unsubscribe(this.topic);
    }
    if (topic) {
      this.topic = topic;
      this.subscribe(topic);
    }
  }

  publish(message) {
    this._waitForConnection();
    this.client.publish(this.topic, JSON.stringify({
        payload: message,
        sender: clientId,
    }), { qos: 0, retain: false });
  }
}

module.exports = new MQTT();
