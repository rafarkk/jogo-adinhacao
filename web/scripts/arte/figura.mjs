// Construtor de retratos humanos, usado pelos temas "pessoas" e "anime".
import { TINTA, c, e, p, r, l, sim, tom } from './base.mjs'

export const PELE = {
  clara: '#FBD3B0',
  media: '#E8B48A',
  morena: '#C68B59',
  escura: '#8D5A3B',
  retinta: '#5C3A26',
}

export const CABELO = {
  preto: '#2B2B33',
  castanho: '#6B4226',
  loiro: '#F2C94C',
  ruivo: '#D9541E',
  grisalho: '#C9CED6',
  azul: '#3FA7D6',
  rosa: '#F06BA8',
}

export const CURTO = 'M56 96 C46 34 154 34 144 96 C140 74 124 62 100 62 C76 62 60 74 56 96 Z'
export const LADO = 'M56 98 C46 32 154 32 144 98 C142 78 132 66 116 62 C100 78 74 80 56 98 Z'
export const FRANJA = 'M55 100 C44 32 156 32 145 100 L141 78 C120 72 80 72 59 78 Z'
export const LONGO = 'M48 100 C38 24 162 24 152 100 L160 178 H40 Z'
export const CHANEL = 'M46 100 C36 24 164 24 154 100 L156 136 Q100 122 44 136 Z'
export const OMBROS = 'M24 200 Q26 150 100 148 Q174 150 176 200 Z'

export const CABELOS = {
  careca: () => ({ atras: '', frente: '' }),
  curto: (cor) => ({ atras: '', frente: p(CURTO, cor) }),
  lado: (cor) => ({ atras: '', frente: p(LADO, cor) }),
  franja: (cor) => ({ atras: '', frente: p(FRANJA, cor) }),
  longo: (cor) => ({ atras: p('M48 100 C38 24 162 24 152 100 L160 178 H40 Z', cor), frente: p(LADO, cor) }),
  longoFranja: (cor) => ({ atras: p('M48 100 C38 24 162 24 152 100 L160 178 H40 Z', cor), frente: p(FRANJA, cor) }),
  chanel: (cor) => ({ atras: p('M46 100 C36 24 164 24 154 100 L156 136 Q100 122 44 136 Z', cor), frente: p(FRANJA, cor) }),
  cacheado: (cor) => ({
    atras: [[50, 86], [48, 64], [62, 44], [82, 32], [104, 28], [126, 34], [142, 48], [152, 68], [150, 90], [46, 108], [154, 110]]
      .map(([x, y]) => c(x, y, 18, cor))
      .join(''),
    frente: [[68, 60], [84, 53], [100, 50], [116, 53], [132, 60]].map(([x, y]) => c(x, y, 11, cor)).join(''),
  }),
  afro: (cor) => ({ atras: c(100, 70, 64, cor), frente: p('M60 88 C62 52 138 52 140 88 C126 66 74 66 60 88 Z', cor) }),
  coque: (cor) => ({ atras: c(100, 30, 19, cor), frente: p(CURTO, cor) }),
  chiquinhas: (cor) => ({ atras: sim(e(40, 118, 16, 32, cor)), frente: p(FRANJA, cor) + sim(c(50, 92, 5, '#E63946')) }),
  rabo: (cor) => ({ atras: p('M138 54 Q186 62 172 144 Q156 118 142 100 Z', cor), frente: p(LADO, cor) }),
  moicano: (cor) => ({ atras: '', frente: p('M88 76 Q84 18 100 14 Q116 18 112 76 Z', cor) }),
  espetado: (cor) => ({
    atras: '',
    frente: p('M54 98 L44 62 L62 70 L58 36 L78 54 L86 22 L100 50 L114 22 L122 54 L142 36 L138 70 L156 62 L146 98 C140 74 122 64 100 64 C78 64 60 74 54 98 Z', cor),
  }),
  trancas: (cor) => ({
    atras: sim(c(48, 112, 12, cor) + c(46, 133, 12, cor) + c(48, 154, 11, cor) + r(40, 164, 16, 6, '#F5B301', 3)),
    frente: p(FRANJA, cor),
  }),
}

export const CHAPEUS = {
  bone: (cor, cor2 = tom(cor, -0.25)) =>
    p('M54 74 C54 24 146 24 146 74 Z', cor) + p('M96 62 H168 Q180 76 166 78 H96 Z', cor2) + c(100, 30, 4, cor2),
  gorro: (cor, cor2 = '#fff') =>
    p('M52 80 C50 20 150 20 148 80 Z', cor) + r(50, 66, 100, 17, cor2, 8) + c(100, 22, 12, cor2),
  chapeu: (cor, cor2 = tom(cor, -0.3)) =>
    e(100, 70, 68, 11, cor) + p('M64 68 C64 20 136 20 136 68 Z', cor) + r(64, 56, 72, 10, cor2),
  lenco: (cor) =>
    p(
      'M44 98 C36 22 164 22 156 98 C156 154 130 172 100 172 C70 172 44 154 44 98 Z M64 98 C64 128 80 148 100 148 C120 148 136 128 136 98 C136 70 120 58 100 58 C80 58 64 70 64 98 Z',
      cor,
      'fill-rule="evenodd"',
    ),
  faixa: (cor) => r(56, 62, 88, 13, cor, 3),
}

