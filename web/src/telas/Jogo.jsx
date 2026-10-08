import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import BarraSuperior from '../componentes/BarraSuperior.jsx'
import Botao from '../componentes/Botao.jsx'
import Carta, { VersoCarta } from '../componentes/Carta.jsx'
import Modal from '../componentes/Modal.jsx'
import { useJogo } from '../jogo/JogoContext.jsx'
import css from './Jogo.module.css'

export default function Jogo() {
  const { jogo, alternar } = useJogo()
  const local = useLocation()
  // logo após o sorteio a carta já abre revelada
  const [vendoCarta, setVendoCarta] = useState(Boolean(local.state?.revelar))

  if (!jogo) return <Navigate to="/" replace />

  const { tema, minhaCarta, marcadas, restantes } = jogo

  return (
    <div className={`tela ${css.jogo}`} style={{ '--cor-tema': tema.cor }}>
      <BarraSuperior titulo={tema.nome} detalhe={`${restantes} de ${tema.cartas.length} em jogo`}>
        <button type="button" className={css.minhaCarta} onClick={() => setVendoCarta(true)}>
          <VersoCarta className={css.icone} />
          Minha carta
        </button>
      </BarraSuperior>

      <main className={css.grade}>
        {tema.cartas.map((carta) => (
          <div key={carta.id} className={css.celula}>
            <Carta
              temaId={tema.id}
              carta={carta}
              marcada={marcadas.has(carta.id)}
              aoTocar={alternar}
              className={css.cartaNaGrade}
            />
          </div>
        ))}
      </main>

      <Modal aberto={vendoCarta} aoFechar={() => setVendoCarta(false)} rotulo="Minha carta">
        <Carta temaId={tema.id} carta={minhaCarta} className={css.cartaSorteada} />
        <div className={css.sobreCarta}>
          <h2>Sua carta é {minhaCarta.nome}</h2>
          <p>Não mostre para o adversário. Ela vale até o fim da partida.</p>
          <Botao variante="principal" onClick={() => setVendoCarta(false)}>
            Fechar
          </Botao>
        </div>
      </Modal>
    </div>
  )
}
