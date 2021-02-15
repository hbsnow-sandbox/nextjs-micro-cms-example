import { GetContentQuery } from "../../../../types/api";
import { BlogResponse } from "../../../../types/blog";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: BlogResponse;
  };
};
