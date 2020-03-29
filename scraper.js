const axios = require("axios");
const cheerio = require("cheerio");

const SITE_URL = "http://designonline.org.au/category/stories/page/";

const fetchData = async pageNum => {
  const result = await axios.get(SITE_URL + pageNum + "/");
  return cheerio.load(result.data);
};

async function scrapeData() {
  const selection = await fetchData(2);
  const posts = [];

  const postSelection = selection("#posts_container_masonry").find(
    ".post_listing_container"
  );
  postSelection.each((i, post) => {
    let thisPost = {};

    const aTag = selection("a", post); // new
    thisPost["url"] = aTag.attr("href");
    thisPost["img_url"] = selection(
      "img.img-responsive.center-block.wp-post-image",
      aTag
    ).attr("src");
    const postListingText = selection(".post_listing_text", post);
    thisPost["heading"] = selection("a.post_heading", postListingText).text();

    const postItalicDetails = selection(
      "p.post_italic_details",
      postListingText
    );
    thisPost["author"] = postItalicDetails.text();
    thisPost["author_url"] = selection("a", postItalicDetails).attr("href");

    posts.push(thisPost);
  });

  console.log(posts);
  return posts;
}

module.exports.scrape = scrapeData;
