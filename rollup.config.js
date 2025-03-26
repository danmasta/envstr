import pluginAlias from '@rollup/plugin-alias';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import pluginJson from '@rollup/plugin-json';
import { resolve } from 'node:path';

let root = import.meta.dirname;

export default [
    {
        input: [
            'bin/envstr.js'
        ],
        output: {
            file: 'build/js/bundle.js',
            format: 'esm',
            sourcemap: false,
            strict: false,
            preserveModules: false,
            exports: 'named',
            entryFileNames: '[name].js',
            esModule: false,
            inlineDynamicImports: true
        },
        external: [
            'qjs:os',
            'qjs:std'
        ],
        plugins: [
            pluginAlias({
                entries: [
                    { find: /^node:(.+)$/, replacement: resolve(root, 'node_modules/lo/dist/qjs/polyfill/qjs/$1.js') }
                ]
            }),
            pluginNodeResolve({
                exportConditions: ['qjs', 'default', 'import']
            }),
            pluginJson({
                namedExports: false
            })
        ]
    }
]
