import { TINTA, c, e, p, r, l, sim, esp, recorte, carta, tom } from './base.mjs'

const PELO = {
  laranja: '#F2994A',
  preto: '#33333F',
  branco: '#FAFAFA',
  cinza: '#9AA1AC',
  creme: '#F3DDB3',
  marrom: '#8B5E3C',
}

const OLHO = { verde: '#5BC76B', azul: '#4DB6E8', amarelo: '#FFD23F', ambar: '#F28C28' }

const BRANCO = '#FAFAFA'
const ROSA = '#F4A7B0'

const ORELHAS = {
  normal: (cor) => sim(p('M46 94 L44 24 L96 60 Z', cor) + p('M54 78 L53 42 L80 60 Z', ROSA)),
  tufos: (cor) => sim(p('M46 94 L44 24 L96 60 Z', cor) + p('M54 78 L53 42 L80 60 Z', ROSA) + l('M44 26 L36 8 M46 26 L46 6', cor, 4)),
  dobrada: (cor) => sim(p('M46 86 Q40 44 84 52 Q74 60 68 78 Z', cor) + l('M52 62 Q64 58 78 56', tom(cor, -0.25), 3)),
}

const PADROES = {
  liso: () => '',
  tigrado: (cor) => {
    const t = tom(cor, -0.4)
    return (
      p('M100 58 L94 84 H106 Z', t) + sim(p('M80 60 L80 80 L88 77 Z', t)) +
      sim(p('M38 108 L62 114 L38 120 Z', t) + p('M42 130 L64 132 L46 142 Z', t))
    )
  },
  bicolor: () => e(100, 152, 42, 36, BRANCO) + p('M100 60 L86 124 H114 Z', BRANCO),
  siames: () => e(100, 124, 38, 36, '#5A4636'),
  calico: () => p('M30 50 H98 L84 118 H30 Z', PELO.laranja) + p('M118 50 H180 V112 L128 98 Z', PELO.preto),
  smoking: () => e(100, 150, 34, 30, BRANCO),
  malhado: (cor, cor2) => c(64, 78, 20, cor2) + c(140, 118, 22, cor2) + c(112, 60, 12, cor2) + c(70, 150, 12, cor2),
  pirata: (cor, cor2) => e(124, 104, 26, 28, cor2),
}

const olhoAberto = (x, cor) => e(x, 106, 11, 12.5, cor) + e(x, 106, 3.5, 10, TINTA) + c(x + 3.5, 101, 2.6, '#fff')
const olhoFechado = (x) => l(`M${x - 10} 106 Q${x} 115 ${x + 10} 106`, TINTA, 3.5)
const olhoFeliz = (x) => l(`M${x - 10} 110 Q${x} 99 ${x + 10} 110`, TINTA, 3.5)

const ACESSORIOS = {
  coleira: (cor = '#E63946') =>
    p('M56 158 Q100 180 144 158 L146 170 Q100 192 54 170 Z', cor) + c(100, 184, 8, '#F5B301') + c(100, 186, 2, TINTA),
  laco: (cor = '#F06BA8') => p('M140 56 L118 40 V72 Z M140 56 L162 40 V72 Z', cor) + c(140, 56, 7, tom(cor, -0.25)),
  gravata: (cor = '#2456A6') => p('M100 176 L74 162 V190 Z M100 176 L126 162 V190 Z', cor) + c(100, 176, 7, tom(cor, -0.25)),
  bandana: (cor = '#E63946') => p('M56 158 Q100 178 144 158 L100 200 Z', cor) + sim(c(86, 176, 2.5, '#fff')) + c(100, 188, 2.5, '#fff'),
  oculos: () => sim(c(76, 106, 16, '#fff', `fill-opacity=".25" stroke="${TINTA}" stroke-width="4"`)) + l('M92 104 H108', TINTA, 4),
  cartola: () => r(76, 10, 48, 44, '#2B2B33', 4) + r(62, 50, 76, 10, '#2B2B33', 5) + r(76, 38, 48, 8, '#E63946'),
  coroa: () => p('M72 56 L66 22 L86 40 L100 14 L114 40 L134 22 L128 56 Z', '#F5B301') + c(100, 44, 5, '#E63946'),
  flor: () =>
    [0, 72, 144, 216, 288].map((a) => `<g transform="rotate(${a} 142 58)">${c(142, 46, 8, '#F06BA8')}</g>`).join('') + c(142, 58, 6, '#FFE156'),
  perolas: () => [62, 74, 87, 100, 113, 126, 138].map((x, i) => c(x, 164 + [0, 5, 8, 9, 8, 5, 0][i], 5, '#fff')).join(''),
}

