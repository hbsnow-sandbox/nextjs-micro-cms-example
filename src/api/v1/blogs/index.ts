import { CommonListContents, GetListContentsQuery } from "../../../types/api";
import { Blog } from "../../../types/blog";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: CommonListContents<Blog>;
  };
};
