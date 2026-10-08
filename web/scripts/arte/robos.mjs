import { TINTA, c, e, p, r, l, sim, carta, tom } from './base.mjs'

const METAL = '#9AA5B4'

// cada cabeça informa o topo (para a antena) e a lateral esquerda (para as orelhas)
const CABECAS = {
  quadrada: { topo: 46, lado: 56, forma: (cor) => r(56, 46, 88, 78, cor, 12) },
  redonda: { topo: 44, lado: 54, forma: (cor) => e(100, 86, 46, 42, cor) },
  trapezio: { topo: 46, lado: 56, forma: (cor) => p('M66 46 H134 Q142 46 143 54 L150 116 Q150 124 142 124 H58 Q50 124 50 116 L57 54 Q58 46 66 46 Z', cor) },
  larga: { topo: 54, lado: 42, forma: (cor) => r(42, 54, 116, 68, cor, 24) },
  alta: { topo: 34, lado: 66, forma: (cor) => r(66, 34, 68, 92, cor, 12) },
}

const OLHOS = {
  redondos: (luz) => sim(c(80, 80, 12, '#fff') + c(80, 80, 6, luz)),
  visor: (luz) => r(64, 68, 72, 24, TINTA, 12) + sim(c(84, 80, 6, luz)),
  um: (luz) => c(100, 80, 18, '#fff') + c(100, 80, 10, luz) + c(100, 80, 4, TINTA),
  quadrados: (luz) => sim(r(70, 70, 20, 20, TINTA, 4) + r(74, 74, 12, 12, luz, 2)),
  onda: (luz) => r(64, 68, 72, 24, TINTA, 5) + l('M70 80 L78 74 L86 86 L94 74 L102 86 L110 74 L118 86 L130 80', luz, 3),
  bravo: (luz) => sim(p('M68 72 L94 80 V90 H68 Z', TINTA) + r(74, 80, 14, 7, luz, 2)),
  desigual: (luz) => c(80, 80, 14, '#fff') + c(80, 80, 7, luz) + c(122, 80, 8, '#fff') + c(122, 80, 4, luz),
}

const BOCAS = {
  nenhuma: () => '',
  grade: () => r(78, 100, 44, 14, '#fff', 3) + l('M89 100 V114 M100 100 V114 M111 100 V114', TINTA, 2.5),
  linha: () => l('M84 108 H116', TINTA, 4),
  sorriso: () => l('M82 103 Q100 116 118 103', TINTA, 4),
  falante: () => [86, 100, 114].map((x) => c(x, 108, 4, TINTA)).join(''),
  ziper: () => l('M80 108 L88 102 L96 112 L104 102 L112 112 L120 106', TINTA, 3.5),
}

const ANTENAS = {
  nenhuma: () => '',
  uma: (t, luz) => l(`M100 ${t + 4} V${t - 20}`, METAL, 5) + c(100, t - 24, 8, luz),
  duas: (t, luz) => sim(l(`M80 ${t + 6} L70 ${t - 16}`, METAL, 5) + c(69, t - 19, 7, luz)),
  helice: (t) => l(`M100 ${t + 4} V${t - 16}`, METAL, 5) + e(100, t - 18, 30, 6, '#4A4F5C'),
  lampada: (t) => r(92, t - 6, 16, 10, METAL, 2) + c(100, t - 16, 14, '#FFE156') + l(`M95 ${t - 14} L100 ${t - 20} L105 ${t - 14}`, '#F28C28', 2.5),
  prato: (t, luz) => l(`M100 ${t + 4} V${t - 12}`, METAL, 5) + p(`M76 ${t - 26} Q100 ${t + 2} 124 ${t - 26} Z`, '#C9CED6') + c(100, t - 26, 5, luz),
}

const ORELHAS = {
  nenhuma: () => '',
  parafuso: (x) => sim(r(x - 10, 74, 14, 20, METAL, 3) + r(x - 16, 80, 8, 8, '#4A4F5C', 2)),
  fone: (x, cor2) => sim(c(x, 84, 13, cor2) + c(x, 84, 6, '#fff', 'opacity=".5"')),
  cano: (x) => sim(l(`M${x} 96 Q${x - 26} 96 ${x - 26} 150`, METAL, 8)),
}

const PEITOS = {
  nenhum: () => '',
  botoes: () => c(82, 174, 7, '#E63946') + c(100, 174, 7, '#FFC93C') + c(118, 174, 7, '#57B85A'),
  medidor: () => c(100, 176, 17, '#fff') + l('M100 176 L110 166', '#E63946', 3.5) + c(100, 176, 3, TINTA),
  coracao: () => p('M100 190 C76 172 82 156 92 156 Q100 156 100 166 Q100 156 108 156 C118 156 124 172 100 190 Z', '#E63946'),
  tela: (luz) => r(72, 158, 56, 32, TINTA, 6) + l('M78 176 L88 176 L94 164 L102 186 L110 170 L122 170', luz, 3),
  grade: () => r(74, 160, 52, 30, '#4A4F5C', 4) + l('M80 168 H120 M80 175 H120 M80 182 H120', '#C9CED6', 2.5),
}

function robo(o) {
  const {
    cor, cabeca = 'quadrada', olhos = 'redondos', luz = '#3FE0D0', boca = 'grade', antena = 'uma', orelhas = 'parafuso',
    cor2 = tom(cor, -0.3), peito = 'botoes', extra = '',
  } = o
  const { topo, lado, forma } = CABECAS[cabeca]
  return (
    ANTENAS[antena](topo, luz) +
    r(88, 116, 24, 34, METAL) + l('M88 130 H112 M88 138 H112', '#6C7686', 2.5) +
    p('M28 200 V164 Q28 144 48 144 H152 Q172 144 172 164 V200 Z', tom(cor, -0.15)) +
    PEITOS[peito](luz) +
    ORELHAS[orelhas](lado, cor2) +
    forma(cor) +
    OLHOS[olhos](luz) +
    BOCAS[boca]() +
    extra
  )
}

const rebites = (cor) => [[64, 54], [136, 54], [64, 116], [136, 116]].map(([x, y]) => c(x, y, 3, cor)).join('')
const ferrugem = c(68, 60, 8, '#8B4A22', 'opacity=".7"') + c(128, 112, 10, '#8B4A22', 'opacity=".7"') + c(120, 58, 5, '#8B4A22', 'opacity=".7"')
const remendo = r(112, 50, 24, 18, '#C9CED6', 2) + l('M116 54 L132 64 M132 54 L116 64', '#4A4F5C', 2)
const bochechas = sim(c(66, 102, 7, '#F28B8B', 'opacity=".8"'))
const cilios = sim(l('M68 68 L64 62 M76 65 L74 58 M86 65 L88 58', TINTA, 2.5))
const bigode = p('M76 100 Q100 88 124 100 Q112 108 100 100 Q88 108 76 100 Z', TINTA)
const laco = p('M100 40 L78 26 V54 Z M100 40 L122 26 V54 Z', '#E63946') + c(100, 40, 6, '#B5202C')
const borboleta = p('M100 148 L80 138 V160 Z M100 148 L120 138 V160 Z', '#E63946') + c(100, 148, 5, '#B5202C')
const raio = p('M104 48 L92 66 H100 L96 78 L110 60 H102 Z', '#FFE156')
const rachadura = l('M124 46 L116 60 L126 68 L118 80', TINTA, 2.5)

