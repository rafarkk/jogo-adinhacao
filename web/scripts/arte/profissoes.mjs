// Profissões: o mesmo construtor de retratos do tema "pessoas", com chapéu, uniforme e um objeto de trabalho.
import { TINTA, c, e, p, r, l, sim, rot, estrela, carta, tom } from './base.mjs'
import { humano, PELE, CABELO } from './figura.mjs'

// chapéus
const capacete = (cor, extra = '') =>
  p('M50 78 C50 18 150 18 150 78 Z', cor) + r(42, 70, 116, 13, tom(cor, -0.2), 6) + extra
const quepe = (cor) =>
  p('M52 62 Q100 14 148 62 Z', cor) + r(54, 56, 92, 13, tom(cor, -0.35), 3) + p('M56 69 H144 Q100 90 56 69 Z', TINTA) + c(100, 42, 7, '#F5B301')
const chef = c(70, 36, 20, '#fff') + c(100, 26, 26, '#fff') + c(130, 36, 20, '#fff') + r(62, 36, 76, 36, '#fff', 6) + r(62, 62, 76, 6, '#D8DCE3')
const cartola = r(66, 4, 68, 60, TINTA, 5) + e(100, 64, 62, 9, TINTA) + r(66, 46, 68, 10, '#E63946')
const palha = (fita) => e(100, 68, 82, 13, '#E8C66A') + p('M62 68 C62 20 138 20 138 68 Z', '#E8C66A') + r(62, 54, 76, 10, fita)
const marinheiro = r(60, 38, 80, 32, '#fff', 12) + r(56, 60, 88, 10, '#2456A6', 5)
const boina = (cor) => e(106, 48, 52, 24, cor) + c(104, 24, 5, cor)
const touca = p('M62 66 L70 30 H130 L138 66 Z', '#fff') + r(96, 38, 8, 20, '#E63946') + r(90, 44, 20, 8, '#E63946')
const toucaCirurgica = p('M54 78 C52 22 148 22 146 78 Z', '#7FC8C8')

// rosto
const mascara = p('M68 108 Q100 98 132 108 V130 Q100 148 68 130 Z', '#9AD4D6') + l('M68 112 L58 104 M132 112 L142 104', '#9AD4D6', 3)
const mergulho =
  r(62, 82, 76, 32, '#7FD3F0', 14, `fill-opacity=".55" stroke="${TINTA}" stroke-width="5"`) +
  l('M142 98 Q160 98 158 60 V40', '#F28C28', 7)
const narizPalhaco = c(100, 110, 10, '#E63946') + c(97, 107, 3, '#fff', 'opacity=".6"')
const bochechas = sim(c(72, 114, 8, '#F28B8B', 'opacity=".7"'))
const tinta = c(74, 116, 5, '#3FA7D6') + c(128, 108, 4, '#F5B301')
const graxa = e(124, 116, 7, 4, '#2B2B33', 'opacity=".6"')
const brinco = sim(c(58, 113, 4.5, '#F5B301'))

// roupa (desenhada sobre os ombros)
const lapela = (cor) => p('M82 150 L100 176 L118 150 L128 156 L100 196 L72 156 Z', cor)
const gravata = (cor) => p('M94 150 H106 L104 160 L110 196 H90 L96 160 Z', cor)
const borboleta = (cor) => p('M100 158 L82 148 V170 Z M100 158 L118 148 V170 Z', cor) + c(100, 158, 5, tom(cor, -0.3))
const listras = (cor) => [156, 170, 184].map((y) => r(20, y, 160, 7, cor)).join('')
const colete = (cor) => sim(p('M28 200 Q30 156 78 150 L92 200 Z', cor))
const faixasRefletivas = sim(r(52, 150, 10, 50, '#E3E7ED'))
const avental = (cor) => p('M72 152 H128 V200 H72 Z', cor) + l('M72 152 L84 148 M128 152 L116 148', cor, 5)
const estetoscopio = l('M80 152 Q78 186 100 186 Q122 186 120 152', '#4A4F5C', 4) + c(100, 188, 7, '#C9CED6')
const distintivo = estrela(128, 172, 11, '#F5B301')
const dragonas = sim(r(30, 152, 26, 9, '#F5B301', 3))
const pata = c(126, 180, 7, '#fff') + [[116, 170], [124, 166], [132, 168]].map(([x, y]) => c(x, y, 3.5, '#fff')).join('')
const dente = p('M118 164 Q126 158 134 164 Q138 176 132 188 L128 178 H124 L120 188 Q114 176 118 164 Z', '#fff')

