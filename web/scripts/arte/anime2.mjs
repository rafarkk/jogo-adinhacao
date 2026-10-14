// Segundo tema de anime: personagens pedidos pelo usuário, desenhados no estilo do construtor de retratos.
import { TINTA, c, e, p, r, l, sim, rot, recorte, carta } from './base.mjs'
import { humano, PELE, FRANJA, LADO, LONGO, CHANEL, CURTO, OMBROS, CABELOS } from './figura.mjs'

const PRETO = '#2B2B33'
const OURO = '#F5B301'
const BRANCO_CABELO = '#ECEEF3'

// cabelos
const FOFO = 'M50 100 L40 78 L52 76 L42 52 L60 58 L56 34 L76 44 L82 20 L98 38 L112 16 L120 40 L140 28 L138 52 L158 50 L146 72 L160 80 L148 100 C140 78 124 68 100 70 C78 68 60 78 50 100 Z'
const ALTO = 'M54 98 L34 66 L54 64 L36 26 L64 46 L70 4 L92 38 L104 0 L116 38 L134 6 L138 46 L164 30 L148 66 L166 70 L146 98 C138 76 124 66 100 68 C76 66 62 76 54 98 Z'
const ESPETADO = CABELOS.espetado('#000').frente.match(/d="([^"]+)"/)[1]
const CORTINA = 'M54 104 C44 30 156 30 146 104 L138 92 C130 72 112 62 100 60 C88 62 70 72 62 92 Z'
const FRANJA_PICADA = 'M54 102 C44 30 156 30 146 102 L138 84 L130 100 L120 78 L110 98 L100 76 L90 98 L80 78 L70 100 L62 84 Z'
const PENTEADO_PRA_TRAS = 'M58 88 C56 40 144 40 142 88 C130 66 70 66 58 88 Z'
const TOPETE = 'M56 96 C50 52 78 26 116 28 C156 32 160 70 146 96 C140 74 126 64 100 64 C78 64 62 74 56 96 Z'
const ATRAS_OMBRO = 'M48 100 C38 26 162 26 152 100 L156 150 Q100 140 44 150 Z'

// roupas
const gola = (cor) => p('M70 158 L76 124 H124 L130 158 L100 170 Z', cor)
const decoteV = (cor) => p('M84 150 L100 178 L116 150 Z', cor)
const lapela = (camisa, gravata) =>
  p('M82 150 L100 176 L118 150 L126 156 L100 196 L74 156 Z', camisa) + (gravata ? p('M95 158 H105 L108 196 H92 Z', gravata) : '')
const cruzado = (cor, borda) => p('M78 150 L120 200 H104 L72 158 Z', borda) + p('M122 150 L96 182 L90 176 L114 150 Z', cor)
const listraManga = (cor) => sim(l('M34 172 Q48 160 66 156', cor, 6))
const tokkofuku = (cor = PRETO) => sim(l('M46 170 Q62 160 78 154', OURO, 3)) + gola(cor)

// chapéu de bruxa
const chapeuBruxa = (cor, aba = cor, inclinado = -8) =>
  rot(p('M100 -6 Q92 30 66 62 H134 Q110 34 100 -6 Z', cor) + e(100, 62, 74, 12, aba) + r(68, 52, 64, 8, '#E8D9B8', 2), inclinado, 100, 62)

