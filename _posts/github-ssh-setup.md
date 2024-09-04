---
title: "Git/GItHubでSSHを導入する方法"
excerpt: "Git と GitHub で SSH を使用してセキュアな開発環境を構築する方法を解説。SSH キーの生成から GitHub への登録、既存プロジェクトの SSH 化まで、ステップバイステップで説明します。"
coverImage: "/assets/blog/github-ssh-setup/cover.jpg"
date: "2024-09-04T20:19:45+0900"
author:
  name: YQh9Mh3181jzEJ5
  picture: "/assets/blog/authors/cat.jpg"
ogImage:
  url: "/assets/blog/github-ssh-setup/cover.jpg"
---

今回は、 Git と GitHub で、SSH を使う方法について解説する。
SSH を使うと、より安全で便利に開発ができるようになる 😊

## SSH って何？なぜ使うの？

SSH（Secure Shell）は、ネットワーク上で安全に通信を行うためのプロトコルです。

主な特徴は:

- 強力な暗号化: 通信内容が第三者に盗聴されるリスクを大幅に低減します。
- 公開鍵暗号方式: パスワード認証よりも安全な認証方法を提供します。
- 完全性保証: データが改ざんされていないことを確認できます。

GitHub で SSH を使用する利点:

- セキュリティの向上: パスワードの代わりに鍵ペアを使用するため、アカウントの乗っ取りリスクが低下します。
- 利便性: パスワードを入力する必要がなくなり、操作が簡単になります。
- CI/CD との親和性: 自動化ツールとの連携が容易になります。

これらの特徴により、SSH はソフトウェア開発において重要なツールとなっています。

## GitHub アカウントの作成

SSH の設定前に、まず GitHub のアカウントを作成しましょう。

1. GitHub 公式サイト（https://github.com）にアクセス
2. 「Sign up」ボタンをクリック
3. メールアドレス、パスワード、ユーザー名を入力
4. 画面の指示に従って登録を完了

## SSH キーの生成

では、実際に SSH キーを作成していきましょう。ここでは、zsh というシェルを使用します。

```shell
# SSH キーを生成するコマンド
# -t ed25519 は暗号化方式の指定、-C "メールアドレス" はコメント（識別用）
ssh-keygen -t ed25519 -C "your_email@example.com"

# オプションの説明:
# -t ed25519: 最新の暗号化アルゴリズムを指定（RSAよりも安全で高速）
# -C "your_email@example.com": キーを識別するためのコメント（通常はメールアドレス）

# 鍵の保存場所を聞かれるので、デフォルトのまま Enter を押す
# パスフレーズを設定するか聞かれるので、必要に応じて設定する（推奨）

# 注意:
# - 秘密鍵（id_ed25519）は絶対に他人と共有しないこと。
# - 公開鍵（id_ed25519.pub）のみをGitHubに登録する。
# - 強力なパスフレーズを使用することを強く推奨。
```

これで、~/.ssh/id_ed25519（秘密鍵）と~/.ssh/id_ed25519.pub（公開鍵）が生成されました。

## GitHub に SSH 公開キーを追加

次に、生成した公開鍵を GitHub に登録します。

1. 公開鍵の内容をコピー

```shell
# 公開鍵の内容を表示してコピー
cat ~/.ssh/id_ed25519.pub
```

2. GitHub にログイン
3. 右上のプロフィールアイコンをクリック →「Settings」を選択
4. 左側メニューの「SSH and GPG keys」をクリック
5. 「New SSH key」ボタンをクリック
6. タイトルを入力（例：「My Laptop」）し、Key にコピーした公開鍵を貼り付け
7. 「Add SSH key」をクリック

これで、GitHub に SSH 公開キーが登録されました！🎉

## Git の初期設定

GitHub との連携がスムーズになるよう、Git の初期設定を行います。

```shell
# ユーザー名の設定（GitのCommitにログとして残る。第三者バレたくなければ自由に設定）
git config --global user.name "Your Name"

# メールアドレスの設定（これもバレるので注意。使えないメールアドレスも有効）
git config --global user.email "your_email@example.com"
```

## プロジェクトを SSH 化する

既存のプロジェクトを SSH 接続に変更する方法を紹介します。

```shell
# プロジェクトのディレクトリに移動
cd path/to/your/project

# 現在のリモート URL を確認
git remote -v

# リモート URL を SSH 形式に変更
git remote set-url origin git@github.com:username/repository.git

# 変更後の URL を確認
git remote -v
```

これで、プロジェクトが SSH 接続を使用するようになりました！
新しいプロジェクトを始める場合は、クローンする際に SSH URL を使用すれば、自動的に SSH 接続が設定されます。

```shell
# SSH を使用してプロジェクトをクローン
git clone git@github.com:username/repository.git
```

## トラブルシューティング

1. SSH の接続テスト:

```shell
ssh -T git@github.com
```

"Hi username! You've successfully authenticated..." というメッセージが表示されれば成功です。

2. Permission denied エラーが出る場合:

SSH エージェントが実行されているか確認:

```shell
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

GitHub に正しい公開鍵が登録されているか再確認してください。

3. known_hosts ファイルの更新:

初めて GitHub に接続する際、フィンガープリントの確認を求められます。「yes」と答えて進めてください。

## まとめ

これで Git/GitHub で SSH を使う準備が整いました。SSH を使うことで、より安全で効率的な開発環境を手に入れることができます。

ポイントをおさらい：

- SSH は安全で便利な通信方法
- SSH キーの生成と GitHub への登録が重要
- 既存プロジェクトはリモート URL の変更で SSH 化可能
- 新規プロジェクトは SSH URL でクローンすれば OK

おわり 😊
