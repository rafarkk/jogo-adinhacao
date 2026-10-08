// Gera o favicon e os ícones do PWA em public/. Uso: npm run icones
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { CORES } from '../src/config.js'

const publico = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// `escala` encolhe a carta para caber na área segura dos ícones mascaráveis
const icone = (escala = 1, cantos = 96) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${cantos}" fill="${CORES.gema}"/>
  <g transform="translate(256 256) scale(${escala}) rotate(-8) translate(-256 -256)">
    <rect x="126" y="78" width="260" height="356" rx="40" fill="${CORES.tinta}" transform="translate(0 18)"/>
    <rect x="126" y="78" width="260" height="356" rx="40" fill="#fff" stroke="${CORES.tinta}" stroke-width="18"/>
    <path d="M200 206 Q200 146 256 146 Q312 146 312 200 Q312 238 276 258 Q256 270 256 304"
      fill="none" stroke="#E63946" stroke-width="40" stroke-linecap="round"/>
    <circle cx="256" cy="364" r="24" fill="#E63946"/>
  </g>
</svg>`

await mkdir(join(publico, 'icones'), { recursive: true })
await writeFile(join(publico, 'favicon.svg'), icone().trim())

const png = (svg, lado, arquivo) => sharp(Buffer.from(svg)).resize(lado, lado).png().toFile(join(publico, 'icones', arquivo))

await png(icone(), 192, 'icone-192.png')
await png(icone(), 512, 'icone-512.png')
await png(icone(0.72, 0), 512, 'icone-mascara-512.png')
await png(icone(0.9, 0), 180, 'apple-touch-icon.png')
console.log('ícones gerados')
