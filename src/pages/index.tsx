import React from "react";

import { GetStaticProps, NextPage } from "next";

import { CommonListContents } from "../types/api";
import { Blog } from "../types/blog";
import { client } from "../utils/api";

type Props = {
  blogList: CommonListContents<Blog>;
};

const Page: NextPage<Props> = (props) => {
  const { blogList } = props;

  return (
    <main>
      <ul>
        {blogList.contents.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const blogList = await client.v1.blogs.$get({
    query: { fields: "id,title" },
  });

  return {
    props: {
      blogList,
    },
  };
};

export default Page;
