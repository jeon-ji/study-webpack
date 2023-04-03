const path = require("path");

module.exports = {
    mode: 'development',
    entry: {  // 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
      main: "./src/app.js"
    },
    output: {   // 웹팩을 돌리고 난 결과물의 파일 경로
      filename: "[name].js",    // entry에 선언된 값 자동 기입
      path: path.resolve("./dist")  // output 파일 dist 폴더에 저장
    },
}