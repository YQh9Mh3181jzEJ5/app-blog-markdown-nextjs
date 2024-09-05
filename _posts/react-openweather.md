---
title: "React + TypeScript で天気アプリを作った体験と学び"
excerpt: "天気情報を表示するアプリを作ったので振り返り"
coverImage: "/assets/blog/react-openweather/cover.jpg"
date: "2024-09-05T13:30:45+0900"
author:
  name: YQh9Mh3181jzEJ5
  picture: "/assets/blog/authors/cat.jpg"
ogImage:
  url: "/assets/blog/react-openweather/cover.jpg"
---

React、TypeScript、OpenWeather API を使って天気アプリを個人開発した。とてもシンプルなアプリだけれど学びも多かったので共有したい。

[開発した天気アプリ](https://weather-app-ruby-nu.vercel.app/)

## 目次

- [目次](#目次)
- [プロジェクト概要](#プロジェクト概要)
- [使用技術とその選定理由](#使用技術とその選定理由)
- [なぜ Next.js ではなく React なのか](#なぜ-nextjs-ではなく-react-なのか)
  - [1. 学習曲線](#1-学習曲線)
  - [2. プロジェクトの規模と要件](#2-プロジェクトの規模と要件)
  - [3. 開発環境のセットアップ](#3-開発環境のセットアップ)
  - [4. パフォーマンスと最適化](#4-パフォーマンスと最適化)
  - [5. デプロイの簡易さ](#5-デプロイの簡易さ)
  - [6. 将来の拡張性](#6-将来の拡張性)
  - [選定理由まとめ](#選定理由まとめ)
- [主要コンポーネントの解説](#主要コンポーネントの解説)
  - [1. Weather.tsx](#1-weathertsx)
  - [2. SearchBar.tsx](#2-searchbartsx)
- [カスタムフックの活用](#カスタムフックの活用)
  - [useWeather.ts](#useweatherts)
- [UI/UX デザインの工夫](#uiux-デザインの工夫)
- [パフォーマンス最適化](#パフォーマンス最適化)
- [開発中に直面した課題と解決策](#開発中に直面した課題と解決策)
  - [1. 非同期処理の扱い:](#1-非同期処理の扱い)
  - [2. 状態管理の複雑さ:](#2-状態管理の複雑さ)
- [学んだこと・気づき](#学んだこと気づき)
- [今後の追加したいこと](#今後の追加したいこと)
- [まとめ](#まとめ)
- [参考リソース](#参考リソース)

## プロジェクト概要

このアプリは、OpenWeather API を利用して「世界中の都市の天気情報をリアルタイム」ことを目標に開発した。

OpenWeather API は以前実務で扱ったこともあるので、わりと予想の範疇で開発を進められれた。

## 使用技術とその選定理由

- React 18.3.1: コンポーネントベースの開発と Virtual DOM による高速な描画が可能
- TypeScript 5.5.3: 静的型チェックによるバグの早期発見と開発効率の向上
- Vite 5.4.3: 高速な開発サーバーと効率的なビルド処理
- Tailwind CSS 3.4.10: 迅速な UI デザインと柔軟なカスタマイズ
- React Icons 5.3.0: 豊富なアイコンライブラリによる UI の強化

概ね最新技術だと思う。というか必須技術なので息をするように扱えるようになりたい。

UI は、最近だと自動で UI を提案する v0 やコンポーネントライブラリっぽい Shadcn/ui が好きだけれど、今回 UI の優先度は低め。

まずは API で 天気情報を fetch して表示する部分の実装を優先した。

## なぜ Next.js ではなく React なのか

Next.js ではなく React にした。まだ Next.js に慣れていないので。

### 1. 学習曲線

- React:

  - コンポーネントベースの開発に焦点を当てた学習が可能
  - 基本的な JavaScript/TypeScript の知識があれば始めやすい
  - 段階的に高度な概念（Hooks, Context API）を学べる

- Next.js:
  - React の知識に加え、サーバーサイドレンダリング（SSR）やファイルベースルーティングなどの追加概念の理解が必要
  - 初心者には少し複雑に感じる可能性がある

### 2. プロジェクトの規模と要件

- 小〜中規模のプロジェクト：

  - React だけで十分対応可能
  - 今回の天気アプリのような比較的シンプルな構造のアプリケーションに最適

- 大規模または特殊要件のあるプロジェクト：
  - SEO 最適化が必須の場合
  - 複雑なルーティングが必要な場合
  - サーバーサイドレンダリングが要求される場合
    → これらの場合は Next.js の方が適している可能性が高い

### 3. 開発環境のセットアップ

- React (with Vite):

```shell
npm create vite@latest my-weather-app -- --template react-ts
cd my-weather-app
npm install
npm run dev
```

- Next.js (App Router)

```shell
npx create-next-app@latest my-weather-app
cd my-weather-app
npm run dev
```

React の方がより軽量で、プロジェクト構造もシンプル。Vite を使用することで、高速な開発環境も実現できる。

ちなみに、Next.js は Webpack らしい。このあたりは正直まだよく分からないので。

> Next.js は、Vite ではなく Webpack を使用しています。これは、Next.js がサーバーサイドレンダリング（SSR）や静的サイト生成（SSG）などの機能を提供するために、Webpack の柔軟性と拡張性を活用しているためです。Webpack は、複雑な依存関係の解決やカスタマイズが可能であり、Next.js のようなフルスタックフレームワークに適しています。

> 一方、Vite は高速な開発環境を提供することに特化しており、ES モジュールを利用して開発時のビルド時間を短縮します。Vite は、特に開発中のホットモジュールリプレースメント（HMR）が高速であることが特徴です。

> Next.js が Webpack を選択している理由としては、以下の点が挙げられます：
> SSR と SSG のサポート: Webpack は、SSR や SSG に必要な複雑なビルドプロセスをサポートするため、Next.js の機能要件に合致しています。
> 拡張性とプラグインエコシステム: Webpack は豊富なプラグインエコシステムを持ち、カスタマイズが容易であるため、大規模なプロジェクトにも対応できます。
> Vite は、開発速度を重視するプロジェクトや、軽量でシンプルな設定を求める場合に適していますが、Next.js のようなフルスタックフレームワークにはまだ十分成熟していない部分もあります

### 4. パフォーマンスと最適化

- React:

  - クライアントサイドレンダリングが基本（ブラウザでレンダリングするので遅いのがデメリット）
  - 必要に応じてコード分割やレンダリング最適化を自分で実装可能

- Next.js:

  - SSR や Static Site Generation (SSG)が組み込まれている（サーバー側でレンダリングするから表示が早い。SEO 対策にも良い）
  - 画像最適化やコード分割などの機能が標準で提供されている

今回の天気アプリではクライアントサイドレンダリングで十分なパフォーマンスが得られるため、React を選択した。

### 5. デプロイの簡易さ

- React:

  - 静的ファイルのホスティングで簡単にデプロイ可能（例：Vercel, Netlify, GitHub Pages）
  - CDN を利用した高速な配信が容易

- Next.js:

  - サーバー環境が必要な場合がある（SSR を使用する場合）
  - Vercel でのデプロイは非常に簡単だが、他のプラットフォームでは少し複雑になる可能性がある

### 6. 将来の拡張性

React を選択しても、将来的に Next.js への移行は比較的容易です。React の基本を押さえておけば、必要に応じて Next.js の機能を追加していくことができます。

### 選定理由まとめ

今回のプロジェクトで React を選んだ主な理由は以下の通り：

- 学習曲線が緩やかで、初心者にも取り組みやすい
- 天気アプリの要件（クライアントサイドレンダリング、シンプルなルーティング）に適している
- 軽量で高速な開発環境を Vite と組み合わせて実現できる
- デプロイが簡単で、様々なホスティングオプションが利用可能

ただし、プロジェクトの要件や規模が変わった場合は、Next.js の採用を検討することも重要。何事もバランス。

個人開発や学習目的では、まず React の基礎を固める必要はある。

## 主要コンポーネントの解説

### 1. Weather.tsx

このコンポーネントは、アプリケーションの中心となる天気情報表示部分。

```tsx
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import WeatherIcon from "./WeatherIcon";
import WeatherInfo from "./WeatherInfo";
import { useWeatherSearch } from "../../hooks/useWeatherSearch";

const Weather: React.FC = () => {
  // カスタムフックを使用してデータ取得ロジックを分離
  const { weatherData, errorMessage, isLoading, handleSearch } =
    useWeatherSearch();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-slate-200 text-center">
        Your Weather, Right Now!
      </h1>
      <div className="flex flex-col max-w-md items-center justify-between gap-3 bg-gradient-to-br from-blue-700 to-purple-600 p-8 rounded-lg shadow-lg backdrop-blur-md">
        {/* 検索バーコンポーネント */}
        <SearchBar onSearch={handleSearch} />

        {/* ローディング状態の表示 */}
        {isLoading && <p className="text-slate-200">Loading...</p>}

        {/* エラーメッセージの表示 */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* 天気データの表示 */}
        {weatherData && (
          <div className="w-full flex flex-col items-center">
            <WeatherIcon iconCode={weatherData.icon} />
            <div className="text-center space-y-2 pb-8">
              <p className="text-slate-200 text-8xl">
                {weatherData.temperature}℃
              </p>
              <p className="text-slate-200 text-4xl">{weatherData.location}</p>
            </div>
            {/* 湿度と風速の情報表示 */}
            <div className="flex items-center justify-between gap-4">
              <WeatherInfo
                icon={WiHumidity}
                value={weatherData.humidity.toString()}
                label="Humidity"
                unit="%"
              />
              <WeatherInfo
                icon={WiStrongWind}
                value={weatherData.windSpeed.toString()}
                unit="km/h"
                label="Wind Speed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
```

このコンポーネントでは、useWeatherSearch カスタムフックを使用してデータの取得と状態管理を行っている。検索、ローディング、エラー表示、そして天気情報の表示を条件付きレンダリングで制御している。

### 2. SearchBar.tsx

検索機能を提供するコンポーネント。

```tsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, useState] = useState<string>("");

  const handleSearch = () => {
    onSearch(inputValue);
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          className="bg-slate-100 py-2 px-6 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          aria-label="Search for a city"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* 入力クリアボタン */}
        <TiDeleteOutline
          className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer"
          onClick={handleClearInput}
        />
      </div>
      {/* 検索ボタン */}
      <div
        className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition duration-300"
        aria-label="Search"
        onClick={handleSearch}
      >
        <FaSearch />
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
```

このコンポーネントでは、入力フィールドの状態管理、検索処理、入力クリア機能を実装した。React.memo を使用してパフォーマンスを最適化している。

## カスタムフックの活用

カスタムフックを使用することで、ロジックを再利用可能な形で分離し、コンポーネントをよりシンプルに保つことができる。

### useWeather.ts

```tsx
import { useState, useCallback } from "react";
import { fetchWeatherData } from "../utils/api";
import { WeatherData } from "../type";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { weatherData, error, isLoading, fetchWeather };
};
```

このカスタムフックは、天気データの取得、エラー処理、ローディング状態の管理を担当する。useCallback を使用して fetchWeather 関数をメモ化し、不要な再レンダリングを防いでいる。

## UI/UX デザインの工夫

- レスポンシブデザイン: Tailwind CSS のユーティリティクラスを活用
- アクセシビリティ: 適切な aria 属性の使用
- ユーザビリティ: 直感的な検索機能と清潔なレイアウト

ただし、良い感じの UI 構築は時間が掛かるので今回は優先度低め。とりあえず UX が良ければ OK。

## パフォーマンス最適化

- React.memo: 不要な再レンダリングを防ぐ。メモ化
- useCallback: 関数の再生成を最小限に抑える
- 条件付きレンダリング: 必要な部分のみ描画

## 開発中に直面した課題と解決策

### 1. 非同期処理の扱い:

課題: API リクエスト中のローディング状態の管理と、エラーハンドリングが複雑だった。
解決策: async/await を使用し、try-catch ブロックでエラーを処理した。

```tsx
try {
  const data = await fetchWeatherData(city);
  setWeatherData(data);
} catch (error) {
  setError("Failed to fetch weather data");
} finally {
  setIsLoading(false);
}
```

`finally`が存在することを半年前まで知らなかった。

### 2. 状態管理の複雑さ:

課題: コンポーネント内で多くの状態を管理する必要があった。
解決策: カスタムフックを作成し、関連する状態とロジックをグループ化しました。

`Redux`や`useReducer`は苦手なので、まずは`useState`で実装した。でも多分、小規模なら`useState`で十分な気がしている。

## 学んだこと・気づき

1. TypeScript の活用:

- 型安全性により、開発時のエラー検出が容易になった
- コード補完機能が向上し、開発効率が上がった

2. カスタムフックの重要性:

- ロジックの再利用性が向上し、コードの重複を減らせた
- テストがしやすくなり、コンポーネントの責務が明確になった

3. Tailwind CSS の効率性:

- クラス名を直接記述することで、スタイリングの速度が大幅に向上した
- デザインの一貫性を保ちやすくなった

## 今後の追加したいこと

大変なので多分やらないけれど、一応。

1. 複数日の天気予報表示:

- OpenWeather API の 5 日間予報エンドポイントを利用して実装
- グラフライブラリ（例：Chart.js）を使用して視覚的に表現

2. ユーザーの位置情報を利用した自動天気表示:

- ブラウザの Geolocation API を使用して実装

正直これが大事だと思っている。

```js
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  fetchWeatherByCoords(latitude, longitude);
});
```

JavaScript の機能に「ブラウザの位置情報を取得する関数」がある。
そこで得られた緯度と経度を openweather API に fetch すると都市名が取得できるはず（実装が増えるので今回はやらなかったけど）。

3. お気に入り都市の保存機能:

- ローカルストレージを使用してユーザーの設定を保存
- 複数のお気に入り都市を管理する UI を追加

4. 詳細な気象データのグラフ表示:

- 温度変化、降水確率などを時系列で表示
- D3.js などの高度なデータビジュアライゼーションライブラリの導入など

## まとめ

シンプルなアプリだけど、実際に動いているのを見ると普通に感動する。
今度は Next.js や Remix など、別のフレームワークを使ってみたい。

## 参考リソース

- React 公式ドキュメント
- TypeScript 公式ドキュメント
- OpenWeather API ドキュメント
- Vite 公式ガイド
