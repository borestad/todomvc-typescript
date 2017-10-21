module.exports = function (wallaby) {
  var path = require('path')
  console.log(wallaby.projectCacheDir)
  process.env.NODE_PATH += path.delimiter + path.join(wallaby.projectCacheDir, '@src');

    return {
      files: [
        'src/**/*.ts?(x)',
        '!src/**/*.test.ts?(x)',
        'src/**/*.snap',
        "tsconfig.json",
        "node_modules/@src/**/*.ts?(x)"
      ],

      tests: [
        'src/**/*.test.ts?(x)'
      ],

      env: {
        type: 'node',
        runner: 'node'
      },

      preprocessors: {
        '**/*.js': file => require('babel-core').transform(
          file.content,
          {sourceMap: true, presets: ['babel-preset-jest']})
      },

      // or any other supported testing framework:
      // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
      testFramework: 'jest',

      debug: true
    };
  };
