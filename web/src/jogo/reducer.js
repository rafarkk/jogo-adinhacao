// Estado de uma partida. Guarda só IDs, para o jogo salvo sobreviver a mudanças nas cartas.
// null = nenhuma partida em andamento.
export const VERSAO = 1

export function reducer(estado, acao) {
  switch (acao.tipo) {
    case 'novoJogo':
      return { versao: VERSAO, temaId: acao.temaId, minhaCartaId: acao.minhaCartaId, marcadas: [] }
    case 'alternar': {
      if (!estado) return estado
      const marcada = estado.marcadas.includes(acao.cartaId)
      return {
        ...estado,
        marcadas: marcada ? estado.marcadas.filter((id) => id !== acao.cartaId) : [...estado.marcadas, acao.cartaId],
      }
    }
    default:
      return estado
  }
}
