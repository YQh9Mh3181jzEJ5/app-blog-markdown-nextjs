---
title: "TypeScriptの型一覧と使い方"
excerpt: "TypeScriptの型一覧と使い方"
coverImage: "/assets/blog/typescript-types-guide/cover.jpg"
date: "2024-09-04T10:30:45+0900"
author:
  name: YQh9Mh3181jzEJ5
  picture: "/assets/blog/authors/cat.jpg"
ogImage:
  url: "/assets/blog/typescript-types-guide/cover.jpg"
---

TypeScript は、JavaScript に静的型付けを追加した言語です。Microsoft 社が開発し、JavaScript の上位集合（スーパーセット）として設計されています。

## TypeScript のメリット・デメリット

### メリット 👍

- 型安全性: コンパイル時にエラーを検出できる
- コード補完: IDE での開発効率が向上する
- ドキュメンテーション: コードの理解しやすさが向上する
- 大規模開発: チーム開発やメンテナンスが容易になる

### デメリット 👎

- 学習コスト: 新しい概念や構文を学ぶ必要がある
- コンパイル時間: JavaScript に変換する時間が必要
- 設定の複雑さ: プロジェクト設定が複雑になる場合がある

## よく使う型と具体的な使い方

1. プリミティブ型

```ts
// 文字列
let name: string = "John";

// 数値
let age: number = 30;

// 真偽値
let isStudent: boolean = true;

// null
let empty: null = null;

// undefined
let notDefined: undefined = undefined;

// シンボル
let uniqueKey: symbol = Symbol("key");
```

2. 配列

```ts
// 数値の配列
let numbers: number[] = [1, 2, 3, 4, 5];

// 文字列の配列（別の書き方）
let fruits: Array<string> = ["apple", "banana", "orange"];
```

3. オブジェクト

```ts
// オブジェクトの型定義
let person: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

// インターフェースを使用した型定義
interface Person {
  name: string;
  age: number;
}

let employee: Person = {
  name: "Bob",
  age: 30,
};
```

4. 関数

```ts
// 関数の型定義
function add(a: number, b: number): number {
return a + b;
}

// アロー関数の型定義
const multiply = (a: number, b: number): number => a \* b;

// オプショナルパラメータ
function greet(name: string, greeting?: string): string {
return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

```

5. ユニオン型

```ts
// 複数の型を許容する
let id: string | number;
id = "abc123"; // OK
id = 456; // OK
// id = true; // エラー
```

6. タプル

```ts
// 固定長の配列で各要素の型を指定
let coordinate: [number, number] = [10, 20];
```

7.  列挙型（Enum）

```ts
Color {
Red,
Green,
Blue
}

let favoriteColor: Color = Color.Blue;
```

8. Any 型

```ts
// どんな型でも許容する（型チェックを無効化）
let flexible: any = 4;
flexible = "string";
flexible = true;
```

9. Unknown 型

```ts
// any よりも安全な、型が不明な値を表す型
let userInput: unknown;
userInput = 5;
userInput = "hello";

// unknown 型の値は型チェックが必要
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}
```

10. Void 型

```ts
// 戻り値がない関数の型
function logMessage(message: string): void {
  console.log(message);
}
```

11. Never 型

```ts
// 決して発生しない値の型
function throwError(message: string): never {
  throw new Error(message);
}
```

## 参考

- TypeScript
  https://www.typescriptlang.org/

- サバイバル TypeScript
  https://typescriptbook.jp/

## まとめ

- 初学者は、まずプリミティブ型、配列、オブジェクト、関数の型定義から始め、徐々に高度な型を学んでいくことをおすすめします。
- 実際のプロジェクトで使用しながら、型の利点を体感していくことが大切です。
- TypeScript の型システムをマスターすることで、より堅牢で保守性の高いコードを書けるようになります

😊
