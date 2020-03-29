const Express = require("express");
const scraper = require("./scraper");
const app = Express();

app.get("/:page", async (req, res) => {
  const pageNo = req.params.page;
  const result = await scraper.scrape(pageNo);
  res.status(200).json(result);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Scraper is running on port ${port}`);
});
