const ENV = "prod";

const apiRootURL =
  ENV === "dev"
    ? "http://localhost:2000"
    : "https://alumnes-ltim.uib.es/madm04b";

const apiAppKey = "fefefefe";

export { apiRootURL, apiAppKey };
