import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

// Enable CORS for all origins
app.use(cors());

app.get('/embed/movie/:tmdb_id', async (req, res) => {
  const tmdbId = req.params.tmdb_id;
  const embedUrl = `https://embed.7xtream.com/embed/movie/${tmdbId}`;
  try {
    const response = await fetch(embedUrl);
    if (!response.ok) {
      throw new Error(`7xtream API error: ${response.status}`);
    }
    // Server-side redirect to the 7xtream embed URL
    res.redirect(302, embedUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie embed URL' });
  }
});

app.get('/embed/tv/:tmdb_id/:season_number/:episode_number', async (req, res) => {
  const tmdbId = req.params.tmdb_id;
  const seasonNumber = req.params.season_number;
  const episodeNumber = req.params.episode_number;
  const embedUrl = `https://embed.7xtream.com/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
  try {
    const response = await fetch(embedUrl);
    if (!response.ok) {
      throw new Error(`7xtream API error: ${response.status}`);
    }
    // Server-side redirect to the 7xtream embed URL
    res.redirect(302, embedUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch TV show embed URL' });
  }
});

app.get('/list/:type.json', async (req, res) => {
  const type = req.params.type;
  const listUrl = `https://embed.7xtream.com/list/${type}.json`;
  try {
    const response = await fetch(listUrl);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from 7xtream:', errorText);
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

export default app;
