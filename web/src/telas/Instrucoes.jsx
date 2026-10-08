import BarraSuperior from '../componentes/BarraSuperior.jsx'
import css from './Instrucoes.module.css'

export default function Instrucoes() {
  return (
    <div className={`tela ${css.tela}`}>
      <BarraSuperior titulo="Instruções" />
      <main className={css.texto}>
        <p className={css.resumo}>
          Um jogo para duas pessoas, cada uma no seu celular. Ganha quem descobrir primeiro a carta do adversário.
        </p>
        <ol className={css.passos}>
          <li>
            Os dois tocam em <strong>Novo jogo</strong> e escolhem o mesmo tema.
          </li>
          <li>
            Cada um recebe uma carta sorteada. Ela vale a partida inteira e fica guardada no botão{' '}
            <strong>Minha carta</strong>. Não mostre para o adversário.
          </li>
          <li>
            Em turnos alternados, cada jogador faz uma pergunta de sim ou não sobre a carta do outro. Por exemplo: “Usa
            óculos?” ou “Tem penas?”.
          </li>
          <li>
            Conforme a resposta, toque nas cartas que não podem ser a do adversário para eliminá-las. Eliminou errado?
            Toque de novo.
          </li>
          <li>
            Quando achar que sabe, dê o palpite. Se acertar, você vence. Se errar, o adversário faz duas perguntas
            seguidas.
          </li>
        </ol>
        <p className={css.nota}>
          O jogo fica salvo neste aparelho. Pode fechar o app e voltar depois pelo botão Continuar.
        </p>
      </main>
    </div>
  )
}
