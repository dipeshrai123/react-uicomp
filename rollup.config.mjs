import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" with { type: "json" };

const mainConfig = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.module || pkg.main.replace(".js", ".mjs"),
      format: "es",
      exports: "named",
      sourcemap: false,
      strict: false,
      compact: true,
    },
  ],
  plugins: [
    postcss({
      // autoModules (default true) scopes classnames only for *.module.css
      // files; plain .css (tokens, @font-face) passes through unscoped.
      extract: "style.css",
      minimize: true,
    }),
    typescript({
      tsconfig: "tsconfig.json",
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: ".dts-temp",
          declarationMap: false,
        },
      },
    }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime", "react-ui-animate"],
};

// TypeScript always preserves bare side-effect imports (`import "./x.css"`)
// verbatim in emitted .d.ts output, since it can't prove omitting them is
// safe. rollup-plugin-dts then tries to actually resolve those specifiers,
// which fails since dts bundling has no CSS loader. They carry no types, so
// resolve them to an empty module instead of teaching dts about CSS.
const ignoreCss = {
  name: "ignore-css",
  resolveId(source) {
    return source.endsWith(".css") ? source : null;
  },
  load(id) {
    return id.endsWith(".css") ? "" : null;
  },
};

const dtsConfig = {
  input: ".dts-temp/index.d.ts",
  output: {
    file: "dist/index.d.ts",
    format: "es",
  },
  plugins: [ignoreCss, dts()],
};

export default [mainConfig, dtsConfig];