const OCULOS = {
  redondo: () =>
    sim(c(82, 97, 14, '#fff', `fill-opacity=".3" stroke="${TINTA}" stroke-width="3.5"`)) + l('M96 96 H104', TINTA, 3.5),
  escuro: () => sim(r(66, 88, 30, 19, TINTA, 8)) + l('M96 95 H104', TINTA, 4),
}

const BARBAS = {
  bigode: (cor) => p('M78 117 Q100 102 122 117 Q110 124 100 117 Q90 124 78 117 Z', cor),
  barba: (cor) =>
    p('M58 100 C60 152 80 160 100 160 C120 160 140 152 142 100 C134 120 120 112 100 112 C80 112 66 120 58 100 Z', cor),
}

const BOCAS = {
  nenhuma: () => '',
  sorriso: () => l('M88 122 Q100 132 112 122', TINTA, 3.5),
  aberto: () => p('M86 120 Q100 138 114 120 Z', '#8B2E3A') + p('M90 121 H110 L108 125 H92 Z', '#fff'),
  serio: () => l('M91 125 H109', TINTA, 3.5),
  batom: () => p('M88 122 Q100 116 112 122 Q100 134 88 122 Z', '#D62246'),
  mini: () => l('M94 126 Q100 130 106 126', TINTA, 3),
  miniSerio: () => l('M94 128 H106', TINTA, 3),
  grande: () => p('M82 120 Q100 144 118 120 Z', '#8B2E3A') + p('M86 121 H114 L111 126 H89 Z', '#fff'),
}

const olhoAnime = (tipo, cor) => {
  const x = 80
  switch (tipo) {
    case 'serio':
      return e(x, 101, 9, 7, '#fff') + c(x, 101, 5.5, cor) + c(x, 101, 2.5, TINTA) + l('M69 95 L92 96', TINTA, 4)
    case 'fechado':
      return l('M71 100 Q80 107 89 100', TINTA, 3.5)
    case 'feliz':
      return l('M71 103 Q80 93 89 103', TINTA, 3.5)
    case 'ponto':
      return e(x, 100, 9, 10, '#fff', `stroke="${TINTA}" stroke-width="2"`) + c(x, 100, 2.5, TINTA)
    case 'venda':
      return ''
    default:
      return (
        e(x, 100, 9.5, 12.5, '#fff') + e(x, 101, 7.5, 10.5, cor) + c(x, 102, 4, TINTA) + c(83, 96, 3, '#fff') +
        l('M69 92 Q80 84 92 93', TINTA, 3.5)
      )
  }
}

export function humano(o) {
  const {
    anime = false,
    pele = PELE.clara,
    cabelo = 'curto',
    cabeloCor = CABELO.preto,
    cabeloAtras,
    cabeloFrente,
    olhos = 'aberto',
    olhoCor = TINTA,
    olhoCorDir = olhoCor,
    sobrancelha = 'normal',
    sobrancelhaCor = cabelo === 'careca' ? tom(pele, -0.45) : tom(cabeloCor, -0.25),
    boca = anime ? 'mini' : 'sorriso',
    oculos,
    barba,
    barbaCor = cabeloCor,
    chapeu,
    roupa = '#3FA7D6',
    roupaExtra = '',
    atras = '',
    rosto = '',
    frente = '',
  } = o

  const padrao = CABELOS[cabelo](cabeloCor)
  const hAtras = cabeloAtras ?? padrao.atras
  const hFrente = cabeloFrente ?? padrao.frente
  const sombra = tom(pele, -0.18)

  const cabeca = anime
    ? p('M58 88 C58 50 142 50 142 88 C142 120 120 146 100 146 C80 146 58 120 58 88 Z', pele)
    : e(100, 96, 42, 48, pele)

  const olhosSvg = anime
    ? olhoAnime(olhos, olhoCor) + `<g transform="translate(200 0) scale(-1 1)">${olhoAnime(olhos, olhoCorDir)}</g>`
    : olhos === 'fechado'
      ? sim(l('M75 97 Q82 103 89 97', TINTA, 3.5))
      : sim(c(82, 97, 5, TINTA)) + c(84, 95, 1.6, '#fff') + c(120, 95, 1.6, '#fff')

  const sobr =
    sobrancelha === 'nenhuma'
      ? ''
      : sobrancelha === 'brava'
        ? sim(l('M70 78 L92 86', sobrancelhaCor, 4))
        : sim(l(anime ? 'M70 82 Q80 78 90 82' : 'M73 85 Q82 80 91 85', sobrancelhaCor, 3.2))

  const nariz = anime ? l('M99 112 L101 114', sombra, 2.5) : l('M100 102 Q95 112 102 113', sombra, 2.8)

  return (
    atras +
    hAtras +
    p('M24 200 Q26 150 100 148 Q174 150 176 200 Z', roupa) +
    r(86, 126, 28, 30, pele, 10) + e(100, 152, 21, 10, pele) + e(100, 141, 16, 6, sombra) +
    roupaExtra +
    sim(c(58, 100, 9, pele)) +
    cabeca +
    rosto +
    olhosSvg +
    sobr +
    nariz +
    (barba ? BARBAS[barba](barbaCor) : '') +
    BOCAS[boca]() +
    hFrente +
    (oculos ? OCULOS[oculos]() : '') +
    (chapeu ? CHAPEUS[chapeu.tipo](chapeu.cor, chapeu.cor2) : '') +
    frente
  )
}
