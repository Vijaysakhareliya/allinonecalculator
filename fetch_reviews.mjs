import gplay from 'google-play-scraper';
import { writeFileSync } from 'fs';

const APP_ID = 'com.appnotiveapps.aicalculators.allconverter';

const appInfo = await gplay.app({ appId: APP_ID, lang: 'en', country: 'us' });
const reviewResult = await gplay.reviews({
  appId: APP_ID,
  lang: 'en',
  country: 'us',
  sort: gplay.sort.NEWEST,
  num: 12,
});
const reviewList = reviewResult.data || reviewResult;

const output = {
  title: appInfo.title,
  score: appInfo.score,
  ratings: appInfo.ratings,
  reviews: appInfo.reviews,
  histogram: appInfo.histogram,
  userReviews: reviewList
    .filter((r) => r.text && r.text.trim().length > 10)
    .slice(0, 8)
    .map((r) => ({
      userName: r.userName,
      score: r.score,
      text: r.text,
      date: r.date,
      thumbsUp: r.thumbsUp,
    })),
};

console.log(JSON.stringify(output, null, 2));
writeFileSync('reviews.json', JSON.stringify(output, null, 2));
