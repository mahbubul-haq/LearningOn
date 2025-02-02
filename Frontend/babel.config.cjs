/* eslint-disable no-undef */
module.exports = {
  plugins: ["babel-plugin-transform-import-meta"],
  presets: [
    ["@babel/preset-env", { targets: { esmodules: true } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",

    [
      "babel-preset-vite",
      {
        env: true,
        glob: false,
      },
    ],
  ],
};
