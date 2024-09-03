import markdownToHtml from "zenn-markdown-html";

export default async function convertMarkdownToHtml(markdown: string) {
  return markdownToHtml(markdown);
}
