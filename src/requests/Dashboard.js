import api from "../utils/Api";

export function getTotalTweets() {
  return api.get("tweetsCount");
}

export function getTotalHashtags() {
  return api.get("hashtagsCount");
}

export function getTotalRetweets() {
  return api.get("retweetsCount");
}

export function getUsedSpace() {
  return api.get("usedSpace");
}
