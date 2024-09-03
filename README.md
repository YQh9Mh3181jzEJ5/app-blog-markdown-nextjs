# Tech Blog README 📝

## プロジェクト概要 🌟

このプロジェクトは、Next.js、Markdown、TypeScript を使用して構築された静的に生成されるブログサイトです。Zenn 風のコードスニペット表示機能も実装されています。

URL: https://blog-sample-9c91d.web.app/

## 主な機能 🚀

- 静的サイト生成（SSG）によるブログ記事の表示
- Markdown ファイルを使用したコンテンツ管理
- ダークモード対応
- Zenn 風のコードスニペット表示
- レスポンシブデザイン

## 技術スタック 🛠️

- Next.js
- TypeScript
- Tailwind CSS
- Zenn 関連ライブラリ（zenn-markdown-html, zenn-embed-elements）
- Firebase Hosting

## ブログ記事の追加方法 ✍️

1. \_posts ディレクトリに新しい Markdown ファイルを作成します。
2. ファイル名は YYYY-MM-DD-title.md の形式にします。
3. ファイルの先頭に Front Matter を記述し、必要なメタデータを追加します。
4. Markdown 形式で記事本文を書きます。

## カスタマイズ方法 🎨

- src/app/\_components ディレクトリ内のコンポーネントを編集して UI をカスタマイズできます。
- tailwind.config.ts ファイルで Tailwind CSS の設定をカスタマイズできます。
- src/app/globals.css でグローバルなスタイルを追加・変更できます。
