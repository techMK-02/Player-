// server.js
const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// Serve player page
app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player.html'));
});

// Simple proxy for CORS (optional)
// NOTE: This proxy is basic. For production, forward Range headers and handle 206 partial content properly.
app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).send('Invalid url');
  }
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
      headers: { 'User-Agent': 'Video-Proxy' }
    });
    if (response.headers['content-type']) res.set('content-type', response.headers['content-type']);
    if (response.headers['accept-ranges']) res.set('accept-ranges', response.headers['accept-ranges']);
    response.data.pipe(res);
  } catch (err) {
    console.error('Proxy error:', err.message || err);
    res.status(500).send('Error fetching video');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
