import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import theme from './src/theme/theme'
import envConfig from './env'
import path from 'path';
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
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, './src'),
    }
  },
  // 另外一种方式
  // resolve: {
  //   alias: [
  //     {
  //       find: /#/,
  //       replacement: path.join(__dirname, './src/')
  //     }
  //   ]
  // },
	server: {
    port: 3001, // 开发环境启动的端口
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://47.99.134.126:28019/api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  },
  // antd 按需引入
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
