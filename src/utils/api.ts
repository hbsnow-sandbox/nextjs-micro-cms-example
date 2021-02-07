import aspida from "@aspida/node-fetch";
import fetch from "node-fetch";

import api from "../api/$api";

const fetchConfig: Parameters<typeof aspida>[1] = {
  baseURL: "https://hbsnow.microcms.io/api",
  throwHttpErrors: true,
  headers: {
    "X-API-KEY": "",
  },
};

export const client = api(aspida(fetch, fetchConfig));
