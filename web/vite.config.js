import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { NOME_JOGO, DESCRICAO_JOGO, CORES } from './src/config.js'

export default defineConfig({
  // caminhos relativos: o build funciona em qualquer subpasta do servidor
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // o globPatterns abaixo já cobre favicon e ícones; sem isto eles entram duas vezes no precache
      includeManifestIcons: false,
      manifest: {
        name: NOME_JOGO,
        short_name: NOME_JOGO,
        description: DESCRICAO_JOGO,
        lang: 'pt-BR',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'any',
        theme_color: CORES.tinta,
        background_color: CORES.gema,
        icons: [
          { src: 'icones/icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icones/icone-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icones/icone-mascara-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // tudo em cache na primeira visita: as 150 cartas precisam abrir sem rede
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
