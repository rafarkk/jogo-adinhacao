import { temaPorId } from '../dados/temas.js'
import { VERSAO } from './reducer.js'

const CHAVE = 'qual-e:jogo'

// Devolve a partida salva, ou null se não houver ou se ela não for mais válida.
export function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE))
    if (!salvo || salvo.versao !== VERSAO) return null
    const tema = temaPorId(salvo.temaId)
    if (!tema) return null
    const ids = new Set(tema.cartas.map((c) => c.id))
    if (!ids.has(salvo.minhaCartaId)) return null
    const marcadas = Array.isArray(salvo.marcadas) ? salvo.marcadas.filter((id) => ids.has(id)) : []
    return { versao: VERSAO, temaId: tema.id, minhaCartaId: salvo.minhaCartaId, marcadas }
  } catch {
    return null
  }
}

export function salvar(estado) {
  try {
    if (estado) localStorage.setItem(CHAVE, JSON.stringify(estado))
    else localStorage.removeItem(CHAVE)
  } catch {
    // armazenamento indisponível (modo privado, cota): o jogo segue só em memória
  }
}
