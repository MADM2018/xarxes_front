const ENV = process.env.NODE_ENV;

const apiRootURL =
  ENV === "development"
    ? "http://localhost:2000"
    : "https://alumnes-ltim.uib.es/madm04b";

const apiAppKey = "";

export { apiRootURL, apiAppKey };
