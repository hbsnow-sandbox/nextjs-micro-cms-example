import { GetListContentsQuery } from "../../../types/api";
import { TagListResponse } from "../../../types/tag";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: TagListResponse;
  };
};
