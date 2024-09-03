# Tech Blog README 📝
## プロジェクト概要 🌟
このプロジェクトは、Next.js、Markdown、TypeScriptを使用して構築された静的に生成されるブログサイトです。Zenn風のコードスニペット表示機能も実装されています。
## 主な機能 🚀

- 静的サイト生成（SSG）によるブログ記事の表示
- Markdownファイルを使用したコンテンツ管理
- ダークモード対応
- Zenn風のコードスニペット表示
- レスポンシブデザイン

## 技術スタック 🛠️

- Next.js
- TypeScript
- Tailwind CSS
- Zenn関連ライブラリ（zenn-markdown-html, zenn-embed-elements）
- Firebase Hosting

## ブログ記事の追加方法 ✍️

1. _posts ディレクトリに新しいMarkdownファイルを作成します。
2. ファイル名は YYYY-MM-DD-title.md の形式にします。
3. ファイルの先頭にFront Matterを記述し、必要なメタデータを追加します。
4. Markdown形式で記事本文を書きます。

## カスタマイズ方法 🎨

- src/app/_components ディレクトリ内のコンポーネントを編集してUIをカスタマイズできます。
- tailwind.config.ts ファイルでTailwind CSSの設定をカスタマイズできます。
- src/app/globals.css でグローバルなスタイルを追加・変更できます。