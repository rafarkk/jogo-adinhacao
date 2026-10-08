// Bandeiras simplificadas: as cores e as formas principais de cada país, sem brasões detalhados.
import { TINTA, c, p, r, l, rot, recorte, estrela, carta } from './base.mjs'

// área da bandeira dentro da carta
const X = 20
const Y = 50
const W = 160
const H = 100

const fundo = (cor) => r(X, Y, W, H, cor)

// faixas horizontais; `pesos` define a altura relativa de cada uma
const horiz = (cores, pesos = cores.map(() => 1)) => {
  const total = pesos.reduce((a, b) => a + b, 0)
  let y = Y
  return cores
    .map((cor, i) => {
      const h = (H * pesos[i]) / total
      const s = r(X, y, W, h + 0.5, cor)
      y += h
      return s
    })
    .join('')
}

const vert = (cores, pesos = cores.map(() => 1)) => {
  const total = pesos.reduce((a, b) => a + b, 0)
  let x = X
  return cores
    .map((cor, i) => {
      const w = (W * pesos[i]) / total
      const s = r(x, Y, w + 0.5, H, cor)
      x += w
      return s
    })
    .join('')
}

const alternadas = (n, a, b) => horiz(Array.from({ length: n }, (_, i) => (i % 2 ? b : a)))

const sol = (cx, cy, raio, cor) =>
  Array.from({ length: 8 }, (_, i) => rot(l(`M${cx} ${cy - raio - 2} V${cy - raio - 7}`, cor, 3), i * 45, cx, cy)).join('') +
  c(cx, cy, raio, cor)

// trigrama da Coreia: três barras
const barras = (cx, cy, ang) =>
  rot([-7, 0, 7].map((dy) => r(cx - 12, cy + dy - 2, 24, 4, '#000')).join(''), ang, cx, cy)

