import path from 'path'

import type { Configuration } from 'webpack'

import { plugins } from './webpack.plugins'
import { rules } from './webpack.rules'

rules.push({
    test: /\.css$/,
    use: [{ loader: `style-loader` }, { loader: `css-loader` }]
})

export const rendererConfig: Configuration = {
    module: {
        rules
    },
    plugins,
    resolve: {
        extensions: [`.js`, `.ts`, `.jsx`, `.tsx`, `.css`],
        alias: {
            '@components': path.resolve(__dirname, `./src/components`),
            '@appTypes': path.resolve(__dirname, `./src/@types`),
            '@redux': path.resolve(__dirname, `./src/redux`),
            '@assets': path.resolve(__dirname, `./src/assets`),
            '@utils': path.resolve(__dirname, `./src/utilities`),
            '@styles': path.resolve(__dirname, `./src/styles`)
        }
    }
}
