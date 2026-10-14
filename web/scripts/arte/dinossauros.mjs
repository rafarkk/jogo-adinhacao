import { TINTA, c, e, p, r, l, rot, esc, recorte, carta, tom } from './base.mjs'

// Dinossauros (e primos pré-históricos) de perfil, olhando para a direita.
// Cinco esqueletos (bípede, quadrúpede, pescoçudo, voador e marinho) com peças trocáveis,
// para que as perguntas de sim/não (anda em duas patas? tem chifre? voa? nada? tem crista?) dividam bem as cartas.

const MARFIM = '#FFF3D6'
const BICO = '#F5C542'

const olho = (x, y, raio = 6) =>
  c(x, y, raio, '#fff') + c(x + raio * 0.25, y, raio * 0.6, TINTA) + c(x + raio * 0.45, y - raio * 0.3, raio * 0.22, '#fff')

const dentes = (x0, x1, y, alt = 5) => {
  let s = ''
  for (let x = x0; x + 6 <= x1; x += 6) s += p(`M${x} ${y} L${x + 3} ${y + alt} L${x + 6} ${y} Z`, '#fff')
  return s
}

// listras ou manchas recortadas pela forma do corpo; (cx, cy) é o centro do corpo
const padrao = (forma, tipo, cor, cx, cy) => {
  if (!tipo) return ''
  const escuro = tom(cor, -0.22)
  const s =
    tipo === 'listras'
      ? [-48, -28, -8, 12, 32, 52].map((dx) => p(`M${cx + dx} ${cy - 50} l10 0 l-8 100 l-10 0 Z`, escuro)).join('')
      : [[-22, -8, 7], [4, -14, 6], [-8, 10, 8], [20, 6, 6], [-34, 10, 5], [28, -14, 5]]
          .map(([dx, dy, rr]) => c(cx + dx, cy + dy, rr, escuro))
          .join('')
  return recorte(forma, s)
}

// ---------- bípedes ----------

const CABECAS_BIP = {
  normal: (x, y, cor) =>
    r(x - 22, y - 15, 48, 30, cor, 13) + olho(x - 6, y - 5) + c(x + 20, y - 7, 1.8, TINTA) +
    l(`M${x - 4} ${y + 7} Q${x + 12} ${y + 9} ${x + 24} ${y + 5}`, TINTA, 3),
  grande: (x, y, cor) =>
    r(x - 28, y - 20, 62, 40, cor, 16) + p(`M${x - 18} ${y - 16} L${x - 2} ${y - 20} L${x - 4} ${y - 13} Z`, tom(cor, -0.25)) +
    olho(x - 10, y - 7, 6) + c(x + 28, y - 10, 2, TINTA) + l(`M${x - 8} ${y + 8} H${x + 32}`, TINTA, 3),
  fino: (x, y, cor) =>
    r(x - 20, y - 14, 32, 26, cor, 12) + r(x, y - 5, 44, 14, cor, 7) + olho(x - 8, y - 4, 5.5) +
    c(x + 40, y - 1, 1.8, TINTA) + l(`M${x - 2} ${y + 5} H${x + 42}`, TINTA, 2.5),
  bico: (x, y, cor) =>
    p(`M${x + 14} ${y - 9} Q${x + 36} ${y - 4} ${x + 34} ${y + 8} L${x + 14} ${y + 10} Z`, BICO) +
    r(x - 20, y - 14, 40, 26, cor, 12) + olho(x - 5, y - 4, 5.5),
  pato: (x, y, cor) =>
    e(x + 24, y + 4, 17, 7, BICO) + l(`M${x + 12} ${y + 4} H${x + 38}`, tom(BICO, -0.3), 2) +
    r(x - 20, y - 14, 38, 26, cor, 12) + olho(x - 5, y - 4, 5.5),
  domo: (x, y, cor, { claro }) =>
    c(x - 6, y - 12, 18, claro) +
    [[-24, -6], [-20, -20], [-8, -30], [8, -22]].map(([dx, dy]) => c(x + dx, y + dy, 3.5, tom(claro, -0.3))).join('') +
    r(x - 20, y - 12, 44, 26, cor, 12) + olho(x - 2, y - 2, 5.5) + l(`M${x} ${y + 7} Q${x + 12} ${y + 9} ${x + 22} ${y + 5}`, TINTA, 3),
}

