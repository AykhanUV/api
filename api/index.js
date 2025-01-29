const express = require('express');
const app = express();

app.get('/embed/movie/:tmdb_id', (req, res) => {
  const tmdbId = req.params.tmdb_id;
  res.json({
    message: `Movie embed URL for TMDB ID: ${tmdbId}`,
    embed_url: `https://your-actual-movie-source.com/embed/${tmdbId}`
  });
});

app.get('/embed/tv/:tmdb_id/:season_number/:episode_number', (req, res) => {
  const tmdbId = req.params.tmdb_id;
  const seasonNumber = req.params.season_number;
  const episodeNumber = req.params.episode_number;
  res.json({
    message: `TV show embed URL for TMDB ID: ${tmdbId}, Season: ${seasonNumber}, Episode: ${episodeNumber}`,
    embed_url: `https://your-actual-tv-show-source.com/embed/${tmdbId}/${seasonNumber}/${episodeNumber}`
  });
});

app.get('/list/:type.json', (req, res) => {
  const type = req.params.type;
  if (type === 'movie') {
    res.json([
      { id: '123', title: 'Movie A' },
      { id: '456', title: 'Movie B' }
    ]);
  } else if (type === 'tv') {
    res.json([
      { id: '789', title: 'TV Show X' },
      { id: '101', title: 'TV Show Y' }
    ]);
  } else {
    res.status(400).json({ error: 'Invalid type' });
  }
});

app.get('/', (req, res) => {
  res.send('AFN API - Movie Streaming API');
});

module.exports = app;
