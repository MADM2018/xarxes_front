import api from "../utils/Api";

export function getTweetsPlaces() {
  return api.get("getTweetsPlaces");
}
