// Personagens originais que fazem alusão a figuras conhecidas de anime.
// Nomes e detalhes são próprios: nada de logos ou símbolos oficiais.
import { TINTA, c, e, p, r, l, sim, esc, recorte, carta } from './base.mjs'
import { humano, PELE, CABELOS, CURTO, LADO, FRANJA, LONGO, CHANEL, OMBROS } from './figura.mjs'

const OURO = '#F5B301'
const PRETO = '#2B2B33'
const PRATA = '#C9CED6'

const ESPETADO_ALTO =
  'M54 96 L36 70 L56 72 L40 36 L66 54 L70 14 L92 44 L112 8 L120 46 L150 22 L142 60 L166 56 L146 96 C140 76 124 66 110 70 L100 84 L90 68 C76 66 60 76 54 96 Z'
const CHAMA =
  'M56 96 L46 50 L62 60 L66 20 L82 44 L100 2 L118 44 L134 20 L138 60 L154 50 L144 96 C140 76 126 64 112 64 L100 84 L88 64 C74 64 60 76 56 96 Z'
const ESPETADO = CABELOS.espetado('#000').frente.match(/d="([^"]+)"/)[1]
const REPARTIDO = 'M55 104 C44 32 156 32 145 104 L138 110 C136 84 120 66 100 60 C80 66 64 84 62 110 Z'

const gola = (cor) => p('M70 158 L76 124 H124 L130 158 L100 170 Z', cor)
const decoteV = (cor) => p('M84 150 L100 178 L116 150 Z', cor)
const metade = (lado, s) => recorte(r(lado === 'esq' ? 0 : 100, 0, 100, 200, '#000'), s)

