// Videogames, cada um representado por um elemento que o identifica (sem logos).
import { TINTA, c, e, p, r, l, sim, rot, estrela, carta, tom } from './base.mjs'

const borda = (cor = TINTA, w = 4) => `stroke="${cor}" stroke-width="${w}" stroke-linejoin="round"`

// desenho em pixels: cada linha da string é uma linha da grade; `x` pinta, espaço não
const pixels = (linhas, x0, y0, lado, cor) =>
  linhas
    .map((linha, j) =>
      [...linha].map((ch, i) => (ch === ' ' ? '' : r(x0 + i * lado, y0 + j * lado, lado + 0.4, lado + 0.4, typeof cor === 'string' ? cor : cor[ch]))).join(''),
    )
    .join('')

// face de um cubo isométrico: mapeia uma grade 8x8 para o paralelogramo
const face = (matriz, conteudo) => `<g transform="matrix(${matriz})">${conteudo}</g>`
const ruido = (u, v, k) => ((u * 7 + v * 13 + k * 5) % 5) / 5

const minecraft = () => {
  const topo = []
  for (let u = 0; u < 8; u++)
    for (let v = 0; v < 8; v++) topo.push(r(u, v, 1.04, 1.04, ruido(u, v, 1) > 0.5 ? '#6DBB45' : '#5AA236'))
  const lateral = (k) => {
    const s = []
    for (let u = 0; u < 8; u++)
      for (let v = 0; v < 8; v++) {
        const grama = v < 2 || (v === 2 && ruido(u, v, k) > 0.4)
        const cor = grama ? (k ? '#4C8F2F' : '#5AA236') : ruido(u, v, k) > 0.6 ? '#6B4226' : ruido(u, v, k) > 0.3 ? '#8B5A2B' : '#9C6B3A'
        s.push(r(u, v, 1.04, 1.04, k ? tom(cor, -0.15) : cor))
      }
    return s.join('')
  }
  return face('7 -4 7 4 44 72', topo.join('')) + face('7 4 0 8 44 72', lateral(0)) + face('7 -4 0 8 100 104', lateral(1))
}

const tetris = () => {
  const bloco = (col, y, cor) => {
    const x = 40 + col * 20
    return r(x, y, 20, 20, cor) + p(`M${x} ${y} H${x + 20} L${x + 16} ${y + 4} H${x + 4} V${y + 16} L${x} ${y + 20} Z`, tom(cor, 0.35)) + r(x, y, 20, 20, 'none', 0, borda(tom(cor, -0.4), 1.5))
  }
  const pecas = [
    ['#2EC4E6', [[0, 160], [1, 160], [2, 160], [3, 160]]],
    ['#FFD23F', [[4, 140], [5, 140], [4, 160], [5, 160]]],
    ['#F28C28', [[0, 140], [1, 140], [2, 140], [2, 120]]],
    ['#8E44C9', [[3, 140], [3, 120], [3, 100], [4, 120]]],
    ['#57B85A', [[0, 120], [1, 120], [1, 100], [2, 100]]],
    ['#E63946', [[1, 50], [2, 50], [2, 70], [3, 70]]],
  ]
  return pecas.map(([cor, cel]) => cel.map(([col, y]) => bloco(col, y, cor)).join('')).join('')
}

const invasor = [
  '  x     x  ',
  '   x   x   ',
  '  xxxxxxx  ',
  ' xx xxx xx ',
  'xxxxxxxxxxx',
  'x xxxxxxx x',
  'x x     x x',
  '   xx xx   ',
]

const coracao = [
  ' xx   xx ',
  'xxxx xxxx',
  'xxxxxxxxx',
  'xxxxxxxxx',
  ' xxxxxxx ',
  '  xxxxx  ',
  '   xxx   ',
  '    x    ',
]

