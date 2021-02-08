import aspida from "@aspida/node-fetch";
import fetch from "node-fetch";

import api from "../api/$api";

const fetchConfig: Parameters<typeof aspida>[1] = {
  baseURL: process.env.MICRO_CMS_HOST,
  throwHttpErrors: true,
  headers: {
    "X-API-KEY": process.env.MICRO_CMS_API_KEY,
  },
};

export const client = api(aspida(fetch, fetchConfig));
