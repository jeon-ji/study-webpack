// npx eslint --init 명령어를 통하여 기본 환경 세팅
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
// // 필요한 옵션 직접 설정 방법
// module.exports = {
//     // 설정한 규칙에 어긋나는 코드를 발견하면 오류를 출력
//     // 규칙 목록 : https://eslint.org/docs/latest/rules/
//     //          : 렌치 표시가 있는 항목은 자동 수정이 가능한 항목
//     rules: {
//         // off/0 = 끔, warn/1 = 경고, error/2 = 오류
//         "no-unexpected-multiline": "error",
//         "no-extra-semi": "error",
//     },
// }
// 미리 설정된 규칙 세트 사용 방법
// module.exports = {
//     extends: [
//         "eslint:recommended",
//     ],
// }