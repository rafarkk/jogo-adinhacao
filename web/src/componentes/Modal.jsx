import { useEffect, useRef } from 'react'
import css from './Modal.module.css'

// <dialog> nativo: cuida do foco, do Esc e do botão voltar do Android.
export default function Modal({ aberto, aoFechar, rotulo, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialogo = ref.current
    if (aberto && !dialogo.open) dialogo.showModal()
    if (!aberto && dialogo.open) dialogo.close()
  }, [aberto])

  return (
    <dialog
      ref={ref}
      className={css.modal}
      aria-label={rotulo}
      onClose={aoFechar}
      onClick={(e) => e.target === ref.current && aoFechar()}
    >
      {aberto && <div className={css.caixa}>{children}</div>}
    </dialog>
  )
}
