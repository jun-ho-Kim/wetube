const path = require("path");

const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "src" ,"assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "src", "static");
// require('core-js/es6');
const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  // mode: MODE,
  mode: MODE.replace(/\s/g,""),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};
module.exports = config;





// const path = require("path");
// const autoprefixer = require("autoprefixer");
// const ExtractCSS = require("extract-text-webpack-plugin");

// const MODE = process.env.WEBPACK_ENV;
// const ENRTY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// const OUTPUT_DIR = path.join(__dirname, "static");
// // static 파일을 자동생성해서 그 안에 데이터를 넣는다.

// const config = {
//     entry: ["@babel/polyfill", ENTRY_FILE],
//     mode: MODE,
//     // mode: MODE.replace(/\s/g,""),
//     module: {
//         // module을 발견할 때마다 다음과 같은 rule을 따르라는 것.
//         rules: [
//             {
//                 test: /\.(js)$/,
//                 use: [
//                     {
//                         loader: "babel-loader"
//                     }
//                 ]
//             },
//             {
//                 //.scss로 끝나는 module을 만나면 이 plugin을 사용하라.
//                 test: /\.(scss)$/,
//                 //ExtractCss로 그 부분만 실행시켜준다.
//                 use: ExtractCSS.extract([
//                     {
//                     //CSS를 가져와 준다..
//                         loader: "css-loader"
//                     },
//                     {
//                     // CSS를 받아서 plugin을 가지고 CSS를 실행시켜준다.
//                         loader: "postcss-loader",
//                         options: {
//                             plugins() {
//                                 return [autoprefixer({browsers: "cover 99.5%"})];
//                             }
//                         }
//                     },
//                     {
//                     // Sass 혹은 scss를 받아서 일반 CSS로 바꾸어 줄 수 있다.
//                         loader: "sass-loader"
//                     }
//         ])
//             }
//         ]
//     },
//     output: {
//         path: OUTPUT_DIR,
//         filename: "[name].js"
//     },
//     plugins: [new ExtractCSS("styles.css")]
// };

// module.exports = config;