// cristas e chifres: `atras` vem antes da cabeça, `frente` depois
const TOPOS = {
  dupla: (x, y, k) => ({
    atras:
      p(`M${x - 18} ${y - 10} Q${x - 14} ${y - 42} ${x + 2} ${y - 12} Z`, k) +
      p(`M${x - 6} ${y - 10} Q${x + 2} ${y - 38} ${x + 16} ${y - 10} Z`, tom(k, 0.25)),
  }),
  leque: (x, y, k) => ({ atras: p(`M${x - 20} ${y - 8} A20 24 0 0 1 ${x + 16} ${y - 8} Z`, k) }),
  tubo: (x, y, k) => ({ atras: l(`M${x - 4} ${y - 8} Q${x - 24} ${y - 30} ${x - 52} ${y - 32}`, k, 13) }),
  ovi: (x, y, k) => ({ atras: p(`M${x - 14} ${y - 10} Q${x - 4} ${y - 50} ${x + 18} ${y - 8} Z`, k) }),
  chifres: (x, y) => ({
    frente:
      p(`M${x - 16} ${y - 12} L${x - 14} ${y - 32} L${x - 4} ${y - 13} Z`, MARFIM) +
      p(`M${x - 8} ${y - 13} L${x - 2} ${y - 34} L${x + 4} ${y - 14} Z`, tom(MARFIM, -0.1)),
  }),
  chifrinho: (x, y, k) => ({ frente: p(`M${x - 2} ${y - 13} L${x + 4} ${y - 25} L${x + 10} ${y - 13} Z`, k) }),
  penacho: (x, y, k) => ({ atras: l(`M${x - 16} ${y - 8} q-8 -14 -18 -14 M${x - 12} ${y - 12} q-2 -16 -12 -20`, k, 6) }),
}

const BRACOS = {
  curto: (cor) => l('M120 114 L128 124 L136 120', tom(cor, -0.1), 6),
  longo: (cor) => l('M118 110 Q130 132 146 128', cor, 8) + l('M146 128 l7 -3 M146 128 l6 4', TINTA, 2.5),
  garras: (cor) => l('M116 108 Q132 130 146 126', cor, 10) + l('M146 122 q14 -4 18 10 M146 127 q14 0 16 14 M144 131 q10 4 10 16', MARFIM, 3.5),
  asas: (cor, { claro }) =>
    p('M108 100 Q152 104 164 142 L152 136 L148 148 L138 140 L132 152 L124 140 Q114 136 108 120 Z', claro) +
    l('M110 106 Q146 112 160 138', tom(claro, -0.25), 2.5),
  polegar: (cor) => l('M118 110 Q130 130 144 128', cor, 8) + p('M142 122 L150 112 L148 126 Z', MARFIM),
}

function bipede(o) {
  const {
    cor, claro = tom(cor, 0.45), crista = '#E63946', cabeca = 'normal', topo, bracos = 'curto',
    costas, padraoT, hx = 146, hy = 64, pescoco = 22, comDentes = false, escala = 1,
  } = o
  const esc_ = tom(cor, -0.25)
  const forma = (f) => e(92, 118, 40, 30, f, 'transform="rotate(-18 92 118)"')
  const t = topo ? TOPOS[topo](hx, hy, crista) : {}

  const s =
    (costas === 'vela'
      ? p('M56 114 Q56 46 86 52 Q104 30 126 98 Z', crista) +
        l('M70 104 L70 60 M84 100 L86 54 M98 98 L102 46 M112 98 L114 66', tom(crista, -0.2), 2.5)
      : '') +
    (costas === 'penas' ? p('M14 74 L-2 62 L10 82 L-4 86 L14 92 Z', claro) : '') +
    p('M72 102 Q36 98 6 72 Q28 116 74 138 Z', cor) +
    l('M106 132 L110 162 L102 180', esc_, 13) + l('M98 182 H118', esc_, 8) +
    forma(cor) +
    padrao(forma('#000'), padraoT, cor, 92, 118) +
    (costas === 'penas' ? p('M60 100 L66 86 L74 96 L82 80 L90 92 L98 76 L106 88 L114 74 L118 92 Z', claro) : '') +
    e(84, 136, 20, 24, cor) + l('M86 148 L90 166 L82 182', cor, 14) + l('M76 184 H98', cor, 9) +
    l(`M112 106 Q${(112 + hx) / 2 + 6} ${hy + 30} ${hx - 12} ${hy + 6}`, cor, pescoco) +
    (t.atras || '') +
    CABECAS_BIP[cabeca](hx, hy, cor, { claro }) +
    (comDentes ? dentes(hx - (cabeca === 'grande' ? 6 : 2), hx + (cabeca === 'grande' ? 32 : cabeca === 'fino' ? 42 : 24), hy + (cabeca === 'grande' ? 8 : cabeca === 'fino' ? 5 : 7)) : '') +
    (t.frente || '') +
    BRACOS[bracos](cor, { claro })

  return escala === 1 ? s : esc(s, escala, 100, 186)
}

// ---------- quadrúpedes ----------

const topoCorpo = (x) => 118 - 32 * Math.sqrt(Math.max(0, 1 - ((x - 94) / 52) ** 2))

function quadrupede(o) {
  const { cor, claro = tom(cor, 0.45), crista = '#F28C28', cabeca = 'pequena', chifres, costas, padraoT } = o
  const esc_ = tom(cor, -0.25)
  const blindado = costas === 'armadura'
  const forma = (f) => (blindado ? e(94, 124, 58, 28, f) : e(94, 118, 52, 32, f))

  let atras = ''
  if (costas === 'placas') {
    atras =
      [[50, 16], [66, 24], [82, 30], [98, 30], [114, 24], [130, 16]]
        .map(([x, h], i) => {
          const y = topoCorpo(x) + 6
          return p(`M${x - 11} ${y + 6} L${x - 8} ${y - h * 0.6} L${x} ${y - h} L${x + 8} ${y - h * 0.6} L${x + 11} ${y + 6} Z`, i % 2 ? tom(crista, 0.2) : crista)
        })
        .join('') +
      p('M22 130 L8 108 L30 126 Z', MARFIM) + p('M14 136 L-2 118 L20 132 Z', MARFIM)
  }
  if (costas === 'vela') {
    atras = p('M50 108 Q52 40 94 38 Q136 40 138 108 Z', crista) +
      l('M64 100 L62 56 M80 96 L78 44 M96 94 L96 40 M112 96 L114 44 M126 100 L128 58', tom(crista, -0.2), 2.5)
  }

  const cauda = blindado
    ? l('M44 124 Q24 130 16 138', cor, 12) + c(12, 140, 13, esc_)
    : p('M50 106 Q22 112 4 140 Q30 136 54 134 Z', cor)

  const armadura = blindado
    ? recorte(forma('#000'),
        [[60, 104], [80, 98], [100, 96], [120, 98], [140, 106], [70, 118], [90, 114], [110, 114], [130, 120]]
          .map(([x, y]) => c(x, y, 6, claro)).join('')) +
      [44, 64, 84, 104, 124, 144].map((x) => p(`M${x - 6} ${topoCorpo(x) + 14} L${x} ${topoCorpo(x) - 2} L${x + 6} ${topoCorpo(x) + 14} Z`, MARFIM)).join('')
    : ''

  let cab = ''
  if (cabeca === 'pequena') {
    cab = l('M136 116 Q148 124 154 130', cor, 20) + e(160, 130, 17, 12, cor) + olho(160, 126, 4.5) +
      l('M166 136 Q172 137 176 133', TINTA, 2.5)
  } else if (cabeca === 'ceratops') {
    const raioGola = chifres === 'proto' ? 28 : 34
    const espinhos =
      chifres === 'estiraco'
        ? [-160, -130, -100, -70, -40].map((a) => {
            const rad = (a * Math.PI) / 180
            const bx = 140 + raioGola * Math.cos(rad), by = 100 + raioGola * Math.sin(rad)
            const px = 140 + (raioGola + 22) * Math.cos(rad), py = 100 + (raioGola + 22) * Math.sin(rad)
            const nx = -Math.sin(rad) * 6, ny = Math.cos(rad) * 6
            return p(`M${bx - nx} ${by - ny} L${px} ${py} L${bx + nx} ${by + ny} Z`, MARFIM)
          }).join('')
        : ''
    cab =
      espinhos + c(140, 100, raioGola, crista) + c(140, 100, raioGola - 9, tom(crista, 0.25)) +
      l('M128 116 L146 118', cor, 24) +
      e(160, 120, 24, 18, cor) + p('M176 110 L196 124 L176 134 Z', tom(cor, -0.35)) + olho(156, 114, 5.5) +
      (chifres === 'tri'
        ? p('M148 106 L176 70 L158 108 Z', MARFIM) + p('M158 106 L190 76 L166 110 Z', tom(MARFIM, -0.08)) + p('M174 108 L180 94 L182 112 Z', MARFIM)
        : '') +
      (chifres === 'estiraco' ? p('M168 108 L184 72 L182 114 Z', MARFIM) : '')
  } else if (cabeca === 'dentes') {
    cab = l('M134 112 L148 112', cor, 24) + r(140, 98, 48, 28, cor, 12) + olho(154, 106, 5.5) +
      c(184, 104, 1.8, TINTA) + l('M148 118 H186', TINTA, 3) + dentes(150, 186, 118)
  }

  return (
    atras + cauda +
    l('M74 128 V178', esc_, 17) + l('M128 126 V178', esc_, 17) +
    forma(cor) + padrao(forma('#000'), padraoT, cor, 94, 118) + armadura +
    l('M62 132 V182', cor, 19) + l('M114 132 V182', cor, 19) +
    cab
  )
}

