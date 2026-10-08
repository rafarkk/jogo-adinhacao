// Gera os SVGs das cartas em public/cartas/<tema>/ e o índice src/dados/cartas.js.
// Uso: npm run cartas            (gera tudo)
//      npm run cartas -- --folha <pasta>   (também salva uma folha de contato PNG por tema)
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { slug } from './arte/base.mjs'
import { cartasSelvagens, cartasDomesticos } from './arte/animais.mjs'
import { cartasPessoas } from './arte/pessoas.mjs'
import { cartasGatos } from './arte/gatos.mjs'
import { cartasAnime } from './arte/anime.mjs'
import { cartasComidas } from './arte/comidas.mjs'
import { cartasBandeiras } from './arte/bandeiras.mjs'
import { cartasProfissoes } from './arte/profissoes.mjs'
import { cartasMonstrinhos } from './arte/monstrinhos.mjs'
import { cartasRobos } from './arte/robos.mjs'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const POR_TEMA = 30

const temas = {
  selvagens: cartasSelvagens,
  domesticos: cartasDomesticos,
  pessoas: cartasPessoas,
  gatos: cartasGatos,
  anime: cartasAnime,
  comidas: cartasComidas,
  bandeiras: cartasBandeiras,
  profissoes: cartasProfissoes,
  monstrinhos: cartasMonstrinhos,
  robos: cartasRobos,
}

const iFolha = process.argv.indexOf('--folha')
const pastaFolha = iFolha > -1 ? resolve(process.argv[iFolha + 1]) : null

const indice = {}
for (const [tema, gerar] of Object.entries(temas)) {
  const cartas = gerar()
  if (cartas.length !== POR_TEMA) throw new Error(`${tema}: ${cartas.length} cartas, esperado ${POR_TEMA}`)
  const ids = cartas.map((c) => slug(c.nome))
  if (new Set(ids).size !== ids.length) throw new Error(`${tema}: nomes repetidos`)

  const pasta = join(raiz, 'public', 'cartas', tema)
  await rm(pasta, { recursive: true, force: true })
  await mkdir(pasta, { recursive: true })
  await Promise.all(cartas.map((c, i) => writeFile(join(pasta, `${ids[i]}.svg`), c.svg)))
  indice[tema] = cartas.map((c, i) => ({ id: ids[i], nome: c.nome }))

  if (pastaFolha) {
    const { default: sharp } = await import('sharp')
    await mkdir(pastaFolha, { recursive: true })
    const lado = 200
    const itens = await Promise.all(
      cartas.map(async (c, i) => ({
        input: await sharp(Buffer.from(c.svg)).resize(lado, lado).png().toBuffer(),
        left: (i % 6) * (lado + 8) + 8,
        top: Math.floor(i / 6) * (lado + 8) + 8,
      })),
    )
    await sharp({ create: { width: 6 * (lado + 8) + 8, height: 5 * (lado + 8) + 8, channels: 3, background: '#2A1F45' } })
      .composite(itens)
      .png()
      .toFile(join(pastaFolha, `${tema}.png`))
  }
  console.log(`${tema}: ${cartas.length} cartas`)
}

const saida =
  '// Arquivo gerado por scripts/gerar-cartas.mjs. Não edite à mão.\n' +
  `export const CARTAS = ${JSON.stringify(indice, null, 2)}\n`
await writeFile(join(raiz, 'src', 'dados', 'cartas.js'), saida)
