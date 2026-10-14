// Retratos de cachorro. A Stella (a caramelo da foto) é desenhada à parte; os outros saem do construtor `cachorro`.
import { TINTA, c, e, p, r, l, sim, recorte, carta, tom } from './base.mjs'

const BRANCO = '#FAFAFA'
const NARIZ = '#1E1A1E'
const LINGUA = '#F27D8E'
const ROSA = '#F2B8B0'

const PELO = {
  caramelo: '#C98B4A',
  dourado: '#E3A857',
  creme: '#F1DDB8',
  preto: '#2E2B33',
  chocolate: '#6B4226',
  ruivo: '#C2622D',
  laranja: '#EE9A3E',
  fulvo: '#D9A766',
  cinza: '#8C93A0',
  azulado: '#6E7787',
  marrom: '#9A5B2E',
  castanho: '#B27841',
}

// orelhas que ficam atrás da cabeça
const ORELHAS_ATRAS = {
  empe: (cor, dentro) => sim(p('M56 80 L46 22 L92 56 Z', cor) + p('M60 70 L54 36 L82 58 Z', dentro)),
  grande: (cor, dentro) => sim(p('M60 82 L26 16 Q62 20 94 56 Z', cor) + p('M62 70 L38 28 Q62 32 86 58 Z', dentro)),
  cortada: (cor, dentro) => sim(p('M62 70 L54 4 L90 56 Z', cor) + p('M64 60 L60 20 L82 56 Z', dentro)),
  pequena: (cor) => sim(p('M60 70 L58 36 L86 56 Z', cor)),
  redonda: (cor) => sim(c(60, 60, 17, cor)),
  dobrada: (cor) => sim(p('M54 76 L56 40 L90 56 Z', cor) + p('M56 40 L76 48 L64 64 Z', tom(cor, -0.2))),
}

// orelhas caídas, desenhadas por cima da cabeça
const ORELHAS_FRENTE = {
  caida: (cor) => sim(p('M60 60 C36 58 28 100 36 128 C44 140 58 128 62 102 Z', cor)),
  longa: (cor) => sim(p('M60 62 C34 60 22 120 30 168 C40 182 60 162 62 110 Z', cor)),
  cacheada: (cor) => sim([[48, 76], [42, 98], [44, 120], [50, 142], [58, 104], [58, 128]].map(([x, y]) => c(x, y, 14, cor)).join('')),
}

const CABECA = 'M50 100 C50 64 72 52 100 52 C128 52 150 64 150 100 C150 132 128 148 100 148 C72 148 50 132 50 100 Z'

const MARCAS = {
  mascara: (cor2) => e(100, 124, 32, 28, cor2) + sim(e(80, 94, 14, 12, cor2)),
  focinho: (cor2) => e(100, 124, 30, 24, cor2),
  blaze: () => p('M100 48 L90 106 H110 Z', BRANCO) + e(100, 126, 30, 24, BRANCO),
  pontos: (cor2) => sim(c(80, 80, 6, cor2) + e(74, 128, 12, 12, cor2)) + e(100, 128, 24, 18, cor2),
  husky: () => e(100, 126, 46, 30, BRANCO) + sim(e(80, 82, 13, 7, BRANCO)) + p('M100 90 L94 112 H106 Z', BRANCO),
  bochechas: () => sim(e(70, 120, 20, 16, BRANCO)) + e(100, 128, 24, 20, BRANCO) + sim(c(80, 82, 5, BRANCO)),
  manchas: (cor2) => [[70, 70, 7], [128, 76, 6], [112, 60, 4], [62, 108, 5], [138, 112, 6], [84, 140, 4]].map(([x, y, k]) => c(x, y, k, cor2)).join(''),
  pirata: (cor2) => e(78, 90, 20, 22, cor2),
  metade: (cor2) => r(0, 0, 100, 200, cor2) + p('M100 48 L94 106 H106 Z', BRANCO) + e(100, 126, 28, 22, BRANCO),
  testa: (cor2) => p('M64 56 Q100 40 136 56 L118 84 Q100 76 82 84 Z', cor2),
}