const jogos = [
  ['Minecraft', '#BDE0FE', minecraft()],
  ['Pac-Man', '#1E1E3A',
    p('M86 104 L133.5 74.3 A56 56 0 1 0 133.5 133.7 Z', '#FFD23F') + c(90, 76, 6, TINTA) +
    c(152, 104, 6, '#FFE6B0') + c(176, 104, 6, '#FFE6B0')],
  ['Tetris', '#2B2B55', r(36, 30, 128, 154, '#1E1E3A', 4) + tetris()],
  ['Among Us', '#1E1E3A',
    r(44, 78, 26, 60, '#A61E2C', 9) +
    p('M64 74 C64 32 140 32 140 74 V168 H114 V146 H90 V168 H64 Z', '#E63946') +
    e(114, 76, 28, 17, '#8FD3F0') + e(122, 70, 10, 5, '#fff', 'opacity=".8"')],
  ['Pokémon', '#FAD2E1',
    c(100, 104, 62, '#fff') + p('M38 104 A62 62 0 0 1 162 104 Z', '#E63946') + r(38, 98, 124, 12, TINTA) +
    c(100, 104, 62, 'none', borda(TINTA, 5)) + c(100, 104, 21, TINTA) + c(100, 104, 13, '#fff') + e(76, 72, 10, 6, '#fff', 'opacity=".5"')],
  ['Super Mario', '#BEE9E8',
    p('M66 106 H134 V150 Q134 168 116 168 H84 Q66 168 66 150 Z', '#F6E3C2') + r(86, 118, 9, 20, TINTA, 4) + r(105, 118, 9, 20, TINTA, 4) +
    p('M36 112 C36 46 164 46 164 112 Q100 100 36 112 Z', '#E63946') +
    c(100, 66, 17, '#fff') + c(56, 98, 12, '#fff') + c(144, 98, 12, '#fff')],
  ['Sonic', '#2456A6',
    c(100, 104, 48, 'none', 'stroke="#F5C518" stroke-width="18"') + c(100, 104, 48, 'none', 'stroke="#FFE680" stroke-width="5" stroke-dasharray="60 240"') +
    estrela(152, 54, 12, '#fff', 4, 0.3) + estrela(50, 152, 8, '#fff', 4, 0.3)],
  ['Zelda', '#3A6B4A',
    [[100, 36, 132, 92, 68, 92], [68, 92, 100, 148, 36, 148], [132, 92, 164, 148, 100, 148]]
      .map(([a, b, x, y, m, n]) => p(`M${a} ${b} L${x} ${y} L${m} ${n} Z`, '#F5C518', borda('#B8860B', 3))).join('')],
  ['Angry Birds', '#BDE0FE',
    p('M90 56 Q86 34 100 30 Q100 46 106 52 Q114 36 124 40 Q112 50 112 58 Z', '#D62828') +
    c(100, 110, 56, '#D62828') + e(100, 142, 36, 22, '#F2D7C0') +
    sim(c(84, 100, 12, '#fff') + c(88, 102, 5, TINTA)) +
    sim(p('M62 80 L98 92 L96 100 L64 90 Z', TINTA)) +
    p('M88 112 L126 118 L88 128 Z', '#F5B301') + p('M88 128 L120 124 L90 136 Z', '#E09A00')],
  ['Roblox', '#D0F4DE',
    r(48, 126, 104, 74, '#2E7DD7', 8) + r(84, 112, 32, 16, '#F5CD30') +
    r(62, 40, 76, 76, '#F5CD30', 14) + sim(e(86, 72, 5, 8, TINTA)) + l('M82 92 Q100 104 118 92', TINTA, 4)],
  ['Fall Guys', '#7FD4E8',
    r(60, 34, 80, 150, '#F06BA8', 40) + e(100, 84, 30, 20, '#fff') + sim(c(90, 84, 4, TINTA)) + l('M92 92 Q100 98 108 92', TINTA, 3) +
    sim(e(56, 124, 10, 14, '#F06BA8')) + l('M70 150 H130', tom('#F06BA8', -0.2), 3)],
  ['Flappy Bird', '#7FD4E8',
    r(16, 0, 34, 66, '#5DBB46') + r(10, 58, 46, 14, '#4CA33A', 2) + r(150, 140, 34, 60, '#5DBB46') + r(144, 132, 46, 14, '#4CA33A', 2) +
    e(98, 102, 42, 34, '#F5D21A', borda()) + e(76, 110, 18, 12, '#FFF1A8', borda(TINTA, 3)) +
    c(116, 88, 13, '#fff', borda(TINTA, 3)) + r(118, 82, 6, 10, TINTA) +
    p('M118 106 H150 Q158 112 150 118 H118 Z', '#F05A28', borda(TINTA, 3)) + p('M118 118 H146 Q150 124 144 128 H120 Z', '#F05A28', borda(TINTA, 3))],
  ['Geometry Dash', '#8E6BBF',
    r(50, 50, 100, 100, '#FFD800', 4, borda(TINTA, 6)) + r(74, 74, 52, 52, '#29D9F5', 2, borda(TINTA, 5)) +
    r(82, 84, 12, 12, TINTA) + r(106, 84, 12, 12, TINTA) + r(84, 106, 32, 9, TINTA)],
  ['Candy Crush', '#FCE0E8',
    rot(e(70, 76, 28, 18, '#E63946'), -25, 70, 76) + c(136, 76, 24, '#3FA7D6') + r(44, 118, 50, 50, '#57B85A', 12) +
    p('M118 112 L132 104 L136 120 Z M158 112 L144 104 L140 120 Z', '#F28C28') + e(138, 140, 24, 20, '#F28C28') +
    [[60, 68], [126, 66], [56, 130], [130, 132]].map(([x, y]) => e(x, y, 6, 4, '#fff', 'opacity=".6"')).join('')],
  ['Space Invaders', '#1E1E3A', pixels(invasor, 23, 50, 14, '#5DFF6B')],
  ['Pong', '#1E1E3A',
    r(28, 56, 10, 48, '#fff') + r(162, 104, 10, 48, '#fff') + r(108, 92, 12, 12, '#fff') +
    [20, 44, 68, 92, 116, 140, 164].map((y) => r(98, y, 4, 12, '#fff', 0, 'opacity=".5"')).join('')],
  ['Snake', '#B8D86B',
    pixels([
      '          ',
      ' xxxxxx   ',
      ' x    x   ',
      ' x    xxx ',
      ' x      x ',
      ' xxxx   x ',
      '          ',
      '    x   o ',
    ].map((s) => s.replace('o', ' ')), 20, 30, 16, '#2F4F1F') + r(148, 142, 16, 16, '#2F4F1F', 8)],
  ['Donkey Kong', '#1E1E3A',
    r(10, 168, 180, 16, '#E63946') + [20, 50, 80, 110, 140, 170].map((x) => l(`M${x} 168 L${x + 15} 184 L${x + 30} 168`, '#B5202C', 3)).join('') +
    p('M56 58 Q100 44 144 58 Q156 104 144 150 Q100 164 56 150 Q44 104 56 58 Z', '#B5651D') +
    l('M52 80 Q100 92 148 80 M52 128 Q100 140 148 128', '#5C3A1E', 6) + l('M80 54 Q74 104 80 156 M120 54 Q126 104 120 156', '#8B4A1A', 3)],
  ['The Sims', '#CFF0E8',
    p('M100 26 L64 92 L100 104 Z', '#7ED957') + p('M100 26 L136 92 L100 104 Z', '#4CAF50') +
    p('M64 92 L100 104 L100 178 Z', '#3E9142') + p('M136 92 L100 104 L100 178 Z', '#2E7D32')],
  ['Portal', '#D8E2DC',
    e(56, 104, 26, 56, '#BFE3FF') + e(56, 104, 26, 56, 'none', 'stroke="#2F9BF5" stroke-width="10"') +
    e(144, 104, 26, 56, '#FFE0B8') + e(144, 104, 26, 56, 'none', 'stroke="#F5871F" stroke-width="10"') +
    r(86, 140, 28, 28, '#C9CED6', 4, borda(TINTA, 3)) + p('M100 160 C92 154 92 146 97 146 Q100 146 100 150 Q100 146 103 146 C108 146 108 154 100 160 Z', '#F06BA8')],
  ['Plants vs Zombies', '#C5E8F7',
    l('M84 116 Q80 150 90 196', '#3E8E41', 8) + rot(e(64, 164, 24, 10, '#57B85A'), -30, 64, 164) + rot(e(112, 172, 24, 10, '#57B85A'), 30, 112, 172) +
    p('M52 74 Q30 56 34 96 Q44 86 56 92 Z', '#3E8E41') +
    c(86, 84, 34, '#7ED957') + r(108, 66, 36, 34, '#7ED957', 6) + e(146, 83, 9, 19, '#3E8E41') + e(146, 83, 5, 13, '#1E4D22') +
    c(80, 74, 7, TINTA) + c(82, 72, 2, '#fff') + c(176, 70, 10, '#7ED957')],
  ['Cut the Rope', '#FFE5A0',
    l('M100 0 V40', '#8B5A2B', 4) + c(100, 52, 14, '#E63946') + l('M90 44 Q100 52 110 60', '#fff', 4) +
    p('M48 150 C40 102 62 84 100 84 C138 84 160 102 152 150 C146 180 54 180 48 150 Z', '#7ED957') +
    sim(l('M80 88 Q74 70 66 66', '#7ED957', 6)) +
    sim(c(80, 110, 13, '#fff') + c(83, 112, 6, TINTA)) +
    p('M70 136 Q100 172 130 136 Z', '#8B2E3A') + sim(r(88, 136, 9, 10, '#fff', 2))],
  ['Hollow Knight', '#3A4660',
    p('M60 200 Q60 150 100 140 Q140 150 140 200 Z', '#2B2B3A') +
    sim(l('M74 68 Q54 50 60 18', '#F2F2F2', 9)) +
    p('M62 100 C62 58 138 58 138 100 C138 136 122 150 100 150 C78 150 62 136 62 100 Z', '#F2F2F2') +
    sim(e(84, 106, 11, 16, '#1A1A24'))],
  ['Undertale', '#000000', pixels(coracao, 28, 46, 16, '#FF1F1F')],
  ['Cuphead', '#F2E3C6',
    l('M118 56 L144 14', '#E63946', 8) + l('M118 56 L144 14', '#fff', 8, 'stroke-dasharray="6 6"') +
    e(100, 112, 46, 50, '#fff', borda()) + e(100, 66, 42, 12, '#E8E8E8', borda()) + e(100, 66, 32, 7, '#C9A27A') +
    sim(p('M76 100 Q76 88 86 88 Q96 88 96 104 Q96 118 86 118 Q78 118 76 108 L86 104 Z', TINTA)) +
    c(100, 124, 7, '#E63946') + l('M82 138 Q100 152 118 138', TINTA, 4) + sim(c(70, 128, 7, '#F28B8B', 'opacity=".7"'))],
  ['Kirby', '#BDE0FE',
    e(70, 164, 26, 14, '#D62246') + e(130, 164, 26, 14, '#D62246') + sim(c(48, 112, 14, '#F7A8C8')) +
    c(100, 110, 54, '#F7A8C8') + sim(e(88, 96, 6, 15, TINTA) + e(88, 90, 3, 6, '#fff')) +
    sim(e(70, 120, 9, 5, '#F06B8A')) + p('M94 124 Q100 132 106 124 Z', '#B5203F')],
  ['Crash Bandicoot', '#F6D6C8',
    r(42, 50, 116, 116, '#C98A3C', 6) + r(42, 50, 116, 116, 'none', 6, borda('#7A4E1E', 6)) +
    l('M48 56 L152 160 M152 56 L48 160', '#7A4E1E', 7) + r(42, 100, 116, 16, '#A8702E') +
    c(100, 40, 16, '#F05A28') + c(94, 34, 4, '#fff', 'opacity=".5"') + l('M100 26 L106 18', '#3E8E41', 4)],
  ['Animal Crossing', '#FFF1B8',
    rot(p('M100 30 C150 60 150 140 100 178 C50 140 50 60 100 30 Z', '#6DBB45') + l('M100 44 V170 M100 80 L124 66 M100 108 L130 92 M100 80 L76 66 M100 108 L70 92', '#4C8F2F', 4), 25, 100, 104)],
  ['Pou', '#C9E4DE',
    p('M44 168 C30 130 52 50 100 50 C148 50 170 130 156 168 Q100 184 44 168 Z', '#A8743E') +
    sim(c(80, 102, 16, '#fff') + c(84, 104, 8, TINTA) + c(86, 101, 2.5, '#fff')) + l('M84 134 Q100 146 116 134', TINTA, 4)],
  ['Clash Royale', '#2456A6',
    p('M46 140 L38 64 L72 96 L100 50 L128 96 L162 64 L154 140 Z', '#F5C518', borda('#B8860B', 4)) +
    r(46, 140, 108, 22, '#E0A800', 4, borda('#B8860B', 4)) +
    c(100, 112, 10, '#E63946') + c(70, 120, 7, '#3FA7D6') + c(130, 120, 7, '#3FA7D6') + c(38, 64, 6, '#E63946') + c(162, 64, 6, '#E63946') + c(100, 50, 7, '#E63946')],
]

export const cartasJogos = () => jogos.map(([nome, fundo, desenho]) => ({ nome, svg: carta(fundo, desenho) }))
