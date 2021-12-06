const recorder = require("./recorder");
const spawn = require("child_process").spawn;
const getMac = require("getmac").default;
const ip = require("ip");
const util = require("./util");
const ws = require("./websocket");
const MQTT = require("./mqtt");
const { translateText } = require("./translator");
const { speakTranslatedText } = require("./speaker");

const main = async () => {
  let childProcess;
  const mac = getMac();
  const settings = await util.getDeviceSettings(mac);

  global.settings = settings;

  ws.init(settings);
  MQTT.init(settings.topic, async (message) => {
    console.log(message);
    if (message.payload.data) {
      const translation = await translateText(
        message.payload.data,
        message.payload.spokenLanguage
      );
      if (translation) {
        speakTranslatedText(translation);
      }
    }
  });

  childProcess = spawn(
    `cd ../ui && export REACT_APP_MAC_ADDR=\"${mac}\" && yarn start`,
    { detached: true, shell: true }
  );

  // print output of child process
  childProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  // print error of child process
  childProcess.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  recorder.start(
    (data, err) => {
      if (err) {
        console.log(err);
      }
      MQTT.publish({
        data,
        spokenLanguage: global.settings.spokenLanguage,
      });
    },
    {
      languageCode: global.settings.spokenLanguage,
    }
  );

  // on exit
  process.on("SIGINT", () => {
    recorder.stop();
    // kill all processes on port 3000 (cannot just kill child since it spawns children of its own)
    if (childProcess) {
      if (process.platform === "darwin") {
        spawn("npx kill-port 3000", { shell: true });
      } else {
        spawn("fuser -k 3000/tcp", { shell: true });
      }
    }
    process.exit();
  });

  console.log("Speech module active on " + ip.address());
};

main();