// ---------- pescoço comprido ----------

function pescocudo(o) {
  const { cor, hx, hy, qx, qy, bossa = false, espinhos = false, crista = '#F28C28', padraoT } = o
  const esc_ = tom(cor, -0.25)
  const forma = (f) => e(80, 132, 46, 30, f)
  const [x0, y0, x2, y2] = [106, 120, hx - 8, hy + 4]

  let s = ''
  if (espinhos) {
    for (let t = 0.12; t <= 0.92; t += 0.1) {
      const bx = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * qx + t * t * x2
      const by = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * qy + t * t * y2
      const dx = 2 * (1 - t) * (qx - x0) + 2 * t * (x2 - qx)
      const dy = 2 * (1 - t) * (qy - y0) + 2 * t * (y2 - qy)
      const n = Math.hypot(dx, dy)
      const [nx, ny] = [dy / n, -dx / n]
      s += l(`M${bx + nx * 6} ${by + ny * 6} L${bx + nx * 26} ${by + ny * 26}`, crista, 3.5)
      s += l(`M${bx + nx * 6 - 4} ${by + ny * 6} L${bx + nx * 22 - 4} ${by + ny * 22}`, tom(crista, -0.2), 3)
    }
  }

  return (
    s +
    p('M42 122 Q14 132 -4 168 Q26 152 46 146 Z', cor) +
    l('M66 142 V182', esc_, 16) + l('M106 140 V182', esc_, 16) +
    forma(cor) + padrao(forma('#000'), padraoT, cor, 80, 132) +
    l('M56 146 V184', cor, 18) + l('M96 146 V184', cor, 18) +
    l(`M${x0} ${y0} Q${qx} ${qy} ${x2} ${y2}`, cor, 18) +
    (bossa ? c(hx - 4, hy - 8, 10, cor) : '') +
    e(hx, hy, 17, 11, cor) + olho(hx - 1, hy - 3, 4.5) +
    l(`M${hx + 4} ${hy + 5} Q${hx + 10} ${hy + 7} ${hx + 15} ${hy + 3}`, TINTA, 2.5)
  )
}

// ---------- voadores ----------

function voador(o) {
  const { cor, asa = tom(cor, 0.2), crista = '#E63946', tipo = 'ptera' } = o
  const cabeca =
    tipo === 'ptera'
      ? l('M118 118 Q130 112 136 106', cor, 12) + p('M134 102 L90 80 L142 96 Z', crista) +
        p('M148 98 L196 110 L148 112 Z', BICO) + e(140, 104, 14, 10, cor) + olho(139, 101, 4.5)
      : l('M118 118 Q136 104 146 80', cor, 12) + p('M142 72 L130 52 L154 68 Z', crista) +
        p('M156 70 L198 96 L154 86 Z', BICO) + e(150, 76, 13, 10, cor) + olho(149, 73, 4.5)
  return (
    p('M100 114 Q126 60 172 28 L160 64 Q138 98 118 126 Z', tom(asa, -0.18)) +
    l('M82 128 L64 146 M88 130 L74 150', tom(cor, -0.2), 4) +
    e(98, 124, 26, 15, cor) +
    p('M98 118 Q68 62 18 30 L32 66 Q58 104 76 132 Z', asa) +
    l('M98 118 Q68 62 18 30', tom(asa, -0.25), 3) +
    cabeca
  )
}

// ---------- marinhos ----------

