import { ListContents, GetListContentsQuery } from "../../../types/api";
import { Tag } from "../../../types/tag";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: ListContents<Tag>;
  };
};
