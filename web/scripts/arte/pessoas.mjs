import { TINTA, c, e, p, r, l, sim, carta } from './base.mjs'
import { humano, PELE, CABELO } from './figura.mjs'

const brinco = sim(c(58, 113, 4.5, '#F5B301'))
const sardas = sim(c(70, 110, 1.8, '#B5651D') + c(76, 114, 1.8, '#B5651D') + c(82, 110, 1.8, '#B5651D'))
const flor = c(138, 62, 9, '#F06BA8') + c(138, 62, 4, '#FFE156')
const gravata = p('M94 150 H106 L104 160 L110 196 H90 L96 160 Z', '#D62246')
const colar = [80, 88, 96, 104, 112, 120].map((x, i) => c(x, 158 + [0, 4, 6, 6, 4, 0][i], 3.5, '#fff')).join('')
const fone = l('M52 96 C48 26 152 26 148 96', TINTA, 6) + sim(r(44, 88, 16, 28, '#E63946', 7))
const laco = p('M100 40 L78 26 V54 Z M100 40 L122 26 V54 Z', '#E63946') + c(100, 40, 6, '#B5202C')
const gola = p('M82 150 L100 174 L118 150 L126 156 L100 190 L74 156 Z', '#fff')
const xadrez = [50, 80, 110, 140].map((x) => r(x, 150, 10, 50, '#fff', 0, 'opacity=".35"')).join('')
const bochechas = sim(c(72, 112, 7, '#F28B8B', 'opacity=".55"'))