const BOLHAS = c(28, 46, 6, '#fff', 'opacity=".6"') + c(40, 28, 4, '#fff', 'opacity=".6"') + c(176, 160, 5, '#fff', 'opacity=".6"')

const MARINHOS = {
  plesio: (cor) => {
    const esc_ = tom(cor, -0.25)
    return (
      rot(e(112, 142, 20, 7, esc_), 35, 112, 142) + rot(e(66, 144, 18, 6, esc_), 35, 66, 144) +
      p('M46 124 L8 134 L46 140 Z', cor) +
      e(82, 130, 40, 22, cor) + e(84, 140, 30, 9, tom(cor, 0.35)) +
      rot(e(98, 152, 22, 8, cor), 35, 98, 152) + rot(e(54, 152, 18, 7, cor), 35, 54, 152) +
      l('M110 122 Q144 108 150 62', cor, 14) +
      e(156, 56, 16, 10, cor) + olho(156, 52, 4.5) + l('M160 61 Q166 63 171 59', TINTA, 2.5)
    )
  },
  mosa: (cor) => {
    const esc_ = tom(cor, -0.25)
    return (
      rot(e(110, 140, 18, 6, esc_), 30, 110, 140) +
      p('M52 116 Q26 118 10 116 L10 134 Q30 134 52 134 Z', cor) + p('M14 118 L0 92 L20 120 L4 152 L16 132 Z', cor) +
      e(92, 124, 48, 20, cor) + e(94, 134, 38, 7, tom(cor, 0.35)) +
      rot(e(98, 148, 20, 7, cor), 30, 98, 148) + rot(e(58, 146, 16, 6, cor), 30, 58, 146) +
      r(124, 104, 62, 28, cor, 12) + olho(140, 112, 5) + c(182, 110, 1.8, TINTA) +
      l('M136 124 H184', TINTA, 3) + dentes(138, 184, 124)
    )
  },
  ictio: (cor) => {
    const forma = (f) => e(96, 120, 50, 26, f)
    return (
      p('M84 98 L98 70 L116 98 Z', cor) + p('M52 118 L16 84 L30 120 L16 154 Z', cor) +
      forma(cor) + recorte(forma('#000'), e(100, 140, 50, 16, tom(cor, 0.4))) +
      r(138, 114, 48, 10, cor, 5) +
      rot(e(104, 144, 18, 7, tom(cor, -0.25)), 30, 104, 144) +
      olho(130, 112, 9)
    )
  },
}

const marinho = ({ cor, tipo }) => BOLHAS + MARINHOS[tipo](cor)

const CORPOS = { bipede, quadrupede, pescocudo, voador, marinho }

