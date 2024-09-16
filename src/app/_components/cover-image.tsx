import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="aspect-w-16 aspect-h-9 relative">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          className={cn("shadow-sm w-full", {
            "rounded-md": slug,
          })}
          layout="fill"
        />
      </div>
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
