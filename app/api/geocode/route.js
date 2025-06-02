// Proxy route for geocoding and reverse geocoding using Nominatim

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q'); // address for geocoding
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  let url;
  if (q) {
    // Geocoding
    url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  } else if (lat && lon) {
    // Reverse geocoding
    url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  } else {
    return new Response(JSON.stringify({ error: 'Missing query parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LifelineApp/1.0 (contact@lifeline.com)',
        'Accept-Language': 'en',
      },
    });
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Geocoding failed', status: response.status }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error', details: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
