# react_native_list_prototype

#### 概要
* 簡易リストページを表示するアプリ

#### 環境構築
```
$ brew install node
$ brew install watchman
$ brew install flow
```

#### react-native プロジェクトの生成
```
$ react-native init hogeProject

# versionを指定する場合
$ react-native init hogeProject --version 0.49.0
```

#### ライブラリのインストール
```
$ npm install -g react-native-cli
```

#### シュミレーターの起動
```
１．できあがったプロジェクトファイル内のreact_test_project.xcodeprojをダブルクリックで起動
２．ターミナルウィンドウが立ち上がりますがこれは閉じないでそのまま
３．IOSシュミレーターが立ち上がります
４．もし立ち上がらない場合
　$ react-native run-ios
 で起動させる
```

#### 開発tips
* シュミレーターでCmd + Rでコード修正分がすぐに反映できる
* シュミレーターでCmd + Dでデバッグなどができるサブメニュー表示ができる
* 最新versionではcreateClassプロパティが使えないため、ネットであさったコードはそのまま使えない
