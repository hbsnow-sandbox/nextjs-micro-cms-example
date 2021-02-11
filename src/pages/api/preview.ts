import { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../utils/api";
import { toStringId } from "../../utils/toStringId";

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.query.secret !== process.env.MICRO_CMS_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const id = toStringId(req.query.id);
  const draftKey = toStringId(req.query.draftKey);
  const post = await client.v1.blogs._id(id).$get({
    query: {
      fields: "id,title,body,publishedAt,tags",
      draftKey,
    },
  });

  if (!post) {
    return res.status(401).json({ message: "Invalid contentId" });
  }

  res.setPreviewData({ ...post, draftKey });
  res.writeHead(307, { Location: `/blogs/${post.id}` });
  res.end();
};

export default preview;
