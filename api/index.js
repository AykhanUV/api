const express = require('express');
const fetch = require('node-fetch'); // Add node-fetch for making HTTP requests
const app = express();

app.get('/embed/movie/:tmdb_id', async (req, res) => {
  const tmdbId = req.params.tmdb_id;
  const embedUrl = `https://embed.7xtream.com/embed/movie/${tmdbId}`;
  res.json({
    message: `Movie embed URL for TMDB ID: ${tmdbId}`,
    embed_url: embedUrl
  });
});

app.get('/embed/tv/:tmdb_id/:season_number/:episode_number', async (req, res) => {
  const tmdbId = req.params.tmdb_id;
  const seasonNumber = req.params.season_number;
  const episodeNumber = req.params.episode_number;
  const embedUrl = `https://embed.7xtream.com/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
  res.json({
    message: `TV show embed URL for TMDB ID: ${tmdbId}, Season: ${seasonNumber}, Episode: ${episodeNumber}`,
    embed_url: embedUrl
  });
});

app.get('/list/:type.json', async (req, res) => {
  const type = req.params.type;
  const listUrl = `https://embed.7xtream.com/list/${type}.json`;

  try {
    const response = await fetch(listUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ error: 'Error fetching list data' });
  }
});

app.get('/', (req, res) => {
  res.send('AFN API - Movie Streaming API');
});

module.exports = app;
