import { Link } from 'react-router-dom'
import css from './BarraSuperior.module.css'

export default function BarraSuperior({ titulo, detalhe, voltarPara = '/', children }) {
  return (
    <header className={css.barra}>
      <Link to={voltarPara} className={css.voltar} aria-label="Voltar">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 5 L7.5 12 L14.5 19" />
        </svg>
      </Link>
      <div className={css.textos}>
        <h1 className={css.titulo}>{titulo}</h1>
        {detalhe && <p className={css.detalhe}>{detalhe}</p>}
      </div>
      {children}
    </header>
  )
}