// marcas que só um cachorro usa, somadas à marca principal
const EXTRAS = {
  testa: (cor2) => MARCAS.testa(cor2),
  blazeFino: () => p('M100 50 L95 102 H105 Z', BRANCO),
  outroOlho: (cor2) => e(122, 90, 16, 18, cor2),
}

const olhoAberto = (x, cor) => (cor ? c(x, 94, 8, cor) + c(x, 94, 4, NARIZ) : c(x, 94, 7, NARIZ)) + c(x + 2.5, 91, 2.2, '#fff')

const OLHOS = {
  normal: () => sim(olhoAberto(80)),
  azul: () => sim(olhoAberto(80, '#6EC6F0')),
  grandes: () => sim(c(78, 94, 11, NARIZ) + c(82, 89, 3.5, '#fff')),
  caidos: () => sim(olhoAberto(80) + p('M70 98 Q80 108 90 98 Q80 104 70 98 Z', '#C9535E') + l('M68 86 L90 90', tom('#000', 0.3), 3)),
  feliz: () => sim(l('M71 96 Q80 86 89 96', NARIZ, 3.5)),
  pelo: (cor) => sim(c(80, 96, 6, NARIZ) + p('M64 92 Q80 76 96 88 L92 92 Q80 84 66 96 Z', cor)),
}

const nariz = (y = 112) => p(`M88 ${y} Q100 ${y - 8} 112 ${y} Q108 ${y + 10} 100 ${y + 10} Q92 ${y + 10} 88 ${y} Z`, NARIZ) + c(95, y - 2, 2.5, '#fff', 'opacity=".5"')

const BOCAS = {
  fechada: () => l('M100 122 V128 M88 132 Q94 136 100 128 Q106 136 112 132', NARIZ, 3),
  lingua: () => p('M93 132 Q100 156 107 132 Z', LINGUA) + l('M100 122 V130 M86 132 Q93 138 100 130 Q107 138 114 132', NARIZ, 3),
  aberta: () => p('M84 128 Q100 160 116 128 Q100 136 84 128 Z', '#5A1E28') + e(100, 146, 9, 8, LINGUA) + l('M100 122 V130', NARIZ, 3),
  baixo: () => p('M80 132 Q100 126 120 132 Q118 146 100 146 Q82 146 80 132 Z', NARIZ) + [86, 94, 106, 114].map((x) => p(`M${x - 3} 134 L${x} 128 L${x + 3} 134 Z`, '#fff')).join(''),
  bochechuda: () => sim(p('M100 128 Q90 136 78 128 Q74 142 86 146 Q96 144 100 134 Z', tom('#000', 0.2))) + l('M100 122 V130', NARIZ, 3),
}

const ACESSORIOS = {
  coleira: (cor = '#E63946') => p('M60 150 Q100 170 140 150 L142 162 Q100 184 58 162 Z', cor) + c(100, 176, 8, '#F5B301') + c(100, 178, 2, TINTA),
  bandana: (cor = '#E63946') => p('M58 150 Q100 168 142 150 L100 196 Z', cor) + sim(c(86, 166, 2.5, '#fff')) + c(100, 180, 2.5, '#fff'),
  laco: (cor = '#F06BA8') => p('M100 44 L80 32 V56 Z M100 44 L120 32 V56 Z', cor) + c(100, 44, 6, tom(cor, -0.25)),
  barril: () => p('M60 150 Q100 168 140 150 L141 160 Q100 178 59 160 Z', '#C0392B') + r(84, 166, 32, 24, '#8B5A2B', 6) + l('M84 172 H116 M84 184 H116', '#5C3A1E', 2.5),
  oculos: () => sim(c(80, 94, 14, '#fff', `fill-opacity=".25" stroke="${TINTA}" stroke-width="4"`)) + l('M94 92 H106', TINTA, 4),
}

