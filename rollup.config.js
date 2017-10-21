import typescript from 'rollup-plugin-typescript'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'


export default {
  input: 'src/app.tsx',
  name: 'app',
  output: {
    file: './dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    uglify({}, minify)
  ]
}
