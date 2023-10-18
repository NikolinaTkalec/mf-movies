const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      port: 8500,
    },

    externals: [/^@serengeti\/.+/],
  },
});