function cachorro(o) {
  const {
    cor, cor2 = PELO.preto, orelha = 'caida', orelhaCor = cor, marca, focinhoCor = tom(cor, 0.2),
    olhos = 'normal', boca = 'fechada', peito = false, acess, acessCor,
    fofo = false, cacheado = false, longo = false, barba = false, rugas = false, topete, extra, lingua = LINGUA,
  } = o
  const cabeca = p(CABECA, '#000')
  const dentro = orelhaCor === cor ? ROSA : tom(orelhaCor, 0.3)
  const fofura = (k) =>
    p(
      `M${Array.from({ length: 32 }, (_, i) => {
        const a = (Math.PI * i) / 16
        const R = i % 2 ? 54 * k : 64 * k
        return `${(100 + R * Math.cos(a)).toFixed(1)} ${(104 + R * Math.sin(a)).toFixed(1)}`
      }).join(' L')} Z`,
      cor,
    )

  return (
    e(100, 206, 64, 56, cor) +
    (peito ? e(100, 204, 28, 44, BRANCO) : '') +
    (longo ? sim(p('M60 70 C26 96 26 160 40 196 H76 C66 150 64 112 66 86 Z', longo === true ? cor : longo)) : '') +
    (fofo ? fofura(1.12) : '') +
    (ORELHAS_ATRAS[orelha] ? ORELHAS_ATRAS[orelha](orelhaCor, dentro) : '') +
    (cacheado ? [[64, 66], [80, 52], [100, 46], [120, 52], [136, 66]].map(([x, y]) => c(x, y, 18, cor)).join('') : '') +
    cabeca.replace('#000', cor) +
    (marca ? recorte(cabeca, MARCAS[marca](cor2)) : '') +
    (extra ? recorte(cabeca, EXTRAS[extra](cor2)) : '') +
    (focinhoCor ? e(100, 124, 26, 20, focinhoCor) : '') +
    (rugas ? l('M84 70 Q100 62 116 70 M88 78 Q100 72 112 78', tom(cor, -0.3), 3) : '') +
    (ORELHAS_FRENTE[orelha] ? ORELHAS_FRENTE[orelha](orelhaCor) : '') +
    (cacheado ? c(100, 44, 22, cor) + c(84, 52, 14, cor) + c(116, 52, 14, cor) : '') +
    OLHOS[olhos](cor) +
    (barba ? sim(p('M100 118 Q76 116 72 136 Q80 162 100 158 Z', barba)) : '') +
    nariz() +
    BOCAS[boca]().replaceAll(LINGUA, lingua) +
    (topete ? c(100, 52, 13, cor) + ACESSORIOS.laco(topete) : '') +
    (acess ? ACESSORIOS[acess](acessCor) : '')
  )
}

// A caramelo da foto: orelhonas em pé, focinho preto e a boca escancarada mostrando os dentinhos.
function stella() {
  const pelo = '#C98B4A'
  const claro = '#DDAA6E'
  const escuro = '#8E5A2C'
  const preto = '#231E21'
  // presas nas pontas, dentinhos no meio
  const dentesCima = [80, 87, 94, 100, 106, 113, 120]
    .map((x, i) => p(`M${x - 3} 123 L${x} ${i === 0 || i === 6 ? 135 : 129} L${x + 3} 123 Z`, '#fff'))
    .join('')
  const dentesBaixo = [86, 94, 106, 114].map((x) => p(`M${x - 3} 153 L${x} 145 L${x + 3} 153 Z`, '#fff')).join('')
  return (
    // pescoço comprido e peito branco
    p('M58 200 Q62 150 74 124 H128 Q140 150 146 200 Z', pelo) +
    p('M84 200 Q90 172 100 164 Q110 172 116 200 Z', '#F1E9DF') +
    // orelhas: a da esquerda enorme e em pé, a da direita um pouco tombada para fora
    p('M54 80 Q34 32 42 2 Q72 16 90 54 Z', pelo) + p('M60 68 Q46 36 48 14 Q68 28 82 54 Z', '#F0C6B8') +
    p('M116 52 Q148 26 180 26 Q172 60 150 84 Z', pelo) + p('M124 56 Q150 36 170 36 Q162 60 146 74 Z', '#EBBBAE') +
    // cabeça: larga em cima, com bochechas que descem dos lados da boca
    p('M54 86 C52 50 148 46 150 84 C152 110 146 134 134 148 H68 C56 134 52 110 54 86 Z', pelo) +
    sim(e(74, 128, 14, 18, claro, 'opacity=".7"')) +
    sim(e(78, 80, 13, 5, escuro, 'opacity=".5"')) + p('M92 66 Q100 62 108 66 L104 92 H96 Z', escuro, 'opacity=".25"') +
    // olhos escuros e brilhantes, com a sombra em volta
    sim(e(78, 90, 13, 11, escuro, 'opacity=".55"')) +
    c(78, 90, 8.5, preto) + c(81, 87, 2.6, '#fff') + c(122, 90, 8.5, '#000') + c(125, 87, 2.6, '#fff') +
    // focinho preto que desce até a boca
    p('M86 98 Q100 92 114 98 L130 120 Q100 128 70 120 Z', preto) +
    e(100, 104, 15, 10.5, '#151214') + e(95, 100, 4, 2.5, '#fff', 'opacity=".35"') +
    // boca escancarada, com o lábio preto em volta
    p('M68 118 Q100 108 132 118 C132 146 120 166 100 166 C80 166 68 146 68 118 Z', preto) +
    p('M76 124 Q100 116 124 124 Q120 150 100 155 Q80 150 76 124 Z', '#6A2430') +
    p('M83 140 Q100 127 117 140 Q116 155 100 157 Q85 155 83 140 Z', '#F08A9A') + l('M100 136 V151', '#D86A7C', 2) +
    dentesCima +
    dentesBaixo
  )
}

