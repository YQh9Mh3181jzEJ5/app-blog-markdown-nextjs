"use client";

import { useEffect } from "react";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Post } from "@/interfaces/post";

type ClientPostProps = {
  post: Post;
  content: string;
};

export default function ClientPost({ post, content }: ClientPostProps) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <article className="mb-16">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
        />
        <PostBody content={content} />
      </article>
    </>
  );
}
