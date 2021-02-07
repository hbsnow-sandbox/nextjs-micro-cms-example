import { CommonContent } from "./api";
import { Tag } from "./tag";

export type Blog = CommonContent & {
  title?: string;
  body?: string;
  tags?: Tag[];
};
