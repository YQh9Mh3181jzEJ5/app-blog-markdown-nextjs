import Link from "next/link";
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
    <div className="flex flex-col mb-10">
      <div>
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>

      <h3 className="text-xl py-2">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {title}
        </Link>
      </h3>
      <div className="text-xs">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
}
