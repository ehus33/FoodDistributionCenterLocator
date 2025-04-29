export async function fetchNearbyStores({ lat, lon, radius }) {
  const res = await fetch(
    `http://localhost:5000/api/nearby?lat=${lat}&lon=${lon}&radius=${radius}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
