import puppeteer, { type Browser } from "puppeteer";

async function test(links: Array<string>): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};
  const linksStartTime = Date.now();
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const promises = links.map((link) => testLink(browser, link));
  const awaited = await Promise.all(promises);
  for (let index = 0; index < links.length; ++index) results[links[index]] = awaited[index];
  await browser.close();
  const linksTime = (Date.now() - linksStartTime) / 1_000;
  console.info(
    `Tested ${links.length} links in ${linksTime} s, averaging ${linksTime / links.length} s per link.`,
  );
  return results;
}

async function testLink(browser: Browser, link: string): Promise<boolean> {
  const linkStartTime = Date.now();
  let linkEndTime: number;
  let status: number | null = null;
  const page = await browser.newPage();
  try {
    const response = await page.goto(link, { waitUntil: "networkidle0", timeout: 30_000 });
    status = response === null ? null : response.status();
  } catch (error: unknown) {
  } finally {
    linkEndTime = Date.now();
    await page.close();
  }
  console.info(
    `Tested ${link} with status ${status === null ? "N/A" : status} in ${(linkEndTime - linkStartTime) / 1_000} s.`,
  );
  return status === null ? false : status < 400;
}

const links: Array<string> = [
  "https://developer.chrome.com/",
  "https://www.google.com/",
  "https://www.youtube.com/",
  "https://www.facebook.com/neel.kamath/",
  "https://www.twitter.com/",
  "https://www.instagram.com/",
  "https://www.pinterest.com/",
  "https://www.reddit.com/",
  "https://www.tumblr.com/",
  "https://www.foursquare.com/",
  "https://www.github.com/",
  "https://www.stackoverflow.com/",
  "https://www.amazon.com/",
  "https://www.ebay.com/",
  "https://www.paypal.com/",
  "https://www.netflix.com/",
  "https://www.wikipedia.org/",
  "https://www.wikipedia.org/wiki/Main_Page",
  "https://github.com/nonexisting-page-thats-broken",
  "https://amazon.com/something-broken",
  "https://www.microsoft.com/",
  "https://www.apple.com/",
  "https://www.nytimes.com/",
  "https://www.cnn.com/",
  "https://www.bbc.com/",
  "https://www.reuters.com/",
  "https://www.twitch.tv/",
  "https://www.spotify.com/",
  "https://www.medium.com/",
  "https://www.imgur.com/",
  "https://www.quora.com/",
  "https://www.goodreads.com/",
  "https://www.yelp.com/",
  "https://www.tripadvisor.com/",
  "https://www.airbnb.com/",
  "https://www.booking.com/",
  "https://www.expedia.com/",
  "https://www.weather.com/",
  "https://www.yahoo.com/",
  "https://www.bing.com/",
  "https://www.duckduckgo.com/",
  "https://www.imdb.com/",
  "https://www.rotten-tomatoes.com/",
  "https://www.etsy.com/",
  "https://www.walmart.com/",
  "https://www.target.com/",
  "https://www.craigslist.org/",
  "https://www.dropbox.com/",
  "https://www.gitlab.com/",
  "https://www.bitbucket.org/",
  "https://www.nodejs.org/",
  "https://www.npmjs.com/",
  "https://www.digitalocean.com/",
  "https://www.cloudflare.com/",
  "https://www.openai.com/",
  "https://www.mozilla.org/",
  "https://www.slack.com/",
  "https://www.zoom.us/",
  "https://www.trello.com/",
  "https://www.notion.so/",
  "https://docs.python.org/",
  "https://developer.mozilla.org/",
  "https://reactjs.org/",
  "https://vuejs.org/",
  "https://angular.io/",
  "https://kubernetes.io/",
  "https://docs.docker.com/",
  "https://www.typescriptlang.org/",
  "https://golang.org/",
  "https://www.rust-lang.org/",
  "https://www.google.com/this-page-doesnt-exist",
  "https://www.facebook.com/non-existent-profile-12345",
  "https://github.com/this-user-doesnt-exist/repo-doesnt-exist",
  "https://www.youtube.com/watch?v=invalid-video-id",
  "https://twitter.com/non_existent_handle",
  "https://www.amazon.com/dp/invalid-product-id",
  "https://en.wikipedia.org/wiki/This_Article_Does_Not_Exist",
  "https://www.instagram.com/thisaccountdoesnotexist123456/",
  "https://www.reddit.com/r/subreddit_that_doesnt_exist/",
  "https://stackoverflow.com/questions/99999999/non-existent-question",
  "https://www.linkedin.com/in/profile-doesnt-exist-12345/",
  "https://medium.com/@non-existent-user/fake-article-title-12345",
  "https://www.nytimes.com/broken/path/to/article",
  "https://www.microsoft.com/en-us/nonexistentproduct",
  "https://www.apple.com/nonexistentproduct",
  "https://www.npmjs.com/package/non-existent-package-name",
  "https://pypi.org/project/non-existent-package/",
  "https://rubygems.org/gems/non-existent-gem",
  "https://wordpress.org/plugins/non-existent-plugin/",
  "https://www.netflix.com/title/99999999",
  "https://docs.aws.amazon.com/non-existent-service/",
  "https://cloud.google.com/non-existent-product",
  "https://azure.microsoft.com/en-us/services/non-existent-service/",
  "https://developer.apple.com/documentation/non_existent_framework",
  "https://react-non-existent-library.js.org/",
  "https://www.mysql.com/products/non-existent-product/",
  "https://www.postgresql.org/docs/99.9/",
  "https://www.mongodb.com/products/non-existent",
  "https://redis.io/commands/non-existent-command",
  "https://example.org/this-page-will-never-exist",
];
test(links).catch(console.error);