function gato(o) {
  const {
    cor,
    cor2 = PELO.cinza,
    padrao = 'liso',
    olhos = 'verde',
    olhoDir,
    orelha = 'normal',
    peludo = false,
    acess,
    acessCor,
  } = o
  const escuro = cor === PELO.preto
  const siames = padrao === 'siames'
  const corOrelha = siames ? '#5A4636' : cor
  const forma = e(100, 112, 60, 52, '#000')
  const peitoBranco = ['bicolor', 'smoking', 'calico', 'malhado', 'pirata'].includes(padrao)

  const olhoEsq = olhos === 'fechado' ? olhoFechado(76) : olhos === 'feliz' ? olhoFeliz(76) : olhoAberto(76, OLHO[olhos])
  const d = olhoDir ?? olhos
  const olhoDirSvg = d === 'fechado' ? olhoFechado(124) : d === 'feliz' ? olhoFeliz(124) : olhoAberto(124, OLHO[d])

  return (
    e(100, 208, 62, 52, cor) +
    (peitoBranco ? e(100, 204, 32, 44, BRANCO) : '') +
    (peludo ? sim(p('M50 108 L16 118 L42 132 L18 146 L48 150 L30 166 L66 160 Z', cor)) : '') +
    ORELHAS[orelha](corOrelha) +
    forma.replace('#000', cor) +
    recorte(forma, PADROES[padrao](cor, cor2)) +
    (peludo ? p('M88 64 L94 48 L100 62 L106 48 L112 64 Z', cor) : '') +
    olhoEsq +
    olhoDirSvg +
    p('M93 126 H107 L100 135 Z', siames || escuro ? '#C96A80' : '#F06B84') +
    l('M100 135 V139 M89 141 Q95 148 100 139 Q105 148 111 141', siames || escuro ? '#F2F2F2' : TINTA, 3) +
    sim(l('M62 134 L26 126 M62 141 L26 146', escuro ? '#F2F2F2' : '#6B7280', 2)) +
    (acess ? ACESSORIOS[acess](acessCor) : '')
  )
}

const gatos = [
  ['Mimi', '#FAD2E1', { cor: PELO.branco, olhos: 'azul', acess: 'laco' }],
  ['Bigodes', '#CDEAC0', { cor: PELO.cinza, padrao: 'tigrado', olhos: 'verde', acess: 'coleira' }],
  ['Frajola', '#FFE5A0', { cor: PELO.preto, padrao: 'smoking', olhos: 'amarelo' }],
  ['Tigrão', '#BDE0FE', { cor: PELO.laranja, padrao: 'tigrado', olhos: 'verde', peludo: true }],
  ['Nina', '#E2CFF4', { cor: PELO.creme, padrao: 'siames', olhos: 'azul' }],
  ['Pantera', '#FFD6A5', { cor: PELO.preto, olhos: 'amarelo' }],
  ['Floquinho', '#C9E4DE', { cor: PELO.branco, olhos: 'azul', olhoDir: 'amarelo', peludo: true }],
  ['Sushi', '#D7E3FC', { cor: PELO.branco, padrao: 'calico', olhos: 'verde', acess: 'coleira', acessCor: '#2456A6' }],
  ['Pipoca', '#FFCFB3', { cor: PELO.branco, cor2: PELO.cinza, padrao: 'malhado', olhos: 'amarelo', acess: 'gravata' }],
  ['Fumaça', '#F8E1B4', { cor: PELO.cinza, olhos: 'ambar', orelha: 'dobrada' }],
  ['Caramelo', '#BEE9E8', { cor: PELO.laranja, padrao: 'bicolor', olhos: 'verde', acess: 'bandana' }],
  ['Luna', '#FFF1B8', { cor: PELO.preto, olhos: 'azul', acess: 'coleira', acessCor: '#8E6BBF' }],
  ['Mingau', '#D0F4DE', { cor: PELO.creme, olhos: 'fechado' }],
  ['Paçoca', '#CFE1F2', { cor: PELO.marrom, padrao: 'tigrado', olhos: 'amarelo' }],
  ['Jujuba', '#DCEBC3', { cor: PELO.branco, padrao: 'calico', olhos: 'azul', peludo: true, acess: 'laco', acessCor: '#8E6BBF' }],
  ['Zé', '#F6D6C8', { cor: PELO.cinza, padrao: 'bicolor', olhos: 'verde', acess: 'cartola' }],
  ['Amora', '#FDE2A7', { cor: PELO.preto, olhos: 'verde', peludo: true, acess: 'flor' }],
  ['Nuvem', '#C5E8F7', { cor: PELO.branco, olhos: 'azul', orelha: 'dobrada', acess: 'coleira', acessCor: '#2EAD4B' }],
  ['Faísca', '#D9F0C4', { cor: PELO.laranja, olhos: 'amarelo', olhoDir: 'fechado', orelha: 'tufos' }],
  ['Bolota', '#E4D9F5', { cor: PELO.creme, padrao: 'tigrado', olhos: 'feliz', peludo: true }],
  ['Sardinha', '#FFD9C0', { cor: PELO.cinza, padrao: 'tigrado', olhos: 'azul', acess: 'bandana', acessCor: '#2456A6' }],
  ['Kiko', '#C7EFCF', { cor: PELO.branco, cor2: PELO.preto, padrao: 'pirata', olhos: 'verde' }],
  ['Chanel', '#FCE0E8', { cor: PELO.creme, padrao: 'siames', olhos: 'azul', peludo: true, acess: 'perolas' }],
  ['Batata', '#CFF0E8', { cor: PELO.marrom, olhos: 'amarelo', acess: 'oculos' }],
  ['Pudim', '#D6E6F5', { cor: PELO.creme, padrao: 'bicolor', olhos: 'verde', acess: 'gravata', acessCor: '#E63946' }],
  ['Meia-Noite', '#FFE0B5', { cor: PELO.preto, olhos: 'verde', olhoDir: 'azul', orelha: 'tufos' }],
  ['Biscoito', '#E6D4F2', { cor: PELO.marrom, padrao: 'bicolor', olhos: 'azul', orelha: 'dobrada' }],
  ['Farofa', '#C8F0D0', { cor: PELO.branco, cor2: PELO.laranja, padrao: 'malhado', olhos: 'amarelo', peludo: true }],
  ['Lili', '#F2D5B8', { cor: PELO.branco, olhos: 'verde', acess: 'coroa' }],
  ['Tom', '#D8E2DC', { cor: PELO.cinza, padrao: 'smoking', olhos: 'amarelo', acess: 'coleira' }],
]

export const cartasGatos = () => gatos.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, gato(o)) }))