const anime = [
  ['Killua', '#9FB6E8', {
    pele: '#FFEDE0', cabeloFrente: p(FOFO, BRANCO_CABELO), olhoCor: '#4DB6E8', boca: 'mini',
    roupa: '#F2F2F2', roupaExtra: gola('#5B4B8A'),
  }],
  ['Gon', '#CDEAC0', {
    cabeloFrente: p(ALTO, PRETO) + recorte(p(ALTO, '#000'), r(0, 0, 200, 34, '#2E8B3A')), olhoCor: '#8B5A2B', boca: 'grande',
    roupa: '#2E8B3A', roupaExtra: gola('#2E8B3A') + l('M100 170 V200', '#F5B301', 4),
  }],
  ['Alluka', '#FAD2E1', {
    pele: '#FFEDE0', cabeloAtras: p(LONGO, PRETO), cabeloFrente: p(FRANJA, PRETO), olhoCor: '#3B4A8A', olhos: 'feliz', boca: 'sorriso',
    roupa: '#F7A8C8', roupaExtra: decoteV('#fff'), rosto: sim(e(72, 114, 7, 4, '#F28B8B', 'opacity=".7"')),
  }],
  ['Kira', '#FFE5A0', {
    cabeloFrente: p(CORTINA, '#7A4A2A'), cabeloAtras: p('M50 100 C40 30 160 30 150 100 L148 124 H52 Z', '#7A4A2A'),
    olhos: 'serio', olhoCor: '#B5302A', boca: 'mini', sobrancelha: 'brava',
    roupa: '#7A5A3A', roupaExtra: lapela('#fff', '#C8102E'),
  }],
  ['Mikey', '#E2CFF4', {
    cabeloAtras: p(ATRAS_OMBRO, '#F2D27A'), cabeloFrente: p(CORTINA, '#F2D27A'), sobrancelhaCor: '#C9A44A',
    olhos: 'serio', olhoCor: PRETO, boca: 'miniSerio', roupa: PRETO, roupaExtra: tokkofuku(),
  }],
  ['Draken', '#BEE9E8', {
    cabeloFrente: p(PENTEADO_PRA_TRAS, '#E8C55A') + sim(p('M58 88 Q54 102 60 112 L64 110 Q62 98 64 86 Z', '#C8A84A')),
    cabeloAtras: [[52, 120, 10], [50, 138, 10], [52, 155, 9], [50, 171, 8]].map(([x, y, k]) => c(x, y, k, '#E8C55A')).join(''),
    olhos: 'serio', olhoCor: '#6B7280', boca: 'miniSerio', sobrancelha: 'brava', sobrancelhaCor: '#A8873A',
    rosto: l('M64 80 Q72 72 70 86 Q66 94 74 98', PRETO, 2.5) + l('M66 76 L62 70', PRETO, 2),
    roupa: PRETO, roupaExtra: tokkofuku(),
  }],
  ['Takemichi', '#FDE2A7', {
    cabeloFrente: p(TOPETE, '#F2D27A'), sobrancelhaCor: '#C9A44A', olhoCor: '#3FA7D6', boca: 'grande',
    roupa: PRETO, roupaExtra: gola(PRETO) + [164, 178, 192].map((y) => c(100, y, 3, OURO)).join(''),
  }],
  ['Bachira', '#FFF1B8', {
    cabeloAtras: p(CHANEL, PRETO) + recorte(p(CHANEL, '#000'), r(0, 120, 200, 30, '#F5D21A')),
    cabeloFrente: p(FRANJA, PRETO),
    olhoCor: '#E0A800', boca: 'grande', roupa: '#1E2A5A', roupaExtra: listraManga('#2ED3F0'),
  }],
  ['Isagi', '#C9E4DE', {
    cabeloFrente: p(CURTO, '#1E2A4A') + l('M98 38 Q92 16 80 10 M104 38 Q112 18 124 14', '#1E2A4A', 5),
    olhoCor: '#3F7FE0', boca: 'mini', roupa: '#1E2A5A', roupaExtra: listraManga('#2ED3F0') + gola('#1E2A5A'),
  }],
  ['Kaiser', '#D6E6F5', {
    cabeloAtras: p(CHANEL, '#F2D27A') + recorte(p(CHANEL, '#000'), r(0, 112, 200, 40, '#3F7FE0')),
    cabeloFrente: p(LADO, '#F2D27A'),
    olhoCor: '#3F7FE0', boca: 'mini', sobrancelha: 'brava', sobrancelhaCor: '#C9A44A',
    roupa: PRETO, roupaExtra: gola('#C8102E') +
      [0, 72, 144, 216, 288].map((a) => rot(c(122, 136, 4, '#3F7FE0'), a, 122, 140)).join('') + c(122, 140, 3, '#1E4DA0'),
  }],
  ['Hinata', '#FFD6A5', {
    cabeloFrente: p(FOFO, '#F28C28'), sobrancelhaCor: '#C96A12', olhoCor: '#8B5A2B', boca: 'grande',
    roupa: PRETO, roupaExtra: gola(PRETO) + sim(l('M40 176 Q56 160 74 156', '#F28C28', 5)),
  }],
  ['Kageyama', '#D0F4DE', {
    cabelo: 'franja', cabeloCor: PRETO, olhos: 'serio', olhoCor: '#2456A6', sobrancelha: 'brava', boca: 'miniSerio',
    roupa: PRETO, roupaExtra: gola(PRETO) + sim(l('M40 176 Q56 160 74 156', '#F28C28', 5)),
  }],
  ['Hikaru', '#C5E8F7', {
    cabeloFrente: p(FRANJA_PICADA, PRETO), olhos: 'ponto', boca: 'mini', sobrancelha: 'nenhuma',
    roupa: '#F2F2F2', roupaExtra: gola('#F2F2F2') + decoteV('#FFE8D6'),
  }],
  ['Yoshiki', '#E4D9F5', {
    cabeloAtras: p('M50 100 C40 30 160 30 150 100 L150 130 H50 Z', PRETO),
    cabeloFrente: p('M54 104 C44 30 156 30 146 104 L140 90 C126 70 100 64 76 70 Q66 90 70 112 Q58 106 54 104 Z', PRETO),
    olhos: 'serio', olhoCor: '#4A4A55', boca: 'miniSerio', roupa: '#F2F2F2', roupaExtra: gola('#F2F2F2'),
  }],
  ['Maomao', '#DCEBC3', {
    cabeloAtras: c(100, 32, 18, '#3F5F55') + r(84, 24, 32, 8, '#B79AD9', 3),
    cabeloFrente: p('M56 100 C46 34 154 34 144 100 L138 76 Q100 66 62 76 Z', '#3F5F55') +
      sim(p('M58 90 Q50 124 60 146 L67 144 Q62 118 65 92 Z', '#3F5F55')),
    olhoCor: '#4FA36B', boca: 'miniSerio', rosto: sim(c(70, 110, 1.6, '#B5651D') + c(75, 114, 1.6, '#B5651D') + c(80, 110, 1.6, '#B5651D')),
    roupa: '#C9E4C5', roupaExtra: cruzado('#C9E4C5', '#9AC79A'),
  }],
  ['Jinshi', '#E6D4F2', {
    cabeloAtras: p(LONGO, '#2B2340'), cabeloFrente: p(CORTINA, '#2B2340') + c(100, 28, 14, '#2B2340') + r(80, 24, 40, 6, OURO, 3),
    olhoCor: '#8E6BBF', boca: 'sorriso', roupa: '#6B4FA8', roupaExtra: cruzado('#6B4FA8', '#F2E3C6'),
  }],
  ['Meliodas', '#FFE0B5', {
    cabeloFrente: p(FOFO, '#F2D27A') + l('M100 26 Q86 8 104 0', '#F2D27A', 5), sobrancelhaCor: '#C9A44A', olhoCor: '#2EAD4B', boca: 'sorriso',
    roupa: PRETO, roupaExtra: lapela('#fff', '#2EAD4B'),
  }],
  ['Asta', '#D8E2DC', {
    cabeloFrente: p(ESPETADO, '#BFC4C9') + r(54, 64, 92, 12, PRETO, 4), sobrancelha: 'brava', sobrancelhaCor: '#8C939C',
    olhoCor: '#2EAD4B', boca: 'grande', roupa: PRETO, roupaExtra: gola(PRETO) + c(100, 162, 6, OURO),
  }],
  ['Coco', '#C7EFCF', {
    cabelo: 'chanel', cabeloCor: '#D9DEEF', sobrancelhaCor: '#9AA1B8', olhoCor: '#3FA7D6', boca: 'sorriso',
    roupa: '#7FB5E0', roupaExtra: decoteV('#fff'), frente: chapeuBruxa('#5E7FB8', '#4A6AA0', -10),
  }],
  ['Qifrey', '#8FB0D8', {
    cabeloAtras: p('M52 100 C42 30 158 30 148 100 L140 176 H60 Z', BRANCO_CABELO), cabeloFrente: p(LADO, BRANCO_CABELO),
    sobrancelhaCor: '#AEB4C0', olhos: 'feliz', boca: 'sorriso', roupa: '#2B3A5E', roupaExtra: gola('#2B3A5E'),
    frente: rot(p('M100 4 Q94 34 70 60 H130 Q108 36 100 4 Z', '#2B3A5E') + e(100, 62, 86, 12, '#1E2A48'), 6, 100, 62),
  }],
  ['Olruggio', '#F8E1B4', {
    cabeloFrente: p(FRANJA_PICADA, '#2B2B33'), sobrancelha: 'brava', olhos: 'serio', olhoCor: '#6B4226', boca: 'miniSerio',
    rosto: [[82, 132], [90, 136], [100, 138], [110, 136], [118, 132], [86, 140], [96, 142], [104, 142], [114, 140]].map(([x, y]) => c(x, y, 1.4, '#6B6470')).join(''),
    roupa: '#8B5A2B', roupaExtra: gola('#6B4226'), oculos: 'redondo',
  }],
  ['Frieren', '#9CCB8A', {
    pele: '#FFEDE0', atras: sim(p('M60 96 L18 72 L58 114 Z', '#FFEDE0') + c(56, 118, 4, '#C8102E')),
    cabeloAtras: sim(p('M56 108 Q40 150 46 196 H64 Q60 150 66 112 Z', BRANCO_CABELO)) + p(CHANEL, BRANCO_CABELO),
    cabeloFrente: p(FRANJA, BRANCO_CABELO), sobrancelhaCor: '#AEB4C0', olhoCor: '#2EAD4B', boca: 'miniSerio',
    roupa: '#F2F2F2', roupaExtra: gola('#F2F2F2') + sim(l('M74 156 L80 196', OURO, 3)),
  }],
  ['Fern', '#E2CFF4', {
    cabelo: 'longoFranja', cabeloCor: '#7B4FB5', sobrancelhaCor: '#5B3A8A', olhoCor: '#7B4FB5', olhos: 'serio', boca: 'miniSerio',
    roupa: PRETO, roupaExtra: gola('#F2F2F2'),
  }],
  ['Kaneki', '#4A4560', {
    pele: '#FFEDE0', cabeloFrente: p(FRANJA_PICADA, BRANCO_CABELO), sobrancelhaCor: '#AEB4C0', olhos: 'serio', olhoCor: '#6B7280', boca: 'miniSerio',
    roupa: PRETO, roupaExtra: gola(PRETO),
    frente: e(120, 101, 9, 7, '#14141A') + c(120, 101, 5, '#E0202E') + c(120, 101, 2, '#14141A'),
  }],
  ['Denji', '#FCE0E8', {
    cabeloFrente: p(FOFO, '#F2C94C'), sobrancelhaCor: '#C9A44A', olhoCor: '#C96A12', boca: 'nenhuma',
    roupa: '#F2F2F2', roupaExtra: lapela('#F2F2F2', PRETO) + l('M118 170 L132 150', '#9AA5B4', 3) + r(126, 140, 18, 10, '#F28C28', 4),
    frente: p('M80 118 H120 Q118 136 100 138 Q82 136 80 118 Z', '#8B2E3A') +
      p('M80 118 L84 124 L88 118 L92 124 L96 118 L100 124 L104 118 L108 124 L112 118 L116 124 L120 118 Z', '#fff'),
  }],
  ['Sakura', '#FFD9C0', {
    cabeloFrente: recorte(r(0, 0, 100, 200, '#000'), p(FRANJA_PICADA, BRANCO_CABELO)) + recorte(r(100, 0, 100, 200, '#000'), p(FRANJA_PICADA, PRETO)),
    olhoCor: OURO, olhoCorDir: '#6B7280', sobrancelha: 'brava', sobrancelhaCor: '#5A5A66', boca: 'miniSerio',
    rosto: sim(e(72, 114, 8, 4, '#F28B8B', 'opacity=".8"')), roupa: PRETO, roupaExtra: gola(PRETO),
  }],
  ['Haru', '#CFF0E8', {
    cabeloFrente: p(ESPETADO, PRETO), sobrancelha: 'brava', olhoCor: '#4A4A55', boca: 'grande',
    roupa: PRETO, roupaExtra: decoteV('#F2F2F2'),
  }],
  ['Taiki', '#F6D6C8', {
    cabelo: 'curto', cabeloCor: '#4A3226', olhoCor: '#6B4226', boca: 'sorriso',
    roupa: '#F2F2F2', roupaExtra: recorte(p(OMBROS, '#000'), r(0, 176, 200, 10, '#3F7FE0')) + gola('#F2F2F2'),
  }],
  ['Chinatsu', '#FFE5A0', {
    cabelo: 'rabo', cabeloCor: '#4A3226', olhoCor: '#6B4226', boca: 'sorriso',
    rosto: sim(e(72, 114, 7, 4, '#F28B8B', 'opacity=".7"')),
    roupa: '#1E2A5A', roupaExtra: decoteV('#F2F2F2') + p('M100 164 L88 156 V172 Z M100 164 L112 156 V172 Z', '#C8102E'),
  }],
  ['Yuta', '#E6D4F2', {
    atras: rot(r(150, 70, 10, 90, '#4A4F5C', 3) + r(146, 100, 18, 6, OURO, 2), 25, 155, 150),
    cabeloFrente: p(FRANJA_PICADA, PRETO), olhoCor: '#2B2B33', boca: 'mini',
    rosto: sim(e(80, 114, 9, 3, '#B9A8C8', 'opacity=".9"')),
    roupa: '#F2F2F2', roupaExtra: gola('#F2F2F2') + [164, 180].map((y) => c(100, y, 3, '#C9CED6')).join(''),
  }],
]

export const cartasAnime2 = () =>
  anime.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, humano({ anime: true, pele: PELE.clara, ...o })) }))
