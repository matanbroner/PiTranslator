// Import the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const mpg = require('mpg123');
const exec = require("child_process").exec;
const { randomString } = require('./util')

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
      languageCode: global.settings.spokenLanguage,
      ssmlGender: "NEUTRAL",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  const filename = `${randomString(10)}.mp3`;
  await writeFile(filename, response.audioContent, "binary");
  console.log("Audio content written to file: " + filename);

  // if is MacOS
  if (process.platform === "darwin") {
    exec("afplay " + filename , () => {
      // remove file when done
      fs.unlink(filename, () => {
        console.log("File removed");
      });
    });
  } else {
    const player = new mpg.MpgPlayer();
    player.play(filename);
    player.on('end', function(){
        fs.unlink(filename, function (err) {
            console.log("File deleted!");
          });
    })
  }
}

module.exports = {
  speakTranslatedText,
};
