// Import the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const Sound = require("node-aplay");
const exec = require("child_process").exec;

// Import other required libraries
const fs = require("fs");
const util = require("util");
const client = new textToSpeech.TextToSpeechClient();

async function speakTranslatedText(text) {
  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: {
      //   languageCode: global.settings.spokenLanguage,
      languageCode: "en-US",
      ssmlGender: "NEUTRAL",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");

  // if is MacOS
  if (process.platform === "darwin") {
    exec("afplay output.mp3", () => {
      // remove file when done
      fs.unlink("output.mp3", () => {
        console.log("File removed");
      });
    });
  } else {
    var music = new Sound("output.mp3");
    music.play();

    // you can also listen for various callbacks:
    music.on("complete", function () {
      // remove the file when done
      fs.unlink("output.mp3", function (err) {
        console.log("File deleted!");
      });
    });
  }
}

module.exports = {
  speakTranslatedText,
};
