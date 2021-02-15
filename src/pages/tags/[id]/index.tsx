import React from "react";

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { ListContentsResponse } from "../../../types/api";
import { BlogResponse } from "../../../types/blog";
import { client } from "../../../utils/api";
import { toStringId } from "../../../utils/toStringId";

type StaticProps = {
  blogList: ListContentsResponse<BlogResponse>;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
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
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;

  if (!params?.id) {
    throw new Error("Error: ID not found");
  }

  const id = toStringId(params.id);

  try {
    const blogList = await client.v1.blogs.$get({
      query: {
        fields: "id,title",
        filters: `tags[contains]${id}`,
      },
    });
    return {
      props: { blogList },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
