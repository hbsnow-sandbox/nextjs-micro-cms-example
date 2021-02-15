import { ContentResponse, ListContentsResponse } from "./api";
import { TagResponse } from "./tag";

export type BlogListResponse = ListContentsResponse<BlogResponse>;

export type BlogResponse = ContentResponse<{
  title?: string;
  body?: string;
  tags?: TagResponse[];
}>;