const robos = [
  ['Bip', '#D7E3FC', { cor: '#E63946', cabeca: 'quadrada', olhos: 'redondos', antena: 'uma', peito: 'botoes', boca: 'sorriso' }],
  ['Zeta', '#FDE2A7', { cor: '#3FA7D6', cabeca: 'redonda', olhos: 'visor', luz: '#FFE156', antena: 'duas', orelhas: 'fone', peito: 'tela', boca: 'linha' }],
  ['Lata', '#CDEAC0', { cor: '#C9CED6', cabeca: 'alta', olhos: 'quadrados', luz: '#57B85A', antena: 'nenhuma', peito: 'grade', boca: 'grade', extra: rebites('#6C7686') }],
  ['Parafuso', '#FAD2E1', { cor: '#F5B301', cabeca: 'trapezio', olhos: 'um', luz: '#D62246', antena: 'helice', peito: 'medidor', boca: 'falante' }],
  ['Mola', '#BEE9E8', { cor: '#8E6BBF', cabeca: 'larga', olhos: 'desigual', luz: '#F06BA8', antena: 'duas', orelhas: 'nenhuma', peito: 'coracao', boca: 'sorriso', extra: bochechas }],
  ['Chip', '#E2CFF4', { cor: '#2EAD4B', cabeca: 'quadrada', olhos: 'onda', luz: '#7ED957', antena: 'prato', peito: 'tela', boca: 'nenhuma' }],
  ['Bolt', '#FFE5A0', { cor: '#2456A6', cabeca: 'trapezio', olhos: 'bravo', luz: '#FFE156', antena: 'nenhuma', orelhas: 'cano', peito: 'medidor', boca: 'ziper', extra: raio }],
  ['Pixel', '#C9E4DE', { cor: '#F06BA8', cabeca: 'redonda', olhos: 'quadrados', luz: '#7FC8F8', antena: 'lampada', orelhas: 'fone', peito: 'coracao', boca: 'sorriso' }],
  ['Nano', '#D0F4DE', { cor: '#FFFFFF', cabeca: 'redonda', olhos: 'um', luz: '#3FA7D6', antena: 'uma', orelhas: 'nenhuma', peito: 'nenhum', boca: 'nenhuma' }],
  ['Turbo', '#FFD6A5', { cor: '#D9463A', cabeca: 'larga', olhos: 'visor', luz: '#FF8A3D', antena: 'nenhuma', orelhas: 'cano', peito: 'grade', boca: 'grade' }],
  ['Giga', '#D6E6F5', { cor: '#4A4F5C', cabeca: 'alta', olhos: 'bravo', luz: '#E63946', antena: 'duas', peito: 'botoes', boca: 'grade', extra: rebites('#9AA5B4') }],
  ['Byte', '#F6D6C8', { cor: '#2EAD9A', cabeca: 'quadrada', olhos: 'desigual', luz: '#2B2B33', antena: 'helice', orelhas: 'fone', peito: 'botoes', boca: 'ziper' }],
  ['Zap', '#DCEBC3', { cor: '#FFC93C', cabeca: 'redonda', olhos: 'onda', luz: '#FFE156', antena: 'lampada', peito: 'medidor', boca: 'sorriso' }],
  ['Ferrugem', '#C5E8F7', { cor: '#B5651D', cabeca: 'quadrada', olhos: 'desigual', luz: '#F5B301', antena: 'uma', peito: 'grade', boca: 'linha', extra: ferrugem + rachadura }],
  ['Cromo', '#FFF1B8', { cor: '#E3E7ED', cabeca: 'trapezio', olhos: 'visor', luz: '#3FE0D0', antena: 'nenhuma', orelhas: 'fone', cor2: '#2456A6', peito: 'tela', boca: 'linha' }],
  ['Dínamo', '#E4D9F5', { cor: '#F28C28', cabeca: 'larga', olhos: 'redondos', luz: '#2456A6', antena: 'helice', peito: 'medidor', boca: 'grade', extra: bigode }],
  ['Órbita', '#FFCFB3', { cor: '#5B6FD6', cabeca: 'redonda', olhos: 'um', luz: '#FFE156', antena: 'prato', orelhas: 'nenhuma', peito: 'tela', boca: 'falante' }],
  ['Vega', '#D8E2DC', { cor: '#F8A5C2', cabeca: 'quadrada', olhos: 'redondos', luz: '#8E6BBF', antena: 'nenhuma', orelhas: 'fone', cor2: '#8E6BBF', peito: 'coracao', boca: 'sorriso', extra: cilios + laco }],
  ['Quilo', '#C7EFCF', { cor: '#6C7686', cabeca: 'larga', olhos: 'quadrados', luz: '#F5B301', antena: 'uma', peito: 'grade', boca: 'falante', extra: remendo }],
  ['Mega', '#FCE0E8', { cor: '#1F7A5C', cabeca: 'alta', olhos: 'um', luz: '#7ED957', antena: 'duas', orelhas: 'cano', peito: 'botoes', boca: 'ziper' }],
  ['Titânio', '#CFE1F2', { cor: '#2B2B33', cabeca: 'trapezio', olhos: 'onda', luz: '#E63946', antena: 'nenhuma', peito: 'tela', boca: 'nenhuma', extra: rebites('#6C7686') }],
  ['Radar', '#F8E1B4', { cor: '#3FA7D6', cabeca: 'alta', olhos: 'redondos', luz: '#D62246', antena: 'prato', peito: 'medidor', boca: 'linha' }],
  ['Sucata', '#FFE0B5', { cor: '#8B9A6B', cabeca: 'trapezio', olhos: 'desigual', luz: '#E63946', antena: 'duas', orelhas: 'cano', peito: 'nenhum', boca: 'ziper', extra: ferrugem + remendo }],
  ['Neon', '#E6D4F2', { cor: '#2B2B33', cabeca: 'redonda', olhos: 'visor', luz: '#F06BA8', antena: 'uma', orelhas: 'fone', cor2: '#F06BA8', peito: 'coracao', boca: 'nenhuma' }],
  ['Pilha', '#CFF0E8', { cor: '#57B85A', cabeca: 'alta', olhos: 'redondos', luz: '#2B2B33', antena: 'nenhuma', orelhas: 'nenhuma', peito: 'botoes', boca: 'sorriso', extra: r(84, 26, 32, 10, '#F5B301', 3) + bochechas }],
  ['Beta', '#FFD9C0', { cor: '#7FC8F8', cabeca: 'larga', olhos: 'um', luz: '#2456A6', antena: 'lampada', orelhas: 'fone', peito: 'tela', boca: 'sorriso' }],
  ['Ômega', '#D9F0C4', { cor: '#7C5CE0', cabeca: 'quadrada', olhos: 'bravo', luz: '#3FE0D0', antena: 'prato', orelhas: 'cano', peito: 'medidor', boca: 'grade' }],
  ['Átomo', '#D7E3FC', { cor: '#F5B301', cabeca: 'redonda', olhos: 'redondos', luz: '#2EAD4B', antena: 'helice', orelhas: 'nenhuma', peito: 'coracao', boca: 'falante', extra: bochechas }],
  ['Volt', '#FDE2A7', { cor: '#E63946', cabeca: 'larga', olhos: 'onda', luz: '#FFE156', antena: 'duas', peito: 'grade', boca: 'nenhuma', extra: rebites('#fff') }],
  ['Robson', '#C8F0D0', { cor: '#C9CED6', cabeca: 'quadrada', olhos: 'redondos', luz: '#6B4226', antena: 'nenhuma', orelhas: 'parafuso', peito: 'nenhum', boca: 'sorriso', extra: bigode + borboleta }],
]

export const cartasRobos = () => robos.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, robo(o)) }))
