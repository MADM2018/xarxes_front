import api from "../utils/Api";

export function getTotalTweets() {
  return api.get("tweetsCount");
}
