import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import type { ForgeConfig } from '@electron-forge/shared-types'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
        icon: `./build/icon`,
        appCopyright: `cbxdv`,
        appBundleId: `com.cbxdv.hora`,
        appCategoryType: `public.app-category.productivity`
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            name: `hora`,
            iconUrl: `https://raw.githubusercontent.com/cbxdv/hora/main/build/icon.ico`,
            setupIcon: `./build/icon.ico`
        }),
        new MakerZIP({}),
        new MakerRpm({}),
        new MakerDeb({}),
        new MakerDMG({
            name: `hora`,
            icon: `./build/icon.icns`
        })
    ],
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: `./src/index.html`,
                        js: `./src/renderer.ts`,
                        name: `main_window`,
                        preload: {
                            js: `./src/electron/preload.ts`
                        }
                    }
                ]
            }
        })
    ],
    publishers: [
        {
            name: `@electron-forge/publisher-github`,
            config: {
                repository: {
                    owner: `cbxdv`,
                    name: `hora`
                },
                prerelease: true
            }
        }
    ]
}

export default config