// objetos, sempre no canto inferior direito
const pincel = rot(r(146, 126, 9, 60, '#B5651D', 3) + r(144, 112, 13, 16, '#C9CED6') + p('M144 112 Q150 88 157 112 Z', '#E63946'), 22, 150, 150)
const tubo = rot(r(141, 118, 18, 62, '#fff', 9, `fill-opacity=".7" stroke="${TINTA}" stroke-width="3"`) + r(144, 150, 12, 27, '#7ED957', 6), 16, 150, 150)
const microfone = rot(r(145, 150, 10, 50, '#4A4F5C', 4) + c(150, 140, 15, '#2B2B33') + l('M138 140 H162', '#9AA5B4', 2.5), -18, 150, 160)
const bola =
  c(150, 168, 23, '#fff', `stroke="${TINTA}" stroke-width="3"`) + estrela(150, 168, 9, TINTA, 5, 0.8) +
  l('M150 159 V146 M159 165 L171 160 M155 176 L163 187 M145 176 L137 187 M141 165 L129 160', TINTA, 2.5)
const envelope = r(124, 150, 52, 36, '#fff', 3, `stroke="${TINTA}" stroke-width="3"`) + l('M125 152 L150 172 L175 152', TINTA, 3)
const chave = rot(r(146, 132, 9, 60, '#9AA5B4', 3) + c(150.5, 126, 10, 'none', 'stroke="#9AA5B4" stroke-width="8"'), 28, 150, 150)
const lupa = c(148, 158, 18, '#BDE7F7', `fill-opacity=".6" stroke="${TINTA}" stroke-width="5"`) + l('M161 172 L176 190', TINTA, 8)
const camera = r(122, 150, 56, 38, '#2B2B33', 7) + r(132, 143, 16, 9, '#2B2B33', 2) + c(150, 170, 13, '#9AA5B4') + c(150, 170, 7, '#3FA7D6') + c(170, 157, 3, '#E63946')
const pao = rot(e(150, 168, 28, 13, '#D9A05B') + l('M138 162 L144 174 M150 161 L156 173 M162 162 L166 172', '#F2D2A0', 3.5), -22, 150, 168)
const peixe = e(148, 168, 24, 12, '#7FC8F8') + p('M168 168 L184 156 V180 Z', '#7FC8F8') + c(136, 165, 2.5, TINTA)
const livro = r(124, 148, 50, 40, '#E63946', 4) + r(124, 148, 8, 40, '#B5202C', 3) + r(140, 158, 26, 7, '#fff', 2)
const flor = l('M150 196 V160', '#3FA34D', 5) + [0, 72, 144, 216, 288].map((a) => rot(c(150, 142, 9, '#F06BA8'), a, 150, 154)).join('') + c(150, 154, 7, '#FFE156')
const bandeja = e(150, 156, 32, 7, '#C9CED6') + p('M124 154 Q150 116 176 154 Z', '#E3E7ED') + c(150, 132, 5, '#C9CED6')
const martelo = rot(r(130, 146, 40, 18, '#8B5A2B', 5) + r(146, 162, 8, 36, '#B5651D', 3), -20, 150, 164)
const nota = c(146, 180, 9, TINTA) + l('M154 180 V146 L172 152 V164', TINTA, 5)
const varinha = rot(r(146, 120, 8, 66, TINTA, 3) + r(146, 120, 8, 14, '#fff', 3), 30, 150, 150) + estrela(170, 112, 9, '#FFE156')
const graos = (y) => rot(e(144, y, 5, 9, '#E8C66A'), -30, 144, y) + rot(e(160, y, 5, 9, '#E8C66A'), 30, 160, y)
const trigo = l('M152 196 V140', '#C9A227', 4) + [134, 146, 158].map(graos).join('')

