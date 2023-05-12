const axios = require("axios");

function getMetaData(url) {
  return axios.get(`http://api.linkpreview.net/?key=${process.env.API_KEY}&q=${url}
  `);
}

module.exports = { getMetaData };
