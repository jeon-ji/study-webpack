const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // default export 되어있지 않음
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {  // 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
    main: './src/app.js'
  },
  output: {   // 웹팩을 돌리고 난 결과물의 파일 경로
    filename: "[name].js",    // entry에 선언된 값 자동 기입
    path: path.resolve("./dist")  // output 파일 dist 폴더에 저장
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:8081"
    },
    client: {
      overlay: true,    // 빌드시 에러나 경고를 브라우저 화면에 표시
    }
    // contentBase: path.join(__dirname, "dist"),    // 정적파일을 제공할 경로(기본 웹팩 아웃풋)
    // publicPath: "/",    // 브라우저를 통해 접근하는 경로(기본 '/')
    // host: "dev.domain.com",   // 개발환경에서 도메인 맞춰야할 때 사용
    // port: 8081,   // 개발 서버 포트 번호를 설정(기본 8080)
    // stats option ==> webpack5에서 webpack-dev-middleware로 변경됨.
    // historyApiFallback: true,   // 히스토리 API를 사용하는 SPA 개발시 설정(404 발생 시 index.html로 리다이렉트)
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        // style-loader: 처리된 javascript 문자열로 되어있는 코드를 HTML에 적용
        // css-loader: css 파일을 javascript 모듈처럼 사용할 수 있도록 처리
        // use: 뒤에서부터 적용
        use: [
          // 운영 환경에서 css 파일 추출하도록 조건 추가
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader   // 운영 환경
          :'style-loader',    // 개발 환경
          'css-loader',
          'sass-loader'
        ]
      },
      // webpack 5에서 추가된 모듈 유형(asset, source, resource, inline)
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset", // 40KB(default) 미만은 inline, 이상은 resource로 대처
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 기준을 20KB 로 변경
          },
        },
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   // file-loader: 이미지 파일을 모듈로 사용할 수 있도록 변환. 사용 파일은 output 경로에 이동.
      //   // loader: 'file-loader',
      //   // url-loader: 파일을 base64로 인코딩해서 결과를 javascript 문자열로 변환. 처리할 파일의 크기 설정.
      //   loader: 'url-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]',
      //     publicPath: './dist',
      //     limit: 10000,  // limit 미만은 javascript 문자열, limit 이상은 파일 형태로 로더
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,  // node_modules 파일 제거
        loader: "babel-loader",
      },
    ]
  },
  plugins: [
    // 번들링된 결과물 상단에 빌드 정보 추가 가능
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${new childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${new childProcess.execSync('git config user.name')}
      `
    }),
    // 빌드 과정에 html도 포함하기 때문에 보다 의존적이지 않은 코드로 관리 가능
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 변수에 데이터를 주입시켜 동적으로 HTML 코드를 생성
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      // 운영 환경에서 파일을 압축하고 불필요한 주석을 제거
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석 제거
      }: null
    }),
    // 빌드 이전 결과물을 제거
    new CleanWebpackPlugin(),
    // 번들된 javascript 코드에서 css 파일만 따로 추출하여 파일 생성
    // 운영 환경에서 css 파일을 따로 추출
    // loader 설정 필요
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []
    )
  ]
}