const cachorros = [
  ['Stella', '#5E5864', null],
  ['Thor', '#D7E3FC', { cor: PELO.castanho, cor2: PELO.preto, orelha: 'grande', marca: 'focinho', focinhoCor: null, olhos: 'normal', boca: 'lingua', extra: 'testa' }],
  ['Mel', '#CDEAC0', { cor: PELO.dourado, orelha: 'caida', orelhaCor: tom(PELO.dourado, -0.12), olhos: 'feliz', boca: 'lingua', acess: 'bandana' }],
  ['Bob', '#FFE5A0', { cor: PELO.preto, orelha: 'caida', focinhoCor: tom(PELO.preto, 0.12), acess: 'coleira' }],
  ['Luna', '#C5E8F7', { cor: PELO.cinza, orelha: 'empe', marca: 'husky', focinhoCor: null, olhos: 'azul', boca: 'lingua' }],
  ['Bidu', '#FFD6A5', { cor: PELO.marrom, orelha: 'longa', marca: 'blaze', focinhoCor: null, peito: true, olhos: 'normal' }],
  ['Pingo', '#FAD2E1', { cor: BRANCO, cor2: PELO.preto, orelha: 'caida', orelhaCor: PELO.preto, marca: 'manchas', focinhoCor: null, acess: 'coleira', acessCor: '#2456A6' }],
  ['Bolinha', '#E2CFF4', { cor: '#F4EFE6', orelha: 'cacheada', cacheado: true, focinhoCor: null, acess: 'laco', acessCor: '#E63946' }],
  ['Fred', '#BEE9E8', { cor: PELO.fulvo, cor2: PELO.preto, orelha: 'grande', marca: 'focinho', focinhoCor: null, olhos: 'grandes', rugas: true }],
  ['Nino', '#FDE2A7', { cor: PELO.fulvo, cor2: PELO.preto, orelha: 'dobrada', orelhaCor: PELO.preto, marca: 'mascara', focinhoCor: null, olhos: 'grandes', rugas: true, boca: 'lingua' }],
  ['Lola', '#FCE0E8', { cor: BRANCO, cor2: PELO.castanho, orelha: 'longa', orelhaCor: PELO.castanho, longo: PELO.castanho, marca: 'pirata', focinhoCor: null, topete: '#F06BA8', olhos: 'grandes' }],
  ['Kiara', '#D0F4DE', { cor: PELO.fulvo, orelha: 'pequena', longo: PELO.azulado, marca: 'testa', cor2: PELO.azulado, focinhoCor: null, topete: '#E63946' }],
  ['Toby', '#F8E1B4', { cor: PELO.ruivo, orelha: 'longa', orelhaCor: tom(PELO.ruivo, -0.15), focinhoCor: tom(PELO.ruivo, 0.15), acess: 'coleira', acessCor: '#2EAD4B' }],
  ['Max', '#C9E4DE', { cor: PELO.preto, orelha: 'dobrada', marca: 'blaze', focinhoCor: null, peito: true, olhos: 'normal', boca: 'lingua' }],
  ['Zeus', '#F6D6C8', { cor: PELO.preto, cor2: PELO.marrom, orelha: 'dobrada', marca: 'pontos', focinhoCor: null, acess: 'coleira', acessCor: '#9AA5B4' }],
  ['Duke', '#DCEBC3', { cor: PELO.preto, cor2: PELO.marrom, orelha: 'cortada', orelhaCor: PELO.preto, marca: 'pontos', focinhoCor: null, olhos: 'normal' }],
  ['Brutus', '#FFF1B8', { cor: PELO.fulvo, cor2: PELO.preto, orelha: 'dobrada', marca: 'mascara', focinhoCor: null, peito: true, boca: 'bochechuda', extra: 'blazeFino' }],
  ['Pandora', '#E4D9F5', { cor: PELO.preto, cor2: PELO.marrom, orelha: 'grande', orelhaCor: PELO.preto, marca: 'pontos', focinhoCor: null, olhos: 'grandes', acess: 'laco', acessCor: '#F06BA8' }],
  ['Amora', '#CFE1F2', { cor: PELO.laranja, orelha: 'pequena', fofo: true, focinhoCor: tom(PELO.laranja, 0.3), olhos: 'grandes', boca: 'lingua' }],
  ['Neve', '#FFD9C0', { cor: BRANCO, orelha: 'longa', longo: true, focinhoCor: null, olhos: 'grandes', topete: '#7FC8F8' }],
  ['Bento', '#D8E2DC', { cor: PELO.cinza, orelha: 'dobrada', focinhoCor: null, olhos: 'pelo', barba: '#D3D7DE' }],
  ['Café', '#C7EFCF', { cor: BRANCO, cor2: PELO.castanho, orelha: 'redonda', orelhaCor: PELO.castanho, marca: 'pirata', focinhoCor: null, rugas: true, boca: 'baixo' }],
  ['Hachi', '#E6D4F2', { cor: PELO.laranja, orelha: 'empe', marca: 'bochechas', focinhoCor: null, olhos: 'feliz', peito: true }],
  ['Paçoca', '#BDE0FE', { cor: PELO.laranja, orelha: 'grande', marca: 'blaze', focinhoCor: null, peito: true, boca: 'lingua' }],
  ['Barão', '#FFE0B5', { cor: BRANCO, cor2: PELO.ruivo, orelha: 'caida', orelhaCor: PELO.ruivo, marca: 'pirata', focinhoCor: null, olhos: 'caidos', boca: 'bochechuda', acess: 'barril', extra: 'outroOlho' }],
  ['Fumaça', '#CFF0E8', { cor: PELO.marrom, orelha: 'longa', orelhaCor: tom(PELO.marrom, -0.2), marca: 'blaze', focinhoCor: null, olhos: 'caidos', peito: true, boca: 'bochechuda' }],
  ['Simba', '#D9F0C4', { cor: PELO.ruivo, orelha: 'redonda', fofo: true, focinhoCor: tom(PELO.ruivo, 0.2), olhos: 'pelo', boca: 'aberta', lingua: '#4B3B7A' }],
  ['Billy', '#D6E6F5', { cor: PELO.azulado, orelha: 'dobrada', focinhoCor: tom(PELO.azulado, 0.2), peito: true, boca: 'aberta', acess: 'coleira', acessCor: '#F28C28' }],
  ['Mia', '#F2D5B8', { cor: PELO.dourado, orelha: 'cacheada', orelhaCor: tom(PELO.dourado, -0.1), focinhoCor: tom(PELO.dourado, 0.25), olhos: 'grandes', acess: 'laco', acessCor: '#8E6BBF' }],
  ['Theo', '#FFCFB3', { cor: BRANCO, cor2: PELO.preto, orelha: 'dobrada', orelhaCor: PELO.preto, marca: 'metade', focinhoCor: null, boca: 'lingua', acess: 'bandana', acessCor: '#2456A6' }],
]

export const cartasCachorros = () =>
  cachorros.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, o ? cachorro(o) : stella()) }))
