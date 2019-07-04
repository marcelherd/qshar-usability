const cheerio = require('cheerio');
const axios = require('axios');

const express = require('express');
const helmet = require('helmet');

const allMaps = require('./maps.json');

const app = express();

app.use(helmet());

app.get('*', async (req, res) => {
  res.set('Content-Type', 'application/json');
  const html = await getPlayerHtml(req.query.name);
  const $ = cheerio.load(html, { normalizeWhitespace: true });
  const unfinishedMaps = $('#rankk .background .container').text().split('UNFINISHED MAPS: \n')[1].replace(/(\r\n|\n|\r)/gm, '').split(' | ').slice(0, -1);
  res.status(200).send({
    allMaps,
    unfinishedMaps,
  });
});

const getPlayerHtml = async (player) => {
  const response = await axios.get(`https://qshar.com/?player=${player}#rankk`);
  return response.data;
}

module.exports = app;
