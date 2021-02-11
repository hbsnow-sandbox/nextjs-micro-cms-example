import { GetContentQuery } from "../../../types/api";
import { SiteData } from "../../../types/siteData";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: SiteData;
  };
};
