import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import theme from './src/theme/theme'
import envConfig from './env'
// import path from 'path';
// import fs from 'fs';
// https://vitejs.dev/config/
const env = process.argv[process.argv.length - 1]
const base = envConfig[env]
export default defineConfig({
  base: base.cdn,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: theme
      },
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        }
      ]
    })
  ]
})
console.log('process:::env', process.argv)