const dinos = [
  ['Tiranossauro', '#DCEBC3', 'bipede', { cor: '#4E9A45', cabeca: 'grande', comDentes: true, hx: 142, hy: 62, pescoco: 28 }],
  ['Triceratops', '#FFE0B5', 'quadrupede', { cor: '#E8873A', cabeca: 'ceratops', chifres: 'tri', crista: '#C9532F' }],
  ['Estegossauro', '#D7E3FC', 'quadrupede', { cor: '#3F9E86', costas: 'placas', crista: '#F28C28' }],
  ['Braquiossauro', '#FDE2A7', 'pescocudo', { cor: '#6C9BD2', hx: 150, hy: 30, qx: 122, qy: 44, bossa: true }],
  ['Velociraptor', '#F6D6C8', 'bipede', { cor: '#B5733A', bracos: 'longo', topo: 'penacho', crista: '#2456A6', costas: 'penas', padraoT: 'listras', hx: 150, hy: 70, pescoco: 18 }],
  ['Pteranodonte', '#C5E8F7', 'voador', { cor: '#8E6CC6', crista: '#E63946' }],
  ['Anquilossauro', '#E4D9F5', 'quadrupede', { cor: '#A08A5C', costas: 'armadura', claro: '#D7C49A' }],
  ['Espinossauro', '#FFF1B8', 'bipede', { cor: '#3F7FBF', cabeca: 'fino', costas: 'vela', crista: '#E63946', comDentes: true, hx: 140, hy: 66 }],
  ['Parassaurolofo', '#CFE1F2', 'bipede', { cor: '#E9B949', cabeca: 'pato', topo: 'tubo', crista: '#D62246', bracos: 'longo', hx: 148, hy: 64 }],
  ['Paquicefalossauro', '#D0F4DE', 'bipede', { cor: '#C76B9E', cabeca: 'domo', claro: '#F3D3E4', bracos: 'curto', hx: 146, hy: 70 }],
  ['Diplodoco', '#FFD6A5', 'pescocudo', { cor: '#7DB548', hx: 172, hy: 70, qx: 150, qy: 76, padraoT: 'manchas' }],
  ['Dilofossauro', '#FCE0E8', 'bipede', { cor: '#5BAA6A', topo: 'dupla', crista: '#E63946', bracos: 'longo', padraoT: 'listras', hx: 148, hy: 66 }],
  ['Carnotauro', '#D8E2DC', 'bipede', { cor: '#C8463D', topo: 'chifres', comDentes: true, bracos: 'curto', hx: 146, hy: 66, pescoco: 24 }],
  ['Iguanodonte', '#F8E1B4', 'bipede', { cor: '#7DA453', cabeca: 'bico', bracos: 'polegar', padraoT: 'manchas', hx: 146, hy: 64 }],
  ['Compsognato', '#C9E4DE', 'bipede', { cor: '#9CC94A', bracos: 'longo', padraoT: 'listras', escala: 0.62, hx: 150, hy: 68, pescoco: 16 }],
  ['Galimimo', '#E2CFF4', 'bipede', { cor: '#D9A066', cabeca: 'bico', bracos: 'longo', hx: 160, hy: 34, pescoco: 12 }],
  ['Oviraptor', '#FFE5A0', 'bipede', { cor: '#3FA7A8', cabeca: 'bico', topo: 'ovi', crista: '#F28C28', costas: 'penas', bracos: 'asas', claro: '#BFE6E6', hx: 150, hy: 64, pescoco: 16 }],
  ['Terizinossauro', '#DCEBC3', 'bipede', { cor: '#6D8B74', cabeca: 'bico', bracos: 'garras', costas: 'penas', claro: '#C9D9CC', hx: 152, hy: 54, pescoco: 16 }],
  ['Coritossauro', '#FFDCC8', 'bipede', { cor: '#5B7BD6', cabeca: 'pato', topo: 'leque', crista: '#F5B301', bracos: 'longo', hx: 148, hy: 66 }],
  ['Barionix', '#E6D4F2', 'bipede', { cor: '#8A9A3A', cabeca: 'fino', bracos: 'garras', comDentes: true, padraoT: 'manchas', hx: 140, hy: 66 }],
  ['Arqueoptérix', '#FAD2E1', 'bipede', { cor: '#2F6FB5', cabeca: 'bico', bracos: 'asas', costas: 'penas', claro: '#7FC8F8', escala: 0.8, hx: 148, hy: 66, pescoco: 16 }],
  ['Protoceratops', '#D6E6F5', 'quadrupede', { cor: '#D7B377', cabeca: 'ceratops', chifres: 'proto', crista: '#B98C4A', padraoT: 'manchas' }],
  ['Estiracossauro', '#FDE2A7', 'quadrupede', { cor: '#9C6ADE', cabeca: 'ceratops', chifres: 'estiraco', crista: '#6B3FB0' }],
  ['Dimetrodonte', '#CDEAC0', 'quadrupede', { cor: '#E07B39', cabeca: 'dentes', costas: 'vela', crista: '#FFC93C', padraoT: 'listras' }],
  ['Amargassauro', '#D7E3FC', 'pescocudo', { cor: '#C9A227', hx: 160, hy: 50, qx: 136, qy: 60, espinhos: true, crista: '#E63946' }],
  ['Quetzalcoatlo', '#FFF1B8', 'voador', { cor: '#E0A030', asa: '#F2C46D', crista: '#2E9E6B', tipo: 'quetzal' }],
  ['Plesiossauro', '#BEE9E8', 'marinho', { cor: '#3E8E9E', tipo: 'plesio' }],
  ['Mosassauro', '#C5E8F7', 'marinho', { cor: '#4A6FA5', tipo: 'mosa' }],
  ['Ictiossauro', '#D0F4DE', 'marinho', { cor: '#5FA3CF', tipo: 'ictio' }],
  ['Alossauro', '#FFCFB3', 'bipede', { cor: '#C9A04A', topo: 'chifrinho', crista: '#D9463A', comDentes: true, padraoT: 'listras', bracos: 'longo', hx: 146, hy: 64 }],
]

export const cartasDinossauros = () =>
  dinos.map(([nome, fundo, tipo, o]) => ({ nome, svg: carta(fundo, CORPOS[tipo](o)) }))
