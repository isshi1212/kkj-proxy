export default async function handler(req, res) {
  // CORS（先に全部セット）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight 対応（これが無いと環境によっては弾かれます）
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // 接続テスト用（query無しで叩かれても 200 を返す）
    const query = req.query?.query;

    if (!query) {
      return res.status(200).json({
        ok: true,
        message: "kkj proxy is running",
        usage: "/api/kkj?query=清掃",
      });
    }

    const url = `https://www.kkj.go.jp/api/?Query=${encodeURIComponent(query)}&Count=10`;

    const response = await fetch(url);
    const xml = await response.text();

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    return res.status(200).send(xml);
  } catch (error) {
    return res.status(500).json({ error: "server error", detail: String(error) });
  }
}
