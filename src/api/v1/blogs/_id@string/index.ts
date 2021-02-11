import { GetContentQuery } from "../../../../types/api";
import { Blog } from "../../../../types/blog";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: Blog;
  };
};
