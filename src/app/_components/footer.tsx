import Container from "@/app/_components/container";
import Link from "next/link";
import Avatar from "./avatar";
const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-8 flex flex-col items-center">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </nav>
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="https://github.com/YQh9Mh3181jzEJ5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Avatar
                name="YQh9Mh3181jzEJ5"
                picture="/assets/blog/authors/cat.jpg"
              />
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Tech Blog. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