const anime = [
  ['Gokan', '#BDE0FE', {
    cabeloFrente: p(ESPETADO_ALTO, PRETO), roupa: '#F28C28', roupaExtra: decoteV('#2456A6'), boca: 'grande',
  }],
  ['Vejita', '#FFE5A0', {
    cabeloFrente: p(CHAMA, PRETO), sobrancelha: 'brava', olhos: 'serio', boca: 'miniSerio', roupa: '#2456A6',
    roupaExtra: p('M44 200 Q48 160 82 152 L100 172 L118 152 Q152 160 156 200 Z', '#F6EBD6') + sim(e(38, 172, 24, 14, OURO)),
  }],
  ['Bulmina', '#FAD2E1', {
    cabelo: 'rabo', cabeloCor: '#3FC1C9', olhoCor: '#2456A6', roupa: '#F06BA8', boca: 'sorriso',
    frente: p('M142 60 L126 48 V72 Z M142 60 L158 48 V72 Z', '#E63946') + c(142, 60, 5, '#B5202C'),
  }],
  ['Narujo', '#CDEAC0', {
    cabelo: 'espetado', cabeloCor: '#F2C94C', olhoCor: '#3FA7D6', boca: 'grande', roupa: '#F28C28',
    roupaExtra: gola('#F28C28') + l('M100 168 V200', '#2456A6', 4),
    rosto: sim(l('M62 110 L74 112 M62 116 L74 116 M62 122 L74 120', TINTA, 2)),
    frente: r(56, 60, 88, 14, '#2456A6', 3) + r(80, 57, 40, 20, PRATA, 4) + c(100, 67, 5, 'none', `stroke="${TINTA}" stroke-width="2"`),
  }],
  ['Sasuko', '#D7E3FC', {
    olhos: 'serio', boca: 'miniSerio', roupa: '#1E3A6E', roupaExtra: gola('#2456A6'),
    cabeloAtras: sim(p('M62 64 L26 40 L50 72 L20 80 L54 96 Z', PRETO)),
    cabeloFrente: p('M56 102 C46 34 154 34 144 102 L134 70 L124 106 L112 66 L100 60 L88 66 L76 106 L66 70 Z', PRETO),
  }],
  ['Kakachi', '#E2CFF4', {
    cabeloFrente: p(ESPETADO_ALTO, PRATA), boca: 'nenhuma', olhos: 'serio', roupa: '#4A6B4A', roupaExtra: gola('#2B3A55'),
    rosto: p('M58 106 Q100 98 142 106 C138 126 120 146 100 146 C80 146 62 126 58 106 Z', '#2B3A55'),
    frente: p('M55 66 L145 82 L145 114 L102 100 L55 84 Z', '#2B3A55') + r(64, 64, 32, 16, PRATA, 4, 'transform="rotate(10 80 72)"'),
  }],
  ['Sakuri', '#FFD6A5', {
    cabeloAtras: p(CHANEL, '#F58BB5'), cabeloFrente: p(CURTO, '#F58BB5') + l('M58 72 Q100 40 142 72', '#E63946', 8),
    olhoCor: '#2EAD4B', roupa: '#D62246', boca: 'sorriso',
    rosto: p('M100 68 L105 75 L100 82 L95 75 Z', '#8E6BBF'),
  }],
  ['Gaaro', '#F8E1B4', {
    cabelo: 'espetado', cabeloCor: '#B5202C', sobrancelha: 'nenhuma', olhoCor: '#8FD6C9', boca: 'miniSerio', roupa: '#8B2E3A',
    roupaExtra: l('M50 160 L150 196', '#C9B38C', 9),
    rosto: sim(e(80, 100, 15, 17, PRETO)),
    frente: r(108, 70, 11, 11, '#B5202C', 2) + l('M110 75 H117', '#fff', 1.5),
  }],
  ['Lufi', '#BEE9E8', {
    cabelo: 'curto', boca: 'grande', roupa: '#E63946', roupaExtra: p('M82 150 L100 200 L118 150 Z', PELE.clara),
    chapeu: { tipo: 'chapeu', cor: '#F2D06B', cor2: '#E63946' },
    frente: l('M70 114 H88 M75 110 V118 M83 110 V118', TINTA, 2),
  }],
  ['Zoru', '#D0F4DE', {
    cabelo: 'curto', cabeloCor: '#3FA66B', sobrancelha: 'brava', olhos: 'serio', boca: 'miniSerio', pele: PELE.media,
    roupa: '#F2F2F2', roupaExtra: decoteV(PELE.media),
    frente: l('M120 84 V118', '#8B2E3A', 3) + c(56, 114, 3.5, OURO) + c(54, 123, 3.5, OURO) + c(56, 132, 3.5, OURO),
  }],
  ['Namy', '#FFF1B8', {
    cabeloAtras: p(CHANEL, '#F28C28'), cabeloFrente: p(LADO, '#F28C28'), olhoCor: '#8B5A2B', boca: 'sorriso', roupa: '#FFFFFF',
    roupaExtra: recorte(p(OMBROS, '#000'), [158, 172, 186].map((y) => r(0, y, 200, 7, '#2456A6')).join('')),
  }],
  ['Sanjo', '#CFE1F2', {
    cabeloFrente: p('M56 98 C46 32 154 32 144 98 L144 122 C132 120 122 108 118 88 C104 70 76 72 56 98 Z', '#F2C94C'),
    sobrancelha: 'nenhuma', boca: 'sorriso', roupa: PRETO,
    roupaExtra: p('M82 150 L100 176 L118 150 L126 156 L100 196 L74 156 Z', '#fff') + p('M96 160 H104 L107 196 H93 Z', '#2456A6'),
    frente: l('M68 84 Q80 78 90 84 M68 84 q-5 -3 -2 -8 q6 -2 6 4', '#B8901F', 3),
  }],
  ['Tanjiru', '#DCEBC3', {
    cabelo: 'espetado', cabeloCor: '#5A1E1E', olhoCor: '#B5202C', boca: 'sorriso', roupa: '#2EAD4B',
    roupaExtra: recorte(
      p(OMBROS, '#000'),
      [[30, 150], [70, 150], [110, 150], [150, 150], [50, 170], [90, 170], [130, 170], [30, 190], [70, 190], [110, 190], [150, 190]]
        .map(([x, y]) => r(x, y, 20, 20, PRETO))
        .join(''),
    ),
    frente: e(74, 76, 10, 7, '#B5202C') + sim(r(50, 112, 11, 20, '#fff', 2, `stroke="${TINTA}" stroke-width="1.5"`) + c(55.5, 118, 3.5, '#E63946')),
  }],
  ['Nezuka', '#F6D6C8', {
    cabeloAtras: p(LONGO, PRETO) + recorte(p(LONGO, '#000'), r(0, 152, 200, 48, '#F28C28')), cabeloFrente: p(LADO, PRETO),
    olhoCor: '#F58BB5', boca: 'nenhuma', roupa: '#F7A8C8', roupaExtra: decoteV('#fff'),
    frente:
      l('M58 122 H142', '#E63946', 3) + r(76, 116, 48, 14, '#8FCB6B', 7) + l('M92 117 V129 M108 117 V129', '#4F8A3A', 2) +
      p('M66 58 L50 46 V70 Z M66 58 L82 46 V70 Z', '#F58BB5') + c(66, 58, 5, '#D6588F'),
  }],
  ['Marina Lua', '#C5E8F7', {
    cabeloCor: '#F2C94C', olhoCor: '#3FA7D6', boca: 'sorriso', roupa: '#FFFFFF',
    cabeloAtras: sim(p('M52 44 Q16 100 28 196 H54 Q44 110 64 58 Z', '#F2C94C') + c(58, 36, 16, '#F2C94C') + c(58, 36, 5, '#E63946')),
    cabeloFrente: p(FRANJA, '#F2C94C') + p('M100 70 L96 82 H104 Z', PELE.clara),
    roupaExtra: p('M58 154 L100 190 L142 154 L152 166 L100 200 L48 166 Z', '#2456A6') + c(100, 188, 9, '#E63946'),
    frente: p('M86 72 L100 82 L114 72 L100 78 Z', OURO) + c(100, 78, 3.5, '#E63946'),
  }],
  ['Eduardo', '#FDE2A7', {
    sobrancelha: 'brava', olhoCor: OURO, boca: 'sorriso', roupa: '#B5202C', roupaExtra: gola(PRETO),
    cabeloAtras: c(150, 118, 11, '#F2C94C') + c(153, 137, 11, '#F2C94C') + c(150, 156, 10, '#F2C94C') + l('M100 40 Q94 14 110 10', '#F2C94C', 6),
    cabeloFrente: p(REPARTIDO, '#F2C94C'),
  }],
  ['Éle', '#D8E2DC', {
    pele: '#FFE8D6', olhos: 'ponto', sobrancelha: 'nenhuma', boca: 'miniSerio', roupa: '#FFFFFF',
    cabeloAtras: p('M46 102 L26 86 L46 76 L28 54 L52 52 L42 26 L68 36 L76 12 L96 30 L116 10 L124 34 L152 22 L146 50 L172 54 L152 74 L174 88 L152 102 Z', PRETO),
    cabeloFrente: p('M56 102 C46 34 154 34 144 102 L134 78 L126 100 L116 74 L106 98 L96 72 L86 100 L76 76 L68 100 L62 80 Z', PRETO),
    rosto: sim(e(80, 110, 13, 6, '#A99BB8')),
  }],
  ['Axe', '#C7EFCF', {
    olhoCor: '#8B5A2B', boca: 'grande', roupa: '#2456A6', roupaExtra: decoteV('#fff') + l('M60 160 Q100 150 140 160', OURO, 4),
    cabeloAtras: sim(p('M60 78 L28 72 L50 92 L26 102 L56 112 Z', PRETO)),
    cabeloFrente: '',
    rosto: sim(l('M62 116 l5 -5 v7 l5 -5', TINTA, 2)),
    frente:
      p('M54 76 C54 22 146 22 146 76 Z', '#E63946') + p('M70 76 C70 38 130 38 130 76 Z', '#fff') +
      l('M88 58 L97 67 L113 48', '#2EAD4B', 5) + p('M52 70 H148 Q154 86 100 88 Q46 86 52 70 Z', '#E63946'),
  }],
  ['Saitamo', '#FFE0B5', {
    cabelo: 'careca', olhos: 'ponto', boca: 'miniSerio', roupa: '#F5D21A',
    sobrancelha: 'nenhuma', frente: sim(l('M72 84 H90', TINTA, 3)),
    roupaExtra: sim(e(40, 170, 30, 16, '#fff')) + gola('#E63946') + l('M100 170 V200', '#B5A012', 3),
  }],
  ['Gojou', '#D6E6F5', {
    cabeloFrente: p(ESPETADO, '#F2F2F2'), olhos: 'venda', sobrancelha: 'nenhuma', boca: 'sorriso', roupa: '#1E1E3A',
    roupaExtra: gola('#1E1E3A'),
    frente: r(57, 88, 86, 24, '#1E1E28', 5),
  }],
  ['Deko', '#D9F0C4', {
    cabelo: 'cacheado', cabeloCor: '#2E6B4A', olhoCor: '#2EAD4B', boca: 'grande', roupa: '#2BA39B',
    roupaExtra: gola('#fff') + p('M94 160 H106 L110 196 H90 Z', '#E63946'),
    rosto: sim(c(68, 112, 1.8, '#8B5A2B') + c(74, 116, 1.8, '#8B5A2B') + c(68, 120, 1.8, '#8B5A2B') + c(76, 110, 1.8, '#8B5A2B')),
  }],
  ['Bakugu', '#FFD9C0', {
    cabeloFrente: p(ESPETADO_ALTO, '#E8D8A0'), sobrancelha: 'brava', sobrancelhaCor: '#A8963F', olhoCor: '#E63946', boca: 'grande', roupa: PRETO,
    roupaExtra: gola(PRETO) + l('M62 164 L138 200 M138 164 L62 200', '#F28C28', 8),
  }],
  ['Todoroqui', '#E4D9F5', {
    olhos: 'serio', olhoCor: '#6B7280', olhoCorDir: '#3FC1C9', boca: 'miniSerio', roupa: '#3A5FA8', sobrancelhaCor: '#8B8B95',
    roupaExtra: gola('#fff'),
    rosto: e(120, 98, 18, 19, '#B5523A'),
    cabeloFrente: metade('esq', p(FRANJA, '#F2F2F2')) + metade('dir', p(FRANJA, '#D62246')),
  }],
  ['Livai', '#C9E4DE', {
    olhos: 'serio', olhoCor: '#6B7280', boca: 'miniSerio', roupa: '#3F6B4A',
    roupaExtra: p('M82 150 H118 L112 186 H88 Z', '#fff') + l('M88 162 H112 M90 174 H110', PRATA, 2),
    cabeloFrente: p('M56 96 C46 34 154 34 144 96 C142 80 132 70 104 62 L100 78 L96 62 C68 70 58 80 56 96 Z', PRETO),
  }],
  ['Micasa', '#FCE0E8', {
    cabeloAtras: p(CHANEL, PRETO), cabeloFrente: p(LADO, PRETO) + p('M98 62 L104 62 L102 100 Z', PRETO),
    olhoCor: '#4A4A55', boca: 'miniSerio', roupa: '#C9B38C',
    frente: p('M60 134 Q100 158 140 134 L148 166 Q100 188 52 166 Z', '#B5202C') + p('M124 168 L150 162 L156 200 H130 Z', '#9A1B25'),
  }],
  ['Ânia', '#CFF0E8', {
    cabelo: 'chanel', cabeloCor: '#F7A8C8', olhoCor: '#2EAD4B', boca: 'sorriso', roupa: PRETO,
    roupaExtra: decoteV('#fff') + l('M62 162 Q100 150 138 162', OURO, 3) + p('M100 176 L88 168 V186 Z M100 176 L112 168 V186 Z', '#E63946'),
    frente: sim(p('M68 46 L56 22 L84 38 Z', PRETO) + c(70, 40, 4, OURO)),
  }],
  ['Inuiaxa', '#F2D5B8', {
    cabelo: 'longoFranja', cabeloCor: '#E8ECF2', sobrancelha: 'brava', sobrancelhaCor: PRETO, olhoCor: OURO, boca: 'grande', roupa: '#D62246',
    atras: sim(p('M62 52 L54 10 L92 38 Z', '#E8ECF2') + p('M66 44 L62 24 L80 38 Z', '#F4A7B0')),
    roupaExtra: decoteV('#fff') + [74, 84, 94, 106, 116, 126].map((x, i) => c(x, 158 + [0, 6, 10, 10, 6, 0][i], 4, '#4A3FB5')).join(''),
  }],
  ['Reia', '#FFE5C7', {
    cabelo: 'franja', cabeloCor: '#9CCBEA', olhos: 'serio', olhoCor: '#E63946', boca: 'miniSerio', roupa: '#F2F2F2', pele: '#FFE8D6',
    roupaExtra: gola('#3A3A45'),
    frente: sim(r(48, 54, 11, 20, '#fff', 4, `stroke="${TINTA}" stroke-width="1.5"`)),
  }],
  ['Asuca', '#D5ECC2', {
    cabelo: 'longoFranja', cabeloCor: '#D9541E', sobrancelha: 'brava', olhoCor: '#3FA7D6', boca: 'grande', roupa: '#E63946',
    roupaExtra: gola('#F28C28'),
    frente: sim(p('M62 42 L50 18 L78 34 Z', '#E63946')),
  }],
  ['Iugi', '#E6D4F2', {
    olhoCor: '#8E6BBF', boca: 'sorriso', roupa: '#1E3A6E',
    roupaExtra: r(86, 138, 28, 8, PRETO, 2) + p('M86 160 H114 L100 186 Z', OURO),
    cabeloAtras:
      p('M100 0 L118 40 L156 14 L146 56 L188 60 L152 88 L150 104 H50 L48 88 L12 60 L54 56 L44 14 L82 40 Z', '#B5207A') +
      esc(p('M100 0 L118 40 L156 14 L146 56 L188 60 L152 88 L150 104 H50 L48 88 L12 60 L54 56 L44 14 L82 40 Z', PRETO), 0.84, 100, 78),
    cabeloFrente: p('M60 98 L70 58 L80 86 L90 52 L100 88 L110 52 L120 86 L130 58 L140 98 L128 78 L118 102 L108 76 L100 106 L92 76 L82 102 L72 78 Z', '#F2C94C'),
  }],
]

export const cartasAnime = () =>
  anime.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, humano({ anime: true, ...o })) }))
