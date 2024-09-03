import Link from "next/link";
import Avatar from "./avatar";

const name = "YQh9Mh3181jzEJ5";
const picture = "/assets/blog/authors/cat.jpg";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-4 md:mb-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        Tech Blog
      </h1>
      <Link href="https://github.com/YQh9Mh3181jzEJ5">
        <Avatar name={name} picture={picture} />
      </Link>
    </section>
  );
}