const profissoes = [
  ['Médica', '#D7E3FC', { pele: PELE.morena, cabelo: 'longo', cabeloCor: CABELO.preto, roupa: '#fff', roupaExtra: lapela('#D8DCE3') + estetoscopio }],
  ['Enfermeiro', '#CDEAC0', { pele: PELE.clara, cabelo: 'curto', cabeloCor: CABELO.castanho, roupa: '#7FC8F8', roupaExtra: lapela('#fff'), frente: touca }],
  ['Dentista', '#FAD2E1', { pele: PELE.media, cabelo: 'careca', sobrancelhaCor: CABELO.preto, boca: 'nenhuma', roupa: '#7FC8C8', roupaExtra: dente, frente: toucaCirurgica + mascara }],
  ['Veterinária', '#FDE2A7', { pele: PELE.escura, cabelo: 'cacheado', cabeloCor: CABELO.preto, roupa: '#2EAD9A', roupaExtra: pata, boca: 'aberto' }],
  ['Cientista', '#E2CFF4', { pele: PELE.clara, cabelo: 'espetado', cabeloCor: CABELO.grisalho, oculos: 'redondo', roupa: '#fff', roupaExtra: lapela('#D8DCE3'), frente: tubo, boca: 'aberto' }],
  ['Professora', '#BEE9E8', { pele: PELE.media, cabelo: 'coque', cabeloCor: CABELO.castanho, oculos: 'redondo', roupa: '#8E6BBF', frente: livro }],
  ['Bombeiro', '#FFE5A0', { pele: PELE.morena, cabelo: 'curto', cabeloCor: CABELO.preto, barba: 'bigode', roupa: '#2B2B33', roupaExtra: listras('#FFD93B'), frente: capacete('#E63946', p('M90 30 H110 V46 Q100 58 90 46 Z', '#FFD93B')) }],
  ['Policial', '#C9E4DE', { pele: PELE.retinta, cabelo: 'curto', cabeloCor: CABELO.preto, roupa: '#2456A6', roupaExtra: gravata('#16325C') + distintivo, frente: quepe('#2456A6'), boca: 'serio' }],
  ['Astronauta', '#2B2B55', { pele: PELE.clara, cabelo: 'franja', cabeloCor: CABELO.ruivo, roupa: '#fff', roupaExtra: r(84, 164, 32, 20, '#3FA7D6', 4) + c(132, 174, 6, '#E63946'),
    atras: c(100, 94, 70, '#E3E7ED'),
    frente: c(100, 94, 62, '#9AD4F5', 'fill-opacity=".18" stroke="#fff" stroke-width="9"') + l('M60 62 Q72 42 92 38', '#fff', 5) }],
  ['Piloto', '#D0F4DE', { pele: PELE.media, cabelo: 'lado', cabeloCor: CABELO.castanho, oculos: 'escuro', roupa: '#fff', roupaExtra: gravata('#2B2B33') + dragonas, frente: quepe('#1D2A4D') }],
  ['Marinheiro', '#FFD6A5', { pele: PELE.clara, cabelo: 'curto', cabeloCor: CABELO.ruivo, barba: 'barba', roupa: '#fff', roupaExtra: listras('#2456A6'), frente: marinheiro, boca: 'aberto' }],
  ['Mergulhadora', '#7FC8F8', { pele: PELE.morena, cabelo: 'rabo', cabeloCor: CABELO.preto, roupa: '#2B2B33', roupaExtra: r(92, 150, 16, 50, '#3FE0D0'), frente: mergulho, sobrancelha: 'nenhuma' }],
  ['Cozinheiro', '#D6E6F5', { pele: PELE.media, cabelo: 'curto', cabeloCor: CABELO.preto, barba: 'bigode', roupa: '#fff', roupaExtra: [[88, 166], [112, 166], [88, 184], [112, 184]].map(([x, y]) => c(x, y, 4, '#9AA5B4')).join(''), frente: chef, boca: 'aberto' }],
  ['Padeira', '#F6D6C8', { pele: PELE.escura, cabelo: 'afro', cabeloCor: CABELO.preto, roupa: '#F28C28', roupaExtra: avental('#fff'), chapeu: { tipo: 'faixa', cor: '#fff' }, frente: pao, rosto: bochechas }],
  ['Garçom', '#DCEBC3', { pele: PELE.clara, cabelo: 'lado', cabeloCor: CABELO.preto, roupa: '#fff', roupaExtra: colete('#2B2B33') + borboleta('#2B2B33'), frente: bandeja }],
  ['Fazendeiro', '#C5E8F7', { pele: PELE.media, cabelo: 'curto', cabeloCor: CABELO.ruivo, barba: 'barba', roupa: '#D62246', roupaExtra: [50, 80, 110, 140].map((x) => r(x, 150, 10, 50, '#fff', 0, 'opacity=".35"')).join(''), frente: palha('#8B5A2B') + trigo }],
  ['Jardineira', '#FFF1B8', { pele: PELE.clara, cabelo: 'trancas', cabeloCor: CABELO.loiro, roupa: '#F8A5C2', roupaExtra: avental('#3FA34D'), frente: palha('#F06BA8') + flor, rosto: bochechas }],
  ['Pescador', '#E4D9F5', { pele: PELE.morena, cabelo: 'curto', cabeloCor: CABELO.grisalho, barba: 'barba', roupa: '#F5B301', chapeu: { tipo: 'chapeu', cor: '#5C7A2E' }, frente: peixe }],
  ['Pedreiro', '#FFCFB3', { pele: PELE.escura, cabelo: 'curto', cabeloCor: CABELO.preto, barba: 'bigode', roupa: '#F28C28', roupaExtra: faixasRefletivas, frente: capacete('#FFD93B') }],
  ['Mecânica', '#D8E2DC', { pele: PELE.media, cabelo: 'rabo', cabeloCor: CABELO.castanho, roupa: '#2456A6', roupaExtra: r(84, 160, 32, 26, '#16325C', 4), chapeu: { tipo: 'bone', cor: '#4A4F5C' }, rosto: graxa, frente: chave, boca: 'aberto' }],
  ['Carteiro', '#C7EFCF', { pele: PELE.retinta, cabelo: 'curto', cabeloCor: CABELO.preto, roupa: '#FFD93B', roupaExtra: lapela('#2456A6'), chapeu: { tipo: 'bone', cor: '#2456A6', cor2: '#FFD93B' }, frente: envelope }],
  ['Pintora', '#FCE0E8', { pele: PELE.clara, cabelo: 'chanel', cabeloCor: CABELO.preto, roupa: '#fff', roupaExtra: c(70, 176, 6, '#E63946') + c(92, 186, 5, '#F5B301') + c(112, 170, 4, '#3FA7D6'), rosto: tinta, frente: boina('#D62246') + pincel, boca: 'batom' }],
  ['Fotógrafo', '#CFE1F2', { pele: PELE.morena, cabelo: 'cacheado', cabeloCor: CABELO.castanho, barba: 'barba', roupa: '#6B8E4E', frente: camera }],
  ['Cantora', '#F8E1B4', { pele: PELE.escura, cabelo: 'afro', cabeloCor: CABELO.preto, roupa: '#D62246', boca: 'grande', frente: brinco + microfone }],
  ['Músico', '#FFE0B5', { pele: PELE.clara, cabelo: 'longo', cabeloCor: CABELO.loiro, oculos: 'escuro', roupa: '#2B2B33', frente: nota, boca: 'serio' }],
  ['Mágico', '#E6D4F2', { pele: PELE.media, cabelo: 'lado', cabeloCor: CABELO.preto, barba: 'bigode', roupa: '#2B2B33', roupaExtra: lapela('#fff') + borboleta('#E63946'), frente: cartola + varinha }],
  ['Palhaço', '#CFF0E8', { pele: PELE.clara, cabelo: 'cacheado', cabeloCor: CABELO.azul, sobrancelha: 'nenhuma', roupa: '#FFD93B', roupaExtra: [[64, 176], [100, 186], [136, 176], [82, 160], [118, 160]].map(([x, y]) => c(x, y, 7, '#E63946')).join('') + borboleta('#2EAD4B'), rosto: e(100, 126, 24, 14, '#fff'), boca: 'grande', frente: narizPalhaco }],
  ['Detetive', '#FFD9C0', { pele: PELE.media, cabelo: 'curto', cabeloCor: CABELO.castanho, barba: 'bigode', roupa: '#C9A27A', roupaExtra: lapela('#A9825A'), chapeu: { tipo: 'chapeu', cor: '#8B5A2B', cor2: '#2B2B33' }, frente: lupa, boca: 'serio' }],
  ['Juíza', '#D9F0C4', { pele: PELE.retinta, cabelo: 'coque', cabeloCor: CABELO.grisalho, oculos: 'redondo', roupa: '#2B2B33', roupaExtra: p('M86 150 H114 L108 182 H92 Z', '#fff'), frente: martelo, boca: 'serio' }],
  ['Jogadora', '#C8F0D0', { pele: PELE.morena, cabelo: 'rabo', cabeloCor: CABELO.castanho, roupa: '#FFD93B', roupaExtra: p('M80 150 L100 170 L120 150 L126 154 L100 182 L74 154 Z', '#2EAD4B'), chapeu: { tipo: 'faixa', cor: '#2EAD4B' }, frente: bola, boca: 'aberto' }],
]

export const cartasProfissoes = () => profissoes.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, humano(o)) }))
