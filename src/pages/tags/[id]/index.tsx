import React from "react";

import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { CommonListContents } from "../../../types/api";
import { Blog } from "../../../types/blog";
import { client } from "../../../utils/api";
import { toStringId } from "../../../utils/toStringId";

type Props = {
  blogList: CommonListContents<Blog>;
};

const Page: NextPage<Props> = (props) => {
  const { blogList } = props;

  return (
    <main>
      <h1>タグ一覧</h1>
      <ul>
        {blogList.contents.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
  paths: string[];
}> => {
  const tagList = await client.v1.tags.$get({
    query: { fields: "id" },
  });

  return {
    fallback: false,
    paths: tagList.contents.map((blog) => `/tags/${blog.id}/`),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    throw new Error("Error! ID not found");
  }

  const id = toStringId(params.id);
  const blogList = await client.v1.blogs.$get({
    query: {
      fields: "id,title",
      filters: `tags[contains]${id}`,
    },
  });

  return {
    props: { blogList },
  };
};

export default Page;
