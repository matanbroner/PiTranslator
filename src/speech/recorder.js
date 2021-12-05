"use strict";

/*
Infinite stream translator using Google Speech to Text API
Reference: https://github.com/googleapis/nodejs-speech/blob/main/samples/infiniteStreaming.js

exports a function that takes a callback as an argument
callback is called with the transcribed text or an error
ex. callback("Hello world", null)
ex. callback(null, "API request error")
*/

const { Writable } = require("stream");
const recorder = require("node-record-lpcm16");
const speech = require("@google-cloud/speech").v1p1beta1;

let client = null;
let recording = null;

let _recorder = {
  start: (callback, settings = {}) => {
    process.on("unhandledRejection", (err) => {
      callback(null, err);
      process.exitCode = 1;
    });

    client = new speech.SpeechClient();

    const encoding = "LINEAR16";
    const sampleRateHertz = 16000;
    const languageCode =
      typeof settings.languageCode !== "undefined"
        ? settings.languageCode
        : "en-US";
    const streamingLimit = 290000;

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    };

    const request = {
      config,
      interimResults: true,
    };

    let recognizeStream = null;
    let audioInput = [];
    let lastAudioInput = [];
    let resultEndTime = 0;
    let isFinalEndTime = 0;
    let finalRequestEndTime = 0;
    let newStream = true;
    let bridgingOffset = 0;

    function startStream() {
      // Clear current audioInput
      audioInput = [];
      // Initiate (Reinitiate) a recognize stream
      recognizeStream = client
        .streamingRecognize(request)
        .on("error", (err) => {
          if (err.code === 11) {
            restartStream();
          } else {
            callback(null, "API request error " + err);
          }
        })
        .on("data", speechCallback);

      // Restart stream when streamingLimit expires
      setTimeout(restartStream, streamingLimit);
    }

    const speechCallback = (stream) => {
      let outputTxt = "";
      if (stream.results[0] && stream.results[0].alternatives[0]) {
        outputTxt = stream.results[0].alternatives[0].transcript;
      }

      if (stream.results[0].isFinal) {
        callback(outputTxt);

        isFinalEndTime = resultEndTime;
      }
    };

    const audioInputStreamTransform = new Writable({
      write(chunk, encoding, next) {
        if (newStream && lastAudioInput.length !== 0) {
          // Approximate math to calculate time of chunks
          const chunkTime = streamingLimit / lastAudioInput.length;
          if (chunkTime !== 0) {
            if (bridgingOffset < 0) {
              bridgingOffset = 0;
            }
            if (bridgingOffset > finalRequestEndTime) {
              bridgingOffset = finalRequestEndTime;
            }
            const chunksFromMS = Math.floor(
              (finalRequestEndTime - bridgingOffset) / chunkTime
            );
            bridgingOffset = Math.floor(
              (lastAudioInput.length - chunksFromMS) * chunkTime
            );

            for (let i = chunksFromMS; i < lastAudioInput.length; i++) {
              recognizeStream.write(lastAudioInput[i]);
            }
          }
          newStream = false;
        }

        audioInput.push(chunk);

        if (recognizeStream) {
          recognizeStream.write(chunk);
        }

        next();
      },

      final() {
        if (recognizeStream) {
          recognizeStream.end();
        }
      },
    });

    function restartStream() {
      if (recognizeStream) {
        recognizeStream.end();
        recognizeStream.removeListener("data", speechCallback);
        recognizeStream = null;
      }
      if (resultEndTime > 0) {
        finalRequestEndTime = isFinalEndTime;
      }
      resultEndTime = 0;

      lastAudioInput = [];
      lastAudioInput = audioInput;

      newStream = true;

      startStream();
    }
    // Start recording and send the microphone input to the Speech API
    recording = recorder.record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, // Silence threshold
      silence: 1000,
      keepSilence: true,
      // if is linux use arecord else sox
      recorder: process.platform === "linux" ? "arecord" : "sox",
      device: process.platform === "linux" ? "plughw:2" : "default",
    });
    recording
      .stream()
      .on("error", (err) => {
        callback(null, "Recording error " + err);
      })
      .pipe(audioInputStreamTransform);

    startStream();
  },
  stop: () => {
    if (client) {
      client.close();
      client = null;
    }
    if (recording) {
      recording.stop();
      recording = null;
    }
  },
};

_recorder.changeLanguageCode = (callback, languageCode) => {
  console.log("Changing language code to " + languageCode);
  _recorder.stop();
  _recorder.start(callback, { languageCode });
};

module.exports = _recorder;
