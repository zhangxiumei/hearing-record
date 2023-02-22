import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json'
import scss from "rollup-plugin-scss"
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue2'
import image from '@rollup/plugin-image'
import replace from '@rollup/plugin-replace'
const path = require('path')

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
});

export default {
  input: "src/index.js",
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, '../src') },
      ],
      customResolver
    }),
    resolve(),
    babel({ exclude: "node_modules/**" }),
    commonjs({
      include: "node_modules/**",
    }),
    scss({
      output: "dist/css/hearing-record.css",
      failOnError: true,
    }),
    json(),
    vue(),
    image(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
