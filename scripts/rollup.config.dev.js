import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import baseConfig from "./rollup.config.base.js";
import { name } from "../package.json";
const glob = require("glob")
const list = {};
async function makeList(dirpath, list) {
  const files = glob.sync(dirpath + '/**/index.js')
  console.log(files)
  for (let file of files) {
    const component = file.split(/[/.]/)
    list[component] = '${file}'
  }
}
makeList('src/components/', list)
// 支持输出 []
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        file: `dist/${name}.js`,
        format: "umd",
        name: name,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      // 热更新 默认监听根文件夹
      livereload(),
      // 本地服务器
      serve({
        open: true, // 自动打开页面
        port: 8006,
        openPage: "/index.html", // 打开的页面
        contentBase: "./",
      }),
    ],
  },
];
