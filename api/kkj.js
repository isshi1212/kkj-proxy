export default async function handler(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "query required" });
    }

    const url = `http://kkj.go.jp/api/?Query=${encodeURIComponent(query)}&Count=10`;

    const response = await fetch(url);
    const xml = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/xml");

    return res.status(200).send(xml);

  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
}
