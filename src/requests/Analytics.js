import api from "../utils/Api";

export function getTweetsByParty() {
  return api.get("tweetsByParty");
}

export function getTweetsByLeader() {
  return api.get("tweetsByLeader");
}

export function getTweetsTimeLineByParty() {
  return api.get("tweetsTimeLineByParty");
}

export function getTweetsTimeLineByLeader() {
  return api.get("tweetsTimeLineByLeader");
}
