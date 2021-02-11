import React from "react";

import { NextPage, GetStaticProps } from "next";
import Link from "next/link";

import { Blog } from "../../../types/blog";
import { client } from "../../../utils/api";
import { toStringId } from "../../../utils/toStringId";

type Props = {
  blog: Blog;
  draftKey?: string;
};

const Page: NextPage<Props> = (props) => {
  const { blog, draftKey } = props;

  return (
    <>
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
          <Link href={`/api/exit-preview?id=${blog.id}`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <main>
        <header>
          <h1>{blog.title}</h1>
          <ul>
            <li>publishedAt: {blog.publishedAt}</li>
            {blog.tags && blog.tags.length > 0 && (
              <li>
                tag:
                <ul>
                  {blog.tags.map((tag) => (
                    <li key={tag.id}>
                      <Link href={`/tags/${tag.id}`}>{tag.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </header>
        {blog.body && (
          <article dangerouslySetInnerHTML={{ __html: blog.body }} />
        )}
      </main>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
  paths: string[];
}> => {
  const blogList = await client.v1.blogs.$get({
    query: { fields: "id" },
  });

  return {
    fallback: false,
    paths: blogList.contents.map((blog) => `/blogs/${blog.id}/`),
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  if (!params?.id) {
    throw new Error("Error! ID not found");
  }

  const id = toStringId(params.id);
  const draftKey = previewData?.draftKey
    ? { draftKey: previewData.draftKey }
    : {};
  const blog = await client.v1.blogs._id(id).$get({
    query: {
      fields: "id,title,body,publishedAt,tags",
      ...draftKey,
    },
  });

  return {
    props: { blog, ...draftKey },
  };
};

export default Page;