const bandeiras = [
  ['Brasil', fundo('#009C3B') + p('M100 60 L168 100 L100 140 L32 100 Z', '#FFDF00') + c(100, 100, 24, '#002776') +
    recorte(c(100, 100, 24, '#000'), l('M70 96 Q100 86 132 108', '#fff', 5))],
  ['Argentina', horiz(['#74ACDF', '#fff', '#74ACDF']) + sol(100, 100, 8, '#F6B40E')],
  ['Uruguai', alternadas(9, '#fff', '#0038A8') + r(X, Y, 60, 55.6, '#fff') + sol(50, 78, 11, '#FCD116')],
  ['Chile', horiz(['#fff', '#D52B1E']) + r(X, Y, 50, 50, '#0039A6') + estrela(45, 76, 15, '#fff')],
  ['Colômbia', horiz(['#FCD116', '#003893', '#CE1126'], [2, 1, 1])],
  ['Peru', vert(['#D91023', '#fff', '#D91023'])],
  ['México', vert(['#006847', '#fff', '#CE1126']) + c(100, 100, 11, '#8B5A2B') + l('M88 108 Q100 120 112 108', '#3E8E41', 4)],
  ['Cuba', alternadas(5, '#002A8F', '#fff') + p('M20 50 L92 100 L20 150 Z', '#CF142B') + estrela(44, 100, 14, '#fff')],
  ['Jamaica', fundo('#009B3A') + p('M20 50 L100 100 L20 150 Z', '#000') + p('M180 50 L100 100 L180 150 Z', '#000') +
    l('M20 50 L180 150 M180 50 L20 150', '#FED100', 15)],
  ['Estados Unidos', alternadas(13, '#B22234', '#fff') + r(X, Y, 68, 53.9, '#3C3B6E') +
    [0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3, 4, 5].map((j) => c(27 + j * 10.8, 56 + i * 10.4, 2.4, '#fff')).join('')).join('')],
  ['Canadá', vert(['#D80621', '#fff', '#D80621'], [1, 2, 1]) +
    p('M100 66 L106 81 L117 77 L113 94 L127 90 L122 101 L131 107 L112 117 L115 126 L102 122 V136 H98 V122 L85 126 L88 117 L69 107 L78 101 L73 90 L87 94 L83 77 L94 81 Z', '#D80621')],
  ['Portugal', vert(['#046A38', '#DA291C'], [2, 3]) + c(84, 100, 19, '#FFE900') +
    p('M74 88 H94 V102 Q84 116 74 102 Z', '#DA291C') + p('M79 92 H89 V101 Q84 108 79 101 Z', '#fff')],
  ['Espanha', horiz(['#AA151B', '#F1BF00', '#AA151B'], [1, 2, 1]) + r(62, 90, 16, 20, '#AA151B', 4) + r(61, 85, 18, 5, '#C8A200', 2)],
  ['França', vert(['#0055A4', '#fff', '#EF4135'])],
  ['Itália', vert(['#009246', '#fff', '#CE2B37'])],
  ['Alemanha', horiz(['#000', '#DD0000', '#FFCE00'])],
  ['Reino Unido', fundo('#012169') + l('M20 50 L180 150 M180 50 L20 150', '#fff', 20) + l('M20 50 L180 150 M180 50 L20 150', '#C8102E', 7) +
    r(84, Y, 32, H, '#fff') + r(X, 84, W, 32, '#fff') + r(91, Y, 18, H, '#C8102E') + r(X, 91, W, 18, '#C8102E')],
  ['Irlanda', vert(['#169B62', '#fff', '#FF883E'])],
  ['Holanda', horiz(['#AE1C28', '#fff', '#21468B'])],
  ['Bélgica', vert(['#000', '#FAE042', '#ED2939'])],
  ['Suíça', fundo('#D52B1E') + r(88, 68, 24, 64, '#fff') + r(68, 88, 64, 24, '#fff')],
  ['Suécia', fundo('#006AA7') + r(64, Y, 20, H, '#FECC00') + r(X, 90, W, 20, '#FECC00')],
  ['Noruega', fundo('#BA0C2F') + r(60, Y, 28, H, '#fff') + r(X, 86, W, 28, '#fff') + r(67, Y, 14, H, '#00205B') + r(X, 93, W, 14, '#00205B')],
  ['Grécia', alternadas(9, '#0D5EAF', '#fff') + r(X, Y, 55.6, 55.6, '#0D5EAF') + r(X, 72.2, 55.6, 11.1, '#fff') + r(42.2, Y, 11.1, 55.6, '#fff')],
  ['Turquia', fundo('#E30A17') + c(80, 100, 25, '#fff') + c(87, 100, 20, '#E30A17') + rot(estrela(110, 100, 11, '#fff'), -18, 110, 100)],
  ['Japão', fundo('#fff') + c(100, 100, 30, '#BC002D')],
  ['China', fundo('#DE2910') + estrela(48, 78, 17, '#FFDE00') +
    [[76, 58], [87, 70], [87, 87], [76, 99]].map(([x, y]) => estrela(x, y, 5.5, '#FFDE00')).join('')],
  ['Coreia do Sul', fundo('#fff') + c(100, 100, 24, '#CD2E3A') + p('M76 100 A24 24 0 0 0 124 100 Z', '#0047A0') +
    c(88, 100, 12, '#CD2E3A') + c(112, 100, 12, '#0047A0') +
    barras(50, 70, -56) + barras(150, 70, 56) + barras(50, 130, 56) + barras(150, 130, -56)],
  ['Índia', horiz(['#FF9933', '#fff', '#138808']) + c(100, 100, 13, 'none', 'stroke="#000080" stroke-width="2.5"') +
    Array.from({ length: 6 }, (_, i) => rot(l('M100 88 V112', '#000080', 1.6), i * 30, 100, 100)).join('')],
  ['Gana', horiz(['#CE1126', '#FCD116', '#006B3F']) + estrela(100, 100, 15, '#000')],
]

const FUNDOS = ['#CFE1F2', '#D8E2DC', '#E4D9F5', '#FDE2A7', '#CDEAC0', '#F6D6C8']

export const cartasBandeiras = () =>
  bandeiras.map(([nome, desenho], i) => ({
    nome,
    svg: carta(
      FUNDOS[i % FUNDOS.length],
      recorte(r(X, Y, W, H, '#fff', 8), desenho) +
        r(X, Y, W, H, 'none', 8, `stroke="${TINTA}" stroke-width="4"`),
    ),
  }))
