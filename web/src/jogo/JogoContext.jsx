import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { temaPorId } from '../dados/temas.js'
import { carregar, salvar } from './armazenamento.js'
import { reducer } from './reducer.js'

const JogoContext = createContext(null)

export function JogoProvider({ children }) {
  const [estado, despachar] = useReducer(reducer, null, carregar)

  useEffect(() => {
    salvar(estado)
  }, [estado])

  const novoJogo = useCallback((temaId) => {
    const { cartas } = temaPorId(temaId)
    const sorteada = cartas[Math.floor(Math.random() * cartas.length)]
    despachar({ tipo: 'novoJogo', temaId, minhaCartaId: sorteada.id })
  }, [])

  const alternar = useCallback((cartaId) => despachar({ tipo: 'alternar', cartaId }), [])

  const valor = useMemo(() => {
    if (!estado) return { jogo: null, novoJogo, alternar }
    const tema = temaPorId(estado.temaId)
    return {
      jogo: {
        tema,
        minhaCarta: tema.cartas.find((c) => c.id === estado.minhaCartaId),
        marcadas: new Set(estado.marcadas),
        restantes: tema.cartas.length - estado.marcadas.length,
      },
      novoJogo,
      alternar,
    }
  }, [estado, novoJogo, alternar])

  return <JogoContext.Provider value={valor}>{children}</JogoContext.Provider>
}

export const useJogo = () => useContext(JogoContext)