const pessoas = [
  ['Ana', '#FFD6A5', { pele: PELE.clara, cabelo: 'longo', cabeloCor: CABELO.castanho, roupa: '#E63946' }],
  ['Bruno', '#BDE0FE', { pele: PELE.media, cabelo: 'curto', cabeloCor: CABELO.preto, barba: 'barba', roupa: '#2456A6', boca: 'aberto' }],
  ['Carla', '#CDEAC0', { pele: PELE.morena, cabelo: 'cacheado', cabeloCor: CABELO.preto, oculos: 'redondo', roupa: '#F5B301' }],
  ['Davi', '#E2CFF4', { pele: PELE.clara, cabelo: 'espetado', cabeloCor: CABELO.loiro, roupa: '#2EAD4B', boca: 'aberto' }],
  ['Elisa', '#FFE5A0', { pele: PELE.escura, cabelo: 'afro', cabeloCor: CABELO.preto, roupa: '#F06BA8', frente: brinco, boca: 'batom' }],
  ['Fábio', '#C9E4DE', { pele: PELE.media, cabelo: 'careca', barba: 'bigode', barbaCor: CABELO.preto, roupa: '#F28C28', boca: 'serio' }],
  ['Gabi', '#FAD2E1', { pele: PELE.clara, cabelo: 'chiquinhas', cabeloCor: CABELO.ruivo, roupa: '#8E6BBF', rosto: sardas, boca: 'aberto' }],
  ['Hugo', '#DCEBC3', { pele: PELE.morena, cabelo: 'curto', cabeloCor: CABELO.castanho, oculos: 'escuro', chapeu: { tipo: 'bone', cor: '#E63946' }, roupa: '#FFFFFF' }],
  ['Iara', '#BEE9E8', { pele: PELE.morena, cabelo: 'longoFranja', cabeloCor: CABELO.preto, roupa: '#2EAD4B', frente: flor }],
  ['João', '#F8E1B4', { pele: PELE.clara, cabelo: 'lado', cabeloCor: CABELO.castanho, oculos: 'redondo', roupa: '#FFFFFF', roupaExtra: gravata, boca: 'serio' }],
  ['Karen', '#D7E3FC', { pele: PELE.clara, cabelo: 'chanel', cabeloCor: CABELO.loiro, roupa: '#2B2B33', boca: 'batom' }],
  ['Léo', '#FFCFB3', { pele: PELE.escura, cabelo: 'moicano', cabeloCor: CABELO.preto, roupa: '#F5B301', frente: brinco, boca: 'aberto' }],
  ['Marta', '#D8E2DC', { pele: PELE.media, cabelo: 'coque', cabeloCor: CABELO.grisalho, oculos: 'redondo', roupa: '#B79AD9', roupaExtra: colar }],
  ['Nilo', '#C7EFCF', { pele: PELE.clara, cabelo: 'careca', barba: 'barba', barbaCor: CABELO.grisalho, sobrancelhaCor: '#9AA1AC', roupa: '#1F7A5C', rosto: bochechas }],
  ['Olívia', '#FDE2A7', { pele: PELE.retinta, cabelo: 'trancas', cabeloCor: CABELO.preto, roupa: '#F28C28', boca: 'aberto' }],
  ['Paulo', '#CFE1F2', { pele: PELE.media, cabelo: 'curto', cabeloCor: CABELO.ruivo, barba: 'barba', roupa: '#2456A6', roupaExtra: xadrez }],
  ['Quitéria', '#F6D6C8', { pele: PELE.morena, cabelo: 'longo', cabeloCor: CABELO.grisalho, chapeu: { tipo: 'chapeu', cor: '#E8CDA8', cor2: '#F06BA8' }, roupa: '#F06BA8' }],
  ['Rafa', '#D0F4DE', { pele: PELE.escura, cabelo: 'afro', cabeloCor: CABELO.preto, oculos: 'escuro', roupa: '#E63946', frente: fone, boca: 'aberto' }],
  ['Sofia', '#FFF1B8', { pele: PELE.clara, cabelo: 'rabo', cabeloCor: CABELO.loiro, roupa: '#7FC8F8', rosto: bochechas }],
  ['Tiago', '#E4D9F5', { pele: PELE.clara, cabelo: 'lado', cabeloCor: CABELO.preto, barba: 'bigode', chapeu: { tipo: 'chapeu', cor: '#2B2B33', cor2: '#8B5A2B' }, roupa: '#FFFFFF', roupaExtra: gola, boca: 'serio' }],
  ['Úrsula', '#FFD9C0', { pele: PELE.media, cabelo: 'chanel', cabeloCor: CABELO.azul, oculos: 'redondo', roupa: '#2B2B33', boca: 'batom' }],
  ['Vítor', '#C5E8F7', { pele: PELE.retinta, cabelo: 'curto', cabeloCor: CABELO.preto, chapeu: { tipo: 'gorro', cor: '#2EAD4B', cor2: '#FFFFFF' }, roupa: '#1F7A5C', boca: 'aberto' }],
  ['Wanda', '#D9F0C4', { pele: PELE.clara, cabelo: 'cacheado', cabeloCor: CABELO.ruivo, roupa: '#F5B301', frente: brinco, rosto: sardas }],
  ['Xavier', '#F2D5B8', { pele: PELE.morena, cabelo: 'careca', oculos: 'escuro', barba: 'barba', barbaCor: CABELO.preto, roupa: '#2B2B33', boca: 'serio' }],
  ['Yasmin', '#CFF0E8', { pele: PELE.morena, cabelo: 'careca', sobrancelhaCor: CABELO.castanho, chapeu: { tipo: 'lenco', cor: '#8E6BBF' }, roupa: '#8E6BBF' }],
  ['Zeca', '#FFE0B5', { pele: PELE.media, cabelo: 'espetado', cabeloCor: CABELO.castanho, chapeu: { tipo: 'faixa', cor: '#2456A6' }, roupa: '#F28C28', rosto: sardas, boca: 'aberto' }],
  ['Bia', '#E6D4F2', { pele: PELE.escura, cabelo: 'coque', cabeloCor: CABELO.preto, roupa: '#FFFFFF', frente: laco, rosto: bochechas }],
  ['Caio', '#C8F0D0', { pele: PELE.clara, cabelo: 'franja', cabeloCor: CABELO.rosa, roupa: '#2B2B33', boca: 'serio', frente: c(108, 126, 2.5, '#C9CED6') }],
  ['Neide', '#FCE0E8', { pele: PELE.media, cabelo: 'cacheado', cabeloCor: CABELO.grisalho, oculos: 'redondo', roupa: '#2EAD4B', boca: 'batom', frente: brinco }],
  ['Enzo', '#D6E6F5', { pele: PELE.retinta, cabelo: 'lado', cabeloCor: CABELO.loiro, roupa: '#E63946', olhos: 'fechado', boca: 'aberto' }],
]

export const cartasPessoas = () => pessoas.map(([nome, fundo, o]) => ({ nome, svg: carta(fundo, humano(o)) }))
