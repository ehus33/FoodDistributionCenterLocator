const express = require('express');
const cors = require('cors');
const { fetchNearby } = require('./placesFetcher');

const app = express();
app.use(cors());
app.get('/api/nearby', async (req, res) => {
  const { lat, lon, radius } = req.query;
  try {
    const stores = await fetchNearby(
      parseFloat(lat),
      parseFloat(lon),
      parseInt(radius, 10)
    );
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Google Places lookup failed' });
  }
});
app.listen(5000, () => console.log('Backend listening on :5000'));
