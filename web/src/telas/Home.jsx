import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Botao from '../componentes/Botao.jsx'
import Carta from '../componentes/Carta.jsx'
import Modal from '../componentes/Modal.jsx'
import { NOME_JOGO } from '../config.js'
import { temaPorId } from '../dados/temas.js'
import { useJogo } from '../jogo/JogoContext.jsx'
import css from './Home.module.css'

// cartas de temas diferentes, para a capa já mostrar que o jogo não é só de bichos
const CAPA = [
  ['gatos', 'frajola'],
  ['selvagens', 'leao'],
  ['anime', 'marina-lua'],
].map(([temaId, cartaId]) => ({ temaId, carta: temaPorId(temaId).cartas.find((c) => c.id === cartaId) }))

export default function Home() {
  const { jogo } = useJogo()
  const navegar = useNavigate()
  const [confirmando, setConfirmando] = useState(false)

  return (
    <main className={`tela ${css.home}`}>
      <div className={css.miolo}>
        <div className={css.capa}>
          <div className={css.leque} aria-hidden="true">
            {CAPA.map(({ temaId, carta }) => (
              <Carta key={carta.id} temaId={temaId} carta={carta} className={css.cartaCapa} />
            ))}
          </div>
          <h1 className={css.titulo}>{NOME_JOGO}</h1>
          <p className={css.chamada}>Pergunte, elimine e descubra a carta do adversário.</p>
        </div>

        <nav className={css.acoes}>
          {jogo && (
            <Botao
              para="/jogo"
              variante="principal"
              detalhe={`${jogo.tema.nome}, ${jogo.restantes} de ${jogo.tema.cartas.length} cartas em jogo`}
            >
              Continuar
            </Botao>
          )}
          <Botao
            variante={jogo ? 'claro' : 'principal'}
            onClick={() => (jogo ? setConfirmando(true) : navegar('/temas'))}
          >
            Novo jogo
          </Botao>
          <Botao para="/instrucoes" variante={jogo ? 'discreto' : 'claro'}>
            Instruções
          </Botao>
        </nav>
      </div>

      <Modal aberto={confirmando} aoFechar={() => setConfirmando(false)} rotulo="Começar novo jogo">
        <h2>Começar outro jogo?</h2>
        <p>A carta e as marcações do jogo atual serão apagadas.</p>
        <div className={css.confirmacao}>
          <Botao variante="principal" onClick={() => navegar('/temas')}>
            Novo jogo
          </Botao>
          <Botao variante="discreto" onClick={() => setConfirmando(false)}>
            Manter o atual
          </Botao>
        </div>
      </Modal>
    </main>
  )
}
