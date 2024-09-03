import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;

  slug: string;
};

export function PostPreview({ title, coverImage, date, slug }: Props) {
  return (
    <div className="flex flex-row my-4">
      <div className="w-32 h-32">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-xl">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            {title}
          </Link>
        </h3>
        <div className="text-xs my-2">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}
