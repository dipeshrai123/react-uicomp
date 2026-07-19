import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

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

const dtsConfig = {
  input: ".dts-temp/index.d.ts",
  output: {
    file: "dist/index.d.ts",
    format: "es",
  },
  plugins: [dts()],
};

export default [mainConfig, dtsConfig];
