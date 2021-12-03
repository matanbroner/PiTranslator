const recorder = require("./recorder");
const spawn = require("child_process").spawn;
const getMac = require("getmac").default;
const ip = require("ip");
const util = require("./util");
const ws = require("./websocket");
const MQTT = require("./mqtt");

const main = async () => {
  let childProcess;
  const mac = getMac();
  const settings = await util.getDeviceSettings(mac);

  ws.init(settings);
  MQTT.init(settings.topic);

  childProcess = spawn(
    `cd ../ui && export REACT_APP_MAC_ADDR=\"${mac}\" && yarn start`,
    { detached: true, shell: true }
  );

  recorder.start(
    (data, err) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    },
    {
      languageCode: settings.spokenLanguage,
    }
  );

  // on exit
  process.on("SIGINT", () => {
    recorder.stop();
    // kill all processes on port 3000 (cannot just kill child since it spawns children of its own)
    if (childProcess) {
      spawn("npx kill-port 3000", { shell: true });
    }
    process.exit();
  });

  console.log("Speech module active on " + ip.address());
};

main();
