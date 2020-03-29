const axios = require("axios");
const cheerio = require("cheerio");

const SITE_URL = "http://designonline.org.au/category/stories/page/"

const fetchData = async (pageNum) => {
    const result = await axios.get(SITE_URL+pageNum+"/");
    return cheerio.load(result.data);
}