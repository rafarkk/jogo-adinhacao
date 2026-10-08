import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { JogoProvider } from './jogo/JogoContext.jsx'
import Home from './telas/Home.jsx'
import EscolhaTema from './telas/EscolhaTema.jsx'
import Jogo from './telas/Jogo.jsx'
import Instrucoes from './telas/Instrucoes.jsx'

export default function App() {
  return (
    <JogoProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temas" element={<EscolhaTema />} />
          <Route path="/jogo" element={<Jogo />} />
          <Route path="/instrucoes" element={<Instrucoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </JogoProvider>
  )
}
