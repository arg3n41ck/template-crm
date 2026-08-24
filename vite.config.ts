import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routeToken: 'layout',
        routesDirectory: './src/pages',
        generatedRouteTree: './src/routeTree.gen.ts',
        routeFileIgnorePrefix: '-',
        quoteStyle: 'single',
      }),
      tailwindcss(),
      react(),
    ],
    resolve: {
      alias: {
        '@shared': `${import.meta.dirname}/src/shared`,
        '@app': `${import.meta.dirname}/src/app`,
        '@modules': `${import.meta.dirname}/src/modules`,
        '@': `${import.meta.dirname}/src`,
      },
    },
    server: {
      host: true,
      port: 3000,
      proxy: env.VITE_API_URL
        ? { '/api': { target: env.VITE_API_URL, changeOrigin: true } }
        : undefined,
    },
    build: {
      sourcemap: mode === 'development',
      target: 'esnext',
    },
  }
})
