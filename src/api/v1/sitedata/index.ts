import { GetContentQuery } from "../../../types/api";
import { SiteDataResponse } from "../../../types/siteData";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: SiteDataResponse;
  };
};
