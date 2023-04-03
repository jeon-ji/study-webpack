const path = require('path');

module.exports = {
  mode: 'development',
  entry: {  // 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
    main: './src/app.js'
  },
  output: {   // 웹팩을 돌리고 난 결과물의 파일 경로
    filename: "[name].js",    // entry에 선언된 값 자동 기입
    path: path.resolve("./dist")  // output 파일 dist 폴더에 저장
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // style-loader: 처리된 javascript 문자열로 되어있는 코드를 HTML에 적용
        // css-loader: css 파일을 javascript 모듈처럼 사용할 수 있도록 처리
        // use: 뒤에서부터 적용
        use: ['style-loader', 'css-loader']
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
    ]
  }
}
