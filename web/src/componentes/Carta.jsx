import { urlCarta } from '../dados/temas.js'
import css from './Carta.module.css'

// A carta se dimensiona pela largura: quem usa define só `width` (via className).
// Com `aoTocar` vira um botão de marcar/desmarcar; sem ele é só ilustração.
export default function Carta({ temaId, carta, marcada = false, aoTocar, className = '' }) {
  const classes = `${css.carta} ${marcada ? css.marcada : ''} ${className}`
  const face = (
    <span className={css.face}>
      <span className={css.arte}>
        <img src={urlCarta(temaId, carta.id)} alt="" draggable="false" />
        {marcada && (
          <svg className={css.xis} viewBox="0 0 100 100" aria-hidden="true">
            <path d="M22 22 L78 78 M78 22 L22 78" />
          </svg>
        )}
      </span>
      <span className={`${css.nome} ${carta.nome.length > 11 ? css.longo : ''}`}>{carta.nome}</span>
    </span>
  )

  if (!aoTocar) return <span className={classes}>{face}</span>

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={marcada}
      aria-label={marcada ? `${carta.nome}, eliminada` : carta.nome}
      onClick={() => aoTocar(carta.id)}
    >
      {face}
    </button>
  )
}

// Verso da carta, usado onde a carta sorteada não pode aparecer.
export function VersoCarta({ className = '' }) {
  return (
    <span className={`${css.carta} ${className}`} aria-hidden="true">
      <span className={`${css.face} ${css.verso}`}>?</span>
    </span>
  )
}
