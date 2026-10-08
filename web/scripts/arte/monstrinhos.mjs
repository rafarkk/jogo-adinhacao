import { TINTA, c, e, p, r, l, sim, recorte, carta, tom } from './base.mjs'

const BOCA = '#4A1830'

const espinhos = (cx, cy, R, ri, n) => {
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n
    const raio = i % 2 ? ri : R
    pts.push(`${(cx + raio * Math.cos(a)).toFixed(1)} ${(cy + raio * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join(' L')} Z`
}

const CORPOS = {
  bola: (cor) => c(100, 120, 62, cor),
  ovo: (cor) => e(100, 120, 54, 66, cor),
  quadrado: (cor) => r(42, 62, 116, 122, cor, 30),
  gota: (cor) => p('M100 38 C150 70 164 110 164 132 C164 172 136 186 100 186 C64 186 36 172 36 132 C36 110 50 70 100 38 Z', cor),
  peludo: (cor) => p(espinhos(100, 120, 72, 56, 20), cor),
  fantasma: (cor) => p('M40 192 V112 C40 40 160 40 160 112 V192 L140 174 L120 192 L100 174 L80 192 L60 174 Z', cor),
}

const CHIFRES = {
  nenhum: () => '',
  ponta: (cor2) => sim(p('M56 86 L42 34 L86 66 Z', cor2)),
  curvo: (cor2) => sim(l('M66 74 Q44 58 52 30', cor2, 11)),
  antena: (cor2) => sim(l('M82 70 Q76 42 66 32', TINTA, 4) + c(66, 30, 8, cor2)),
  um: (cor2) => p('M88 68 L100 20 L112 68 Z', cor2),
  orelhas: (cor2, cor) => sim(c(50, 72, 19, cor) + c(50, 72, 9, cor2)),
  tufo: (cor2) => l('M100 64 V36 M90 66 Q84 46 74 40 M110 66 Q116 46 126 40', cor2, 6),
}

const olho = (x, y, raio, pupila, dx = 2) =>
  c(x, y, raio, '#fff') + c(x + dx, y + 2, raio * 0.45, pupila) + c(x + dx + raio * 0.2, y - raio * 0.15, raio * 0.16, '#fff')

const OLHOS = {
  1: (pupila) => olho(100, 104, 26, pupila, 0),
  2: (pupila) => sim(olho(78, 104, 16, pupila)),
  3: (pupila) => olho(100, 94, 13, pupila, 0) + sim(olho(72, 110, 12, pupila)),
  talo: (pupila, cor) => sim(l('M80 76 Q76 50 70 42', cor, 9) + olho(70, 36, 15, pupila)),
  sono: (pupila, cor) => sim(olho(78, 104, 16, pupila) + p('M62 104 A16 16 0 0 1 94 104 Z', tom(cor, -0.22))),
}

const BOCAS = {
  sorriso: () => l('M76 140 Q100 164 124 140', TINTA, 5),
  dentes: () =>
    p('M70 138 H130 Q130 170 100 170 Q70 170 70 138 Z', BOCA) +
    p('M70 138 L77.5 150 L85 138 L92.5 150 L100 138 L107.5 150 L115 138 L122.5 150 L130 138 Z', '#fff'),
  presas: () => l('M76 142 Q100 158 124 142', TINTA, 5) + sim(p('M82 146 L87 164 L93 150 Z', '#fff')),
  lingua: () => p('M76 138 Q100 176 124 138 Z', BOCA) + e(100, 156, 10, 12, '#F06BA8'),
  o: () => e(100, 150, 11, 13, BOCA),
  dente: () => l('M76 142 Q100 160 124 142', TINTA, 5) + r(94, 150, 12, 13, '#fff', 3),
  torta: () => l('M78 150 Q90 140 100 148 Q110 156 122 144', TINTA, 5),
}

function monstro(o) {
  const { cor, corpo = 'bola', olhos = 2, pupila = TINTA, chifres = 'nenhum', cor2 = tom(cor, -0.3), boca = 'sorriso', extras = [] } = o
  const tem = (x) => extras.includes(x)
  const forma = CORPOS[corpo]
  const escuro = tom(cor, -0.2)

  const marcas =
    (tem('manchas') ? c(58, 146, 9, escuro) + c(144, 138, 10, escuro) + c(128, 170, 7, escuro) + c(70, 174, 6, escuro) : '') +
    (tem('listras') ? [72, 124, 172].map((y) => r(0, y, 200, 11, escuro)).join('') : '') +
    (tem('barriga') ? e(100, 176, 40, 26, tom(cor, 0.4)) : '')

  return (
    (tem('asas') ? sim(p('M46 112 L6 84 L16 112 L4 122 L20 132 L10 152 L48 142 Z', cor2)) : '') +
    (tem('bracos') ? sim(l('M42 132 Q22 134 20 110', cor, 11)) : '') +
    (tem('pes') ? sim(e(76, 186, 19, 9, cor2)) : '') +
    (olhos === 'talo' ? '' : CHIFRES[chifres](cor2, cor)) +
    forma(cor) +
    (marcas ? recorte(forma('#000'), marcas) : '') +
    OLHOS[olhos](pupila, cor) +
    BOCAS[boca]() +
    (tem('bochechas') ? sim(c(62, 132, 8, '#F28B8B', 'opacity=".7"')) : '')
  )
}

const monstros = [
  ['Bubu', '#FDE2A7', { cor: '#7C5CE0', corpo: 'bola', olhos: 1, chifres: 'ponta', cor2: '#FFE156', boca: 'dentes', extras: ['pes'] }],
  ['Zog', '#D7E3FC', { cor: '#57B85A', corpo: 'quadrado', olhos: 3, chifres: 'antena', cor2: '#F06BA8', boca: 'sorriso', extras: ['bracos'] }],
  ['Gruk', '#CDEAC0', { cor: '#E8588F', corpo: 'peludo', olhos: 2, chifres: 'curvo', cor2: '#FFF3D6', boca: 'presas' }],
  ['Mumu', '#FAD2E1', { cor: '#3FA7D6', corpo: 'gota', olhos: 2, boca: 'o', extras: ['manchas', 'bochechas'] }],
  ['Tico', '#BEE9E8', { cor: '#F28C28', corpo: 'ovo', olhos: 'talo', boca: 'lingua', extras: ['pes', 'bracos'] }],
  ['Zazá', '#E2CFF4', { cor: '#FFC93C', corpo: 'bola', olhos: 3, chifres: 'tufo', cor2: '#E63946', boca: 'dente', extras: ['listras'] }],
  ['Blip', '#FFE5A0', { cor: '#2EAD9A', corpo: 'fantasma', olhos: 1, pupila: '#D62246', chifres: 'antena', cor2: '#FFE156', boca: 'o' }],
  ['Nhac', '#C9E4DE', { cor: '#D9463A', corpo: 'quadrado', olhos: 2, chifres: 'ponta', cor2: '#2B2B33', boca: 'dentes', extras: ['bracos', 'pes'] }],
  ['Pompom', '#D0F4DE', { cor: '#F8A5C2', corpo: 'peludo', olhos: 1, pupila: '#2456A6', boca: 'sorriso', extras: ['bochechas', 'pes'] }],
  ['Kiki', '#FFD6A5', { cor: '#8BC34A', corpo: 'gota', olhos: 1, chifres: 'orelhas', cor2: '#F06BA8', boca: 'lingua' }],
  ['Dudu', '#D6E6F5', { cor: '#B5651D', corpo: 'bola', olhos: 2, chifres: 'orelhas', cor2: '#F6C88B', boca: 'dente', extras: ['barriga', 'pes'] }],
  ['Ronco', '#F6D6C8', { cor: '#5B6FD6', corpo: 'ovo', olhos: 'sono', chifres: 'um', cor2: '#FFC93C', boca: 'torta', extras: ['manchas'] }],
  ['Lelé', '#DCEBC3', { cor: '#F06BA8', corpo: 'quadrado', olhos: 'talo', boca: 'dentes', extras: ['listras', 'bracos'] }],
  ['Fifi', '#C5E8F7', { cor: '#B79AD9', corpo: 'fantasma', olhos: 2, pupila: '#7C3AED', chifres: 'tufo', cor2: '#F5B301', boca: 'sorriso', extras: ['bochechas'] }],
  ['Tuto', '#FFF1B8', { cor: '#2456A6', corpo: 'bola', olhos: 3, pupila: '#D62246', chifres: 'curvo', cor2: '#C9CED6', boca: 'presas', extras: ['asas'] }],
  ['Babão', '#E4D9F5', { cor: '#9BCB3C', corpo: 'gota', olhos: 3, chifres: 'nenhum', boca: 'lingua', extras: ['manchas', 'bracos'] }],
  ['Gogó', '#FFCFB3', { cor: '#2B9FA8', corpo: 'peludo', olhos: 3, chifres: 'antena', cor2: '#FFE156', boca: 'o' }],
  ['Zuzu', '#D8E2DC', { cor: '#E63946', corpo: 'ovo', olhos: 2, chifres: 'ponta', cor2: '#FFF3D6', boca: 'sorriso', extras: ['asas', 'pes'] }],
  ['Peteca', '#C7EFCF', { cor: '#F5B301', corpo: 'gota', olhos: 'talo', boca: 'sorriso', extras: ['listras', 'pes'] }],
  ['Bolota', '#FCE0E8', { cor: '#6B8E4E', corpo: 'bola', olhos: 'sono', chifres: 'nenhum', boca: 'o', extras: ['barriga', 'bracos', 'pes'] }],
  ['Xuxu', '#CFE1F2', { cor: '#57B85A', corpo: 'peludo', olhos: 2, pupila: '#2E7D32', chifres: 'um', cor2: '#F28C28', boca: 'dente', extras: ['bochechas'] }],
  ['Mimo', '#F8E1B4', { cor: '#F28B8B', corpo: 'fantasma', olhos: 'sono', chifres: 'orelhas', cor2: '#fff', boca: 'torta' }],
  ['Trovão', '#FFE0B5', { cor: '#4A4F5C', corpo: 'quadrado', olhos: 1, pupila: '#F5B301', chifres: 'curvo', cor2: '#F5B301', boca: 'presas', extras: ['asas'] }],
  ['Gosma', '#E6D4F2', { cor: '#7ED957', corpo: 'fantasma', olhos: 3, chifres: 'nenhum', boca: 'lingua', extras: ['manchas'] }],
  ['Jujuba', '#CFF0E8', { cor: '#F06BA8', corpo: 'ovo', olhos: 1, pupila: '#7C3AED', chifres: 'antena', cor2: '#7FC8F8', boca: 'sorriso', extras: ['bracos', 'bochechas'] }],
  ['Caroço', '#FFD9C0', { cor: '#8B5A2B', corpo: 'gota', olhos: 2, chifres: 'ponta', cor2: '#F6C88B', boca: 'torta', extras: ['barriga'] }],
  ['Meleca', '#D9F0C4', { cor: '#C6D92E', corpo: 'bola', olhos: 'talo', boca: 'o', extras: ['manchas', 'bracos'] }],
  ['Soneca', '#D7E3FC', { cor: '#7FC8F8', corpo: 'quadrado', olhos: 'sono', chifres: 'tufo', cor2: '#2456A6', boca: 'sorriso', extras: ['barriga', 'pes'] }],
  ['Tufo', '#FDE2A7', { cor: '#F28C28', corpo: 'peludo', olhos: 'sono', chifres: 'ponta', cor2: '#6B4226', boca: 'dentes', extras: ['pes'] }],
  ['Fuzuê', '#C8F0D0', { cor: '#D62246', corpo: 'ovo', olhos: 3, pupila: '#2456A6', chifres: 'tufo', cor2: '#FFC93C', boca: 'dentes', extras: ['listras', 'asas'] }],
]

export const cartasMonstrinhos = () => monstros.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, monstro(o)) }))
