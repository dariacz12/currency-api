export default {
  async fetch(request) {
    const origin = request.headers.get("Origin");

    const allowedOrigins = [
      "http://localhost:3000",
      "https://currency-api.daria-czupreta.workers.dev", // <-- zamień na swoją domenę produkcyjną
    ];

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "https://currency-api.daria-czupreta.workers.dev", // <-- zamień na swoją domenę
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Obsługa preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const country = request.cf?.country;
    const continent = request.cf?.continent;

    let currency = "USD";

    if (country === "PL") {
      currency = "PLN";
    } else if (continent === "EU") {
      currency = "EUR";
    }

    return Response.json(
      { currency },
      {
        headers: corsHeaders,
      }
    );
  },
};