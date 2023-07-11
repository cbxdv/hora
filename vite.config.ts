import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@appTypes': path.resolve(__dirname, './src/@types/'),
            '@redux': path.resolve(__dirname, './src/redux/'),
            '@assets': path.resolve(__dirname, './src/assets/'),
            '@utils': path.resolve(__dirname, './src/utilities/'),
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@hooks': path.resolve(__dirname, './src/hooks/')
        }
    },
    base: '/hora/'
})
