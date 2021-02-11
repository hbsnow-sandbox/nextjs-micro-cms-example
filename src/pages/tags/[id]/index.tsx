import React from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
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
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    throw new Error("Error: ID not found");
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
    revalidate: 600,
  };
};

export default Page;
