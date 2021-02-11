import React from "react";

import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { CommonListContents } from "../types/api";
import { Blog } from "../types/blog";
import { SiteData } from "../types/siteData";
import { client } from "../utils/api";

type Props = {
  siteData: SiteData;
  blogList: CommonListContents<Blog>;
};

const Page: NextPage<Props> = (props) => {
  const { siteData, blogList } = props;

  return (
    <main>
      <h1>{siteData.title}</h1>
      <section>
        <h2>ブログ一覧</h2>
        <ul>
          {blogList.contents.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await client.v1.sitedata.$get({
    query: { fields: "title" },
  });

  const blogList = await client.v1.blogs.$get({
    query: { fields: "id,title" },
  });

  return {
    props: { siteData, blogList },
    revalidate: 60,
  };
};

export default Page;
