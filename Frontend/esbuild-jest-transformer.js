/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { transformSync } from "esbuild";
// const {transformSync} = require("esbuild")

export default {
  process(src, filename) {
    return transformSync(src, {
      loader: 'jsx',  // Use the 'tsx' loader to enable JSX and TypeScript support
      target: 'esnext',  // Specify the ECMAScript target
      jsx: 'automatic',  // Use the 'automatic' runtime for JSX (for React 17+)
    });
  },
};