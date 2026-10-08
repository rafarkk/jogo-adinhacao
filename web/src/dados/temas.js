import { CARTAS } from './cartas.js'

// `amostra` são as cartas que ilustram o tema na tela de escolha.
export const TEMAS = [
  { id: 'selvagens', nome: 'Animais selvagens', cor: '#2E9E6B', amostra: ['leao', 'tucano', 'elefante'] },
  { id: 'domesticos', nome: 'Animais domésticos', cor: '#F0803C', amostra: ['cachorro', 'galo', 'vaca'] },
  { id: 'pessoas', nome: 'Pessoas aleatórias', cor: '#3D7DE0', amostra: ['carla', 'tiago', 'gabi'] },
  { id: 'gatos', nome: 'Gatos', cor: '#E8588F', amostra: ['frajola', 'tigrao', 'chanel'] },
  { id: 'anime', nome: 'Personagens de anime', cor: '#7C5CE0', amostra: ['gokan', 'marina-lua', 'lufi'] },
  { id: 'comidas', nome: 'Comidas', cor: '#D9463A', amostra: ['hamburguer', 'melancia', 'rosquinha'] },
  { id: 'bandeiras', nome: 'Bandeiras', cor: '#1C9AA6', amostra: ['brasil', 'japao', 'reino-unido'] },
  { id: 'profissoes', nome: 'Profissões', cor: '#A9683A', amostra: ['bombeiro', 'astronauta', 'cozinheiro'] },
  { id: 'monstrinhos', nome: 'Monstrinhos', cor: '#6BAF2E', amostra: ['bubu', 'gruk', 'tico'] },
  { id: 'robos', nome: 'Robôs', cor: '#5F6F86', amostra: ['bip', 'zeta', 'parafuso'] },
].map((tema) => ({ ...tema, cartas: CARTAS[tema.id] }))

export const temaPorId = (id) => TEMAS.find((t) => t.id === id)

export const urlCarta = (temaId, cartaId) => `${import.meta.env.BASE_URL}cartas/${temaId}/${cartaId}.svg`
