import { Content } from "./api";
import { Tag } from "./tag";

export type Blog = Content<{
  title?: string;
  body?: string;
  tags?: Tag[];
}>;
