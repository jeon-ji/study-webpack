// 하나씩 plugin을 추가하고 exports하는 작업은 옛날 방식
// module.exports = {
//     plugins: [
//         // const, let 처럼 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 var 변경
//         "@babel/plugin-transform-block-scoping",
//         // 화살표 함수를 일반 함수로 변경경
//         "@babel/plugin-transform-arrow-functions",
//         // 엄격 모드를 사용
//         "@babel/plugin-transform-strict-mode",
//     ],
// }

// 목적에 맞게 여러가지 플러그인을 세트로 모아놓은 프리셋을 사용한다.
module.exports = {
    presets: [
        [
            // 설정하고자 하는 브라우저를 선택
            "@babel/preset-env",
            {
                targets: {
                    chrome: "79", // 크롬 79까지 지원하는 코드를 만든다
                    ie: "11", // ie 11까지 지원하는 코드를 만든다
                },
                useBuiltIns: "usage", // 폴리필 사용 방식 지정
                corejs: {
                  // 폴리필 버전 지정
                  version: 2,
                },
            },
        ],
    ],
}