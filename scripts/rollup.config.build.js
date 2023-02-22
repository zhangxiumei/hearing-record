
const glob = require("glob")
const list = {};
async function makeList(dirpath, list) {
  const files = glob.sync(dirpath + '/**/index.js')
  for (let file of files) {
    const component = file.split(/[/.]/)[2]
    list[component] = file
  }

}
makeList('src/components', list)
import filesize from "rollup-plugin-filesize";
import { minify } from "uglify-es";
import baseConfig from "./rollup.config.base.js";
import { name, version } from "../package.json";
// banner
const banner =
  `${"/*!\n" + " * "}${name}.js v${version}\n` +
  " * Released under the MIT License.\n" +
  " */";
// 支持输出 []
baseConfig.input = list
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        dir: `dist`,
        name,
        banner,
      },

    ],
    plugins: [...baseConfig.plugins, minify(), filesize()],
  }
];

