import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';

// production only
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from "./package.json";
const isPrd = process.env.MODE === 'production';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const ROOT_DIR = "src";

let plugins = [
    cleanup({
        targets: [
            './dist/',
        ]
    }),
    external(),
    resolve(extensions),
    typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/tests/**",
        clean: true,
        useTsconfigDeclarationDir: true,
    }),
    commonjs({
        include: ["node_modules/**"],
    }),
    babel({
        extensions,
        include: [`${ROOT_DIR}/lib/**/*`],
        babelHelpers: 'runtime',
    }),
    postcss(),
]

if (isPrd === true) {
    const prdPlugins = [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        terser(),
    ];
    plugins = plugins.concat(prdPlugins);
}

export default {
    input: `${ROOT_DIR}/lib/index.tsx`,
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
        }
    ],
    plugins,
};
