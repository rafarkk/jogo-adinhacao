import { Link } from 'react-router-dom'
import css from './Botao.module.css'

// Vira <Link> quando recebe `para`, senão <button>.
export default function Botao({ para, variante = 'claro', detalhe, children, className = '', ...resto }) {
  const classes = `${css.botao} ${css[variante]} ${className}`
  const conteudo = (
    <>
      <span>{children}</span>
      {detalhe && <span className={css.detalhe}>{detalhe}</span>}
    </>
  )
  return para ? (
    <Link to={para} className={classes} {...resto}>
      {conteudo}
    </Link>
  ) : (
    <button type="button" className={classes} {...resto}>
      {conteudo}
    </button>
  )
}
