require('dotenv').config();
const axios = require('axios');
const KEY = process.env.GOOGLE_API_KEY;
const CHAINS = ["Walmart","Costco","Sam's Club"];

// Uses Google Places Nearby Search
async function fetchNearby(lat, lon, radius) {
  const keyword = CHAINS.map(c => encodeURIComponent(c)).join('|');
  const url =
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
    `?location=${lat},${lon}` +
    `&radius=${radius}` +
    `&keyword=${keyword}` +
    `&key=${KEY}`;

  const { data } = await axios.get(url);
  if (data.status !== 'OK') {
    throw new Error(data.status + ': ' + (data.error_message||''));
  }
  // return only the fields you need
  return data.results.map(p => ({
    place_id: p.place_id,
    name: p.name,
    lat: p.geometry.location.lat,
    lon: p.geometry.location.lng,
    vicinity: p.vicinity,      // human‐readable address fragment
    types: p.types,            // e.g. ["supermarket","store",...]
  }));
}

module.exports = { fetchNearby };
