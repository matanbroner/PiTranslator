// Import the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

async function translateText(text, from) {
  from = from.split("-")[0];
  //   const to = global.settings.spokenLanguage.split("-")[0];
  const to = "en";
  if (from === to) return text;
  let [translations] = await translate.translate(text, {
    from,
    to,
  });
  translations = Array.isArray(translations) ? translations : [translations];
  if (translations.length) {
    return translations[0];
  }
  return null;
}

module.exports = {
  translateText,
};
