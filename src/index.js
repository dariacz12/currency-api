export default {
  async fetch(request) {

    const country = request.cf?.country;
    const continent = request.cf?.continent;

    let currency = "USD";

    if (country === "PL") {
      currency = "PLN";
    } else if (continent === "EU") {
      currency = "EUR";
    }

    return Response.json({
      currency
    });

  }
}