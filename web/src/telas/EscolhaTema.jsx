import { useNavigate } from 'react-router-dom'
import BarraSuperior from '../componentes/BarraSuperior.jsx'
import { TEMAS, urlCarta } from '../dados/temas.js'
import { useJogo } from '../jogo/JogoContext.jsx'
import css from './EscolhaTema.module.css'

export default function EscolhaTema() {
  const { novoJogo } = useJogo()
  const navegar = useNavigate()

  const escolher = (temaId) => {
    novoJogo(temaId)
    // replace: o voltar do jogo leva para a Home, não de volta para esta tela
    navegar('/jogo', { replace: true, state: { revelar: true } })
  }

  return (
    <div className={`tela ${css.tela}`}>
      <BarraSuperior titulo="Escolha o tema" />
      <main className={css.lista}>
        {TEMAS.map((tema) => (
          <button key={tema.id} type="button" className={css.tema} onClick={() => escolher(tema.id)}>
            <span className={css.amostras} style={{ background: tema.cor }} aria-hidden="true">
              {tema.amostra.map((cartaId) => (
                <img key={cartaId} src={urlCarta(tema.id, cartaId)} alt="" />
              ))}
            </span>
            <span className={css.textos}>
              <span className={css.nome}>{tema.nome}</span>
              <span className={css.quantidade}>{tema.cartas.length} cartas</span>
            </span>
          </button>
        ))}
      </main>
    </div>
  )
}
