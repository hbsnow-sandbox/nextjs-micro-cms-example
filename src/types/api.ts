export type CommonListContents<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type CommonContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// https://document.microcms.io/content-api/get-list-contents
export type GetListContentsQuery = {
  draftKey?: boolean;
  limit?: number;
  orders?: string;
  q?: string;
  fields?: string;
  ids?: string;
  filters?: string;
  depth?: number;
};

// https://document.microcms.io/content-api/get-content
export type GetContentQuery = {
  draftKey?: boolean;
  fields?: string;
  depth?: number;
};
