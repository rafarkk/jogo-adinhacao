import { TINTA, c, e, p, r, l, g, esp, sim, rot, esc, mover, recorte, carta, tom } from './base.mjs'

const ROSA = '#F4A7B0'
const BRANCO = '#FFFFFF'
const MARFIM = '#F6EBD6'

// ---------- mamíferos (rosto de frente) ----------

const CABECAS = {
  redonda: () => e(100, 110, 58, 54, '#000'),
  larga: () => e(100, 112, 68, 52, '#000'),
  quadrada: () => r(42, 56, 116, 114, '#000', 44),
  longa: () =>
    p('M100 40 C142 40 148 82 138 122 C134 152 124 178 100 178 C76 178 66 152 62 122 C52 82 58 40 100 40 Z', '#000'),
}

const ORELHAS = {
  redonda: (cor, d) => sim(c(52, 64, 22, cor) + c(52, 64, 12, d)),
  redondaG: (cor, d) => sim(c(40, 70, 30, cor) + c(40, 70, 18, d)),
  pequena: (cor, d) => sim(c(56, 62, 13, cor) + c(56, 62, 6, d)),
  pontuda: (cor, d) => sim(p('M44 94 L46 26 L96 62 Z', cor) + p('M54 78 L55 44 L80 62 Z', d)),
  caida: (cor) => sim(rot(e(42, 112, 19, 40, cor), 12, 42, 80)),
  longa: (cor, d) => sim(rot(e(74, 40, 15, 42, cor) + e(74, 44, 7, 28, d), -12, 74, 80)),
  lateral: (cor, d) => sim(rot(e(36, 80, 28, 13, cor) + e(36, 80, 17, 6, d), 20, 60, 80)),
  grande: (cor, d) => sim(e(30, 108, 34, 50, cor) + e(34, 108, 21, 36, d)),
  // para cabeça longa
  alta: (cor, d) => sim(p('M68 62 L62 10 L96 46 Z', cor) + p('M72 50 L69 26 L86 44 Z', d)),
  altaLonga: (cor, d) => sim(rot(e(74, 30, 13, 36, cor) + e(74, 32, 6, 24, d), -14, 74, 60)),
  lateralAlta: (cor, d) => sim(rot(e(44, 60, 24, 11, cor) + e(44, 60, 14, 5, d), 24, 66, 60)),
}

const boquinha = (y = 138) =>
  l(`M100 ${y - 8} V${y} M88 ${y} Q94 ${y + 8} 100 ${y} Q106 ${y + 8} 112 ${y}`, TINTA, 3)

const FOCINHOS = {
  curto: (cor2, nariz) => e(100, 134, 28, 21, cor2) + e(100, 124, 9, 6.5, nariz) + boquinha(138),
  largo: (cor2, nariz) => e(100, 142, 46, 27, cor2) + sim(e(84, 138, 5, 7, nariz)),
  porco: (cor2, nariz) => e(100, 132, 26, 19, cor2) + sim(e(91, 132, 4.5, 7, nariz)),
  longa: (cor2, nariz) => e(100, 154, 28, 23, cor2) + sim(e(90, 152, 4, 6, nariz)) + l('M90 168 Q100 173 110 168', TINTA, 3),
  nenhum: () => '',
}

const olhoPadrao = (x, y, raio = 6) => c(x, y, raio, TINTA) + c(x + 2, y - 2, raio / 3, BRANCO)
const olhoBranco = (x, y, raio = 9) => c(x, y, raio, BRANCO) + c(x, y, raio * 0.55, TINTA) + c(x + 1.5, y - 2, 1.6, BRANCO)

function mamifero(o) {
  const {
    cor,
    cor2 = BRANCO,
    cabeca = 'redonda',
    orelha = 'redonda',
    orelhaCor = cor,
    orelhaDentro = ROSA,
    focinho = cabeca === 'longa' ? 'longa' : 'curto',
    nariz = TINTA,
    olho = 'padrao',
    olhoY = cabeca === 'longa' ? 94 : 100,
    olhoDx = cabeca === 'longa' ? 26 : 24,
    olhoR,
    atras = '',
    marcas = '',
    meio = '',
    frente = '',
  } = o
  const forma = CABECAS[cabeca]()
  const fazOlho = olho === 'branco' ? olhoBranco : olhoPadrao
  const olhos = olho === 'nenhum' ? '' : fazOlho(100 - olhoDx, olhoY, olhoR) + fazOlho(100 + olhoDx, olhoY, olhoR)
  return (
    atras +
    (orelha === 'nenhuma' ? '' : ORELHAS[orelha](orelhaCor, orelhaDentro)) +
    forma.replace('#000', cor) +
    recorte(forma, marcas) +
    meio +
    FOCINHOS[focinho](cor2, nariz) +
    olhos +
    frente
  )
}

const bigodes = (cor = TINTA) =>
  sim(l('M70 132 L40 126 M70 138 L40 142', cor, 2))

const chifres = (cor, d = 'M62 66 Q40 56 44 26 Q58 44 76 56 Z') => sim(p(d, cor))

// ---------- aves (rosto de frente) ----------

const BICOS = {
  curto: (cor) => p('M87 110 L113 110 L100 132 Z', cor) + l('M90 116 H110', tom(cor, -0.25), 2),
  mini: (cor) => p('M92 112 L108 112 L100 124 Z', cor),
  curvo: (cor) =>
    p('M82 106 Q100 96 118 106 Q116 130 100 144 Q96 126 82 106 Z', cor) + sim(c(93, 110, 2, tom(cor, -0.4))),
  pato: (cor) =>
    e(100, 128, 32, 15, cor) + l('M72 129 Q100 138 128 129', tom(cor, -0.25), 2.5) + sim(e(93, 121, 2, 3, tom(cor, -0.4))),
  tucano: () =>
    p('M76 106 Q100 94 124 106 Q128 160 100 188 Q72 160 76 106 Z', '#FF9F1C') +
    p('M82 150 Q100 168 118 150 Q112 172 100 188 Q88 172 82 150 Z', '#1E1E28') +
    p('M78 110 Q100 100 122 110 L121 122 Q100 112 79 122 Z', '#FFD23F') +
    l('M100 112 V180', '#E07B00', 2),
}

function ave(o) {
  const {
    cor,
    corpo = cor,
    cor2,
    bico = 'curto',
    bicoCor = '#F5A623',
    olho = 'branco',
    olhoCor = TINTA,
    k = 1,
    cy = 104,
    pescoco = false,
    atras = '',
    marcas = '',
    antesBico = '',
    frente = '',
  } = o
  const forma = c(100, 104, 56, '#000')
  const olhos =
    olho === 'branco'
      ? sim(c(78, 96, 11, BRANCO) + c(79, 97, 6, olhoCor) + c(81, 95, 2, BRANCO))
      : sim(c(78, 96, 6, olhoCor) + c(80, 94, 2, BRANCO))
  const cabeca =
    forma.replace('#000', cor) +
    recorte(forma, (cor2 ? e(100, 124, 40, 36, cor2) : '') + marcas) +
    antesBico +
    BICOS[bico](bicoCor) +
    olhos
  return (
    atras +
    e(100, 204, 70, 46, corpo) +
    (pescoco ? r(82, 100, 36, 90, cor, 16) : '') +
    mover(esc(cabeca, k, 100, 104), 0, cy - 104) +
    frente
  )
}

const cristaGalo = (k = 1) =>
  esc(c(84, 50, 12, '#E63946') + c(100, 42, 15, '#E63946') + c(116, 50, 12, '#E63946') + r(80, 48, 40, 14, '#E63946'), k, 100, 56)
const barbela = (k = 1) => esc(sim(e(93, 140, 8, 14, '#E63946')), k, 100, 128)

// ---------- cartas ----------

const selvagens = [
  ['Leão', '#FFD58A', () =>
    mamifero({
      cor: '#F2B544', cor2: '#FBE9C4', nariz: '#7A4A21',
      atras:
        c(100, 108, 84, '#B5651D') +
        [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
          .map((a) => rot(c(100, 24, 17, '#C97A2B'), a, 100, 108))
          .join(''),
    })],
  ['Tigre', '#BFE3C0', () =>
    mamifero({
      cor: '#F28C28', cor2: BRANCO, nariz: '#E86A8A', orelhaDentro: BRANCO,
      marcas:
        p('M100 52 L93 80 H107 Z', TINTA) + sim(p('M80 56 L80 78 L89 74 Z', TINTA)) +
        sim(p('M38 96 L66 104 L38 110 Z', TINTA) + p('M42 124 L66 124 L46 136 Z', TINTA)) +
        sim(e(64, 138, 26, 22, BRANCO)),
      frente: bigodes(),
    })],
  ['Onça', '#C9E8B5', () =>
    mamifero({
      cor: '#F5C25B', cor2: '#FFF4D9', nariz: '#C2566B',
      marcas: [[70, 70], [100, 62], [130, 70], [52, 96], [148, 96], [56, 128], [144, 128], [84, 80], [116, 80], [64, 150], [136, 150]]
        .map(([x, y]) => c(x, y, 7, '#8B5A2B') + c(x, y, 7, 'none', `stroke="${TINTA}" stroke-width="3" stroke-dasharray="9 5"`))
        .join(''),
      frente: bigodes(),
    })],
  ['Elefante', '#BFE0F2', () =>
    mamifero({
      cor: '#9AA7B8', orelha: 'grande', orelhaDentro: '#E3B7C2', focinho: 'nenhum', olhoY: 96,
      frente:
        sim(p('M76 128 Q66 158 82 166 Q84 146 88 128 Z', MARFIM)) +
        l('M100 116 Q96 164 114 180', '#8794A6', 26) +
        l('M90 136 H108 M91 150 H109 M96 164 H114', '#75829A', 2.5),
    })],
  ['Girafa', '#BFE6E0', () =>
    mamifero({
      cor: '#F6C453', cor2: '#F9E6BE', cabeca: 'longa', orelha: 'lateralAlta', nariz: '#8B5A2B',
      atras: sim(r(80, 12, 9, 34, '#F6C453', 4) + c(84.5, 12, 8, '#8B5A2B')),
      marcas: [[74, 60, 12], [124, 58, 13], [100, 76, 9], [66, 118, 11], [136, 116, 10], [100, 124, 8]]
        .map(([x, y, s]) => r(x - s, y - s, s * 2, s * 2, '#C07A2C', 6))
        .join(''),
    })],
  ['Zebra', '#FFD0A8', () =>
    mamifero({
      cor: BRANCO, cor2: '#3A3A4A', cabeca: 'longa', orelha: 'alta', orelhaDentro: '#3A3A4A', nariz: '#8C8C99',
      atras: p('M90 60 Q88 6 100 4 Q112 6 110 60 Z', TINTA),
      marcas:
        p('M100 40 L92 74 H108 Z', TINTA) +
        sim(p('M56 58 L84 66 L58 72 Z', TINTA) + p('M52 106 L82 112 L56 122 Z', TINTA) + p('M58 132 L84 132 L64 144 Z', TINTA)),
    })],
  ['Hipopótamo', '#BFE3F5', () =>
    mamifero({
      cor: '#A58CB8', cor2: '#CDB6DA', cabeca: 'larga', orelha: 'pequena', focinho: 'largo', nariz: '#6B5480', olhoY: 90,
      frente: sim(r(78, 160, 10, 12, BRANCO, 2)) + l('M70 158 Q100 166 130 158', '#6B5480', 3),
    })],
  ['Rinoceronte', '#F3DFA8', () =>
    mamifero({
      cor: '#8E9AA6', cabeca: 'larga', orelha: 'pequena', orelhaDentro: '#C9A6AE', focinho: 'nenhum', olhoY: 96, olhoDx: 34,
      frente:
        p('M100 78 L82 148 H118 Z', MARFIM) + p('M100 54 L90 86 H110 Z', '#E7D8BC') +
        sim(e(84, 152, 4, 5, '#5F6B78')) + l('M82 162 Q100 168 118 162', '#5F6B78', 3),
    })],
  ['Macaco', '#FFE08A', () =>
    mamifero({
      cor: '#8B5A2B', orelha: 'redondaG', orelhaDentro: '#F3C9A0', focinho: 'nenhum', olhoY: 100, olhoDx: 18,
      marcas: sim(e(82, 100, 24, 26, '#F3C9A0')) + e(100, 136, 38, 28, '#F3C9A0'),
      frente: sim(e(95, 124, 2.5, 3.5, '#8B5A2B')) + l('M82 138 Q100 154 118 138', TINTA, 3.5),
    })],
  ['Gorila', '#C8E6C9', () =>
    mamifero({
      cor: '#3D3D4A', orelha: 'pequena', orelhaDentro: '#6B6B7A', focinho: 'nenhum', olho: 'branco', olhoR: 7, olhoDx: 18,
      atras: e(100, 62, 40, 40, '#3D3D4A'),
      marcas: sim(e(82, 102, 22, 20, '#77778A')) + e(100, 136, 36, 26, '#77778A') + r(56, 80, 88, 12, '#2B2B36', 6),
      frente: sim(e(92, 126, 5, 6, '#2B2B36')) + l('M84 146 H116', '#2B2B36', 3.5),
    })],
  ['Urso', '#D5ECC2', () =>
    mamifero({ cor: '#8B5E3C', cor2: '#DDBB95', orelhaDentro: '#DDBB95' })],
  ['Panda', '#CDEBC5', () =>
    mamifero({
      cor: BRANCO, cor2: BRANCO, orelhaCor: '#2B2B36', orelhaDentro: '#2B2B36', olho: 'branco', olhoR: 6,
      marcas: sim(rot(e(76, 100, 16, 21, '#2B2B36'), 20, 76, 100)),
    })],
  ['Coala', '#D7F0E3', () =>
    mamifero({
      cor: '#A9B0BA', orelha: 'redondaG', orelhaDentro: '#EEF1F5', focinho: 'nenhum', olhoY: 98, olhoDx: 28,
      frente: e(100, 120, 14, 20, '#3A3A45') + l('M90 148 Q100 154 110 148', TINTA, 3),
    })],
  ['Lobo', '#C9D6F0', () =>
    mamifero({
      cor: '#7D8794', cor2: '#F2F4F7', orelha: 'pontuda', orelhaDentro: '#F2F4F7',
      atras: sim(p('M46 108 L18 138 L54 146 Z', '#7D8794')),
      marcas: sim(e(62, 144, 30, 30, '#F2F4F7')) + p('M100 60 L90 96 H110 Z', '#5F6874'),
      frente: sim(l('M66 86 L88 92', TINTA, 3.5)),
    })],
  ['Raposa', '#CFEBD2', () =>
    mamifero({
      cor: '#F2702F', cor2: BRANCO, orelha: 'pontuda', orelhaDentro: '#3A2A2A',
      atras: sim(p('M46 108 L16 134 L54 148 Z', '#F2702F')),
      marcas: sim(e(58, 146, 36, 34, BRANCO)),
    })],
  ['Guaxinim', '#F5E1B8', () =>
    mamifero({
      cor: '#A3A3AE', cor2: BRANCO, olho: 'branco', olhoR: 7, orelhaDentro: BRANCO,
      marcas: sim(rot(e(72, 102, 30, 17, '#3A3A45'), -12, 72, 102)) + p('M100 56 L92 88 H108 Z', '#3A3A45'),
    })],
  ['Cervo', '#CDE8B5', () =>
    mamifero({
      cor: '#C68642', cor2: '#F7E5C4', orelha: 'lateral', orelhaDentro: '#F7E5C4',
      atras: sim(l('M80 62 Q66 40 60 12 M70 40 L48 30 M64 26 L78 8', '#8B5A2B', 7)),
      marcas: [[78, 72], [100, 66], [122, 72]].map(([x, y]) => c(x, y, 4, BRANCO)).join(''),
    })],
  ['Javali', '#E6D3B3', () =>
    mamifero({
      cor: '#6B4A3A', cor2: '#C98B7A', cabeca: 'larga', orelha: 'pontuda', orelhaDentro: '#8E6A58', focinho: 'porco', nariz: '#5A3A2E',
      atras: p('M84 70 L90 30 L96 60 L100 26 L104 60 L110 30 L116 70 Z', '#3A2A22'),
      frente: sim(p('M66 156 Q56 140 64 122 Q72 140 80 152 Z', MARFIM)),
    })],
  ['Camelo', '#FCE2A6', () =>
    mamifero({
      cor: '#D9A866', cor2: '#EFD3A4', cabeca: 'longa', orelha: 'lateralAlta', orelhaDentro: '#B98848', nariz: '#8B6A3A',
      atras: p('M82 52 Q84 22 100 20 Q116 22 118 52 Z', '#B98848'),
      frente: sim(p('M64 94 A10 10 0 0 1 84 94 Z', '#D9A866') + l('M64 94 H84', '#8B6A3A', 2.5)),
    })],
  ['Canguru', '#FAD7B0', () =>
    mamifero({ cor: '#C98A4B', cor2: '#F7E3CB', orelha: 'longa', orelhaDentro: '#F2C4B0', nariz: '#4A3326' })],
  ['Capivara', '#BFE5D0', () =>
    mamifero({
      cor: '#A9713F', cabeca: 'quadrada', orelha: 'pequena', orelhaDentro: '#7A4E28', focinho: 'nenhum', olhoY: 92, olhoDx: 36,
      frente: r(76, 112, 48, 26, '#3F2A1A', 13) + l('M100 138 V150 M86 152 Q100 160 114 152', '#3F2A1A', 3.5),
    })],
  ['Preguiça', '#D8EFC6', () =>
    mamifero({
      cor: '#B79A78', orelha: 'nenhuma', focinho: 'nenhum', olhoY: 104, olhoDx: 22, olhoR: 5,
      marcas: e(100, 114, 46, 42, '#F3E7D2') + sim(rot(e(74, 106, 22, 10, '#6B4F3A'), -24, 74, 106)),
      frente: e(100, 122, 9, 6, '#3F2A1A') + l('M84 136 Q100 150 116 136', TINTA, 3),
    })],
  ['Crocodilo', '#FBE7A1', () =>
    sim(p('M64 130 l-9 8 9 6 -9 8 9 6 -9 8 9 6 -9 8 9 6 Z', BRANCO)) +
    r(64, 70, 72, 122, '#5DAA52', 32) + e(100, 82, 48, 38, '#5DAA52') +
    sim(c(70, 54, 18, '#5DAA52') + c(70, 54, 11, '#FFE156') + e(70, 54, 3, 9, TINTA)) +
    sim(e(90, 172, 4, 6, '#2F6B2A')) +
    [96, 116, 136].map((y) => sim(c(84, y, 4, '#3F8A3A'))).join('') + c(100, 106, 4, '#3F8A3A') + c(100, 126, 4, '#3F8A3A')],
  ['Cobra', '#FFD9B0', () =>
    e(100, 172, 76, 22, '#3F9B4B') + e(100, 150, 56, 19, '#57B560') +
    l('M100 148 Q62 112 100 78', '#57B560', 30) +
    l('M104 54 V26 M104 26 L96 16 M104 26 L112 16', '#E63946', 3.5) +
    e(102, 70, 36, 27, '#57B560') +
    sim(c(86, 64, 8, '#FFE156') + e(86, 64, 2.5, 6.5, TINTA)) +
    sim(c(96, 80, 1.8, '#2F6B2A')) +
    [[58, 172], [100, 176], [142, 172], [76, 150], [124, 150]].map(([x, y]) => rot(r(x - 7, y - 7, 14, 14, '#F2C94C'), 45, x, y)).join('')],
  ['Sapo', '#BDE3F2', () =>
    sim(c(62, 72, 26, '#6CC24A')) + e(100, 124, 72, 54, '#6CC24A') + e(100, 170, 46, 20, '#C8EBA6') +
    sim(c(62, 72, 16, BRANCO) + c(63, 73, 8, TINTA) + c(66, 70, 2.5, BRANCO)) +
    sim(c(93, 106, 2.5, '#2F6B2A')) + l('M48 126 Q100 164 152 126', TINTA, 4) +
    sim(c(50, 142, 8, '#F4A7B0', 'opacity=".7"'))],
  ['Águia', '#A9D4F5', () =>
    ave({
      cor: BRANCO, corpo: '#6B4226', bico: 'curvo', bicoCor: '#F5B301', olhoCor: '#8A5A00',
      atras: sim(p('M46 150 L14 196 H70 Z', '#6B4226')),
      frente: sim(l('M62 82 L92 92', '#6B4226', 5)),
    })],
  ['Coruja', '#C7C3F0', () =>
    ave({
      cor: '#8B5E3C', bico: 'mini', bicoCor: '#F5A623', olho: 'nenhum',
      atras: sim(p('M52 76 L46 28 L88 58 Z', '#8B5E3C')),
      marcas: sim(c(76, 100, 28, '#F3DCC0')) + [[86, 150], [100, 156], [114, 150]].map(([x, y]) => l(`M${x - 5} ${y} Q${x} ${y + 6} ${x + 5} ${y}`, '#6B4226', 2.5)).join(''),
      frente: sim(c(76, 100, 16, '#FFD23F') + c(76, 100, 8, TINTA) + c(79, 97, 2.5, BRANCO)),
    })],
  ['Tucano', '#BFEBCB', () =>
    ave({
      cor: '#1E1E28', cor2: BRANCO, bico: 'tucano', olho: 'padrao', olhoCor: TINTA,
      marcas: sim(c(78, 96, 13, '#4DB6E8')),
    })],
  ['Pinguim', '#C5E8F7', () =>
    ave({
      cor: '#2B2D42', bico: 'curto', bicoCor: '#F5A623', olho: 'padrao',
      marcas: sim(e(80, 104, 26, 32, BRANCO)) + e(100, 142, 38, 30, BRANCO) + sim(c(62, 122, 7, ROSA, 'opacity=".8"')),
      frente: e(100, 200, 40, 36, BRANCO),
    })],
  ['Morcego', '#D9C9F2', () =>
    mamifero({
      cor: '#5B4B6B', cor2: '#7A6890', orelha: 'pontuda', orelhaDentro: '#C7A3C9', nariz: '#E3A0B5', olho: 'branco', olhoR: 8,
      atras: sim(p('M58 104 Q14 60 2 122 Q16 112 22 136 Q34 122 42 146 Q52 132 62 144 Z', '#463956')),
      frente: sim(p('M90 142 L94 152 L98 142 Z', BRANCO)),
    })],
]

const domesticos = [
  ['Cachorro', '#FFE1A8', () =>
    mamifero({
      cor: '#D9A066', cor2: '#F9EAD3', orelha: 'caida', orelhaCor: '#8B5A2B',
      marcas: e(124, 96, 22, 24, '#8B5A2B'),
      frente: p('M92 142 H108 V152 Q100 162 92 152 Z', '#F06B84'),
    })],
  ['Gato', '#CFE3F7', () =>
    mamifero({
      cor: '#9AA1AC', cor2: BRANCO, orelha: 'pontuda', nariz: '#F06B84',
      marcas: p('M100 56 L95 78 H105 Z', '#5F6874') + sim(p('M82 58 L82 76 L89 73 Z', '#5F6874')),
      frente: bigodes(),
    })],
  ['Coelho', '#F7CFE0', () =>
    mamifero({
      cor: '#F7F3EE', cor2: BRANCO, orelha: 'longa', nariz: '#F06B84',
      frente: r(94, 142, 12, 11, BRANCO, 2, `stroke="${TINTA}" stroke-width="2"`) + l('M100 142 V153', TINTA, 1.5) + sim(c(62, 128, 8, ROSA, 'opacity=".7"')),
    })],
  ['Hamster', '#FDE9A9', () =>
    mamifero({
      cor: '#F2B46D', cor2: BRANCO, cabeca: 'larga', orelha: 'pequena', nariz: '#F06B84',
      marcas: sim(e(58, 140, 36, 30, BRANCO)) + p('M100 60 L90 92 H110 Z', BRANCO),
      frente: sim(c(52, 132, 7, ROSA, 'opacity=".8"')),
    })],
  ['Porquinho-da-índia', '#D4EDC9', () =>
    mamifero({
      cor: BRANCO, cabeca: 'larga', orelha: 'caida', orelhaCor: '#C9A27E', focinho: 'nenhum', olhoY: 100, olhoDx: 30,
      marcas: p('M20 40 H96 L84 130 H20 Z', '#D98B3A') + p('M118 40 H190 V104 L128 96 Z', '#3A2E2A'),
      frente: e(100, 124, 8, 6, '#F06B84') + boquinha(136) + p('M84 60 Q100 44 116 60 Q100 54 84 60 Z', '#D98B3A'),
    })],
  ['Camundongo', '#E3D9F5', () =>
    mamifero({
      cor: '#B9BEC8', cor2: '#DDE1E8', orelha: 'redondaG', nariz: '#F06B84',
      frente: bigodes('#6B7280') + r(96, 144, 8, 8, BRANCO, 1, `stroke="${TINTA}" stroke-width="1.5"`),
    })],
  ['Furão', '#F9D9B8', () =>
    mamifero({
      cor: '#F3E6D0', cor2: BRANCO, orelha: 'pequena', nariz: '#F06B84', olho: 'branco', olhoR: 6,
      atras: e(100, 196, 44, 60, '#8B6A4E'),
      marcas: sim(rot(e(74, 102, 26, 16, '#6B4A32'), -14, 74, 102)) + e(100, 50, 44, 20, '#8B6A4E'),
    })],
  ['Chinchila', '#D6E4F5', () =>
    mamifero({
      cor: '#9AA3B8', cor2: BRANCO, cabeca: 'larga', orelha: 'redondaG', orelhaCor: '#C5CAD8', orelhaDentro: '#E8C7CF', olhoR: 8,
      atras: [0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((a) => rot(c(100, 52, 20, '#9AA3B8'), a, 100, 116)).join(''),
      marcas: e(100, 160, 50, 30, BRANCO),
      frente: bigodes('#5F6878'),
    })],
  ['Cavalo', '#CDE9BD', () =>
    mamifero({
      cor: '#A0522D', cor2: '#6E3519', cabeca: 'longa', orelha: 'alta', orelhaDentro: '#6E3519', nariz: '#3A1D0E',
      marcas: p('M100 40 Q88 90 96 140 H104 Q112 90 100 40 Z', BRANCO),
      frente: p('M78 46 Q100 26 122 46 Q112 72 104 78 Q100 58 92 80 Q84 66 78 46 Z', '#3A2418'),
    })],
  ['Burro', '#F5E3B5', () =>
    mamifero({
      cor: '#8E8E99', cor2: '#F2F2F2', cabeca: 'longa', orelha: 'altaLonga', orelhaDentro: '#D9B8B8', nariz: '#4A4A55', olho: 'branco', olhoR: 8,
      frente: p('M86 50 Q100 30 114 50 Q100 60 86 50 Z', '#4A4A55'),
    })],
  ['Vaca', '#BFE5F5', () =>
    mamifero({
      cor: BRANCO, cor2: '#F7B6C2', orelha: 'lateral', focinho: 'largo', nariz: '#C96A80', olho: 'branco', olhoR: 7,
      atras: chifres(MARFIM, 'M70 64 Q58 50 62 34 Q72 44 84 56 Z'),
      marcas: p('M30 40 H92 L80 112 H30 Z', '#2B2B36') + c(140, 124, 18, '#2B2B36'),
    })],
  ['Touro', '#FFC9B5', () =>
    mamifero({
      cor: '#6B4226', cor2: '#E8CDA8', cabeca: 'larga', orelha: 'lateral', orelhaDentro: '#4A2D18', focinho: 'largo', nariz: '#3A2418',
      atras: chifres(MARFIM, 'M56 70 Q20 62 26 22 Q44 48 72 54 Z'),
      frente: sim(l('M62 84 L90 92', '#2B1A0E', 5)) + c(100, 160, 11, 'none', 'stroke="#F5B301" stroke-width="4"'),
    })],
  ['Búfalo', '#D9E5C0', () =>
    mamifero({
      cor: '#3E3E48', cor2: '#6B6B78', cabeca: 'larga', orelha: 'lateral', orelhaDentro: '#2B2B33', focinho: 'largo', nariz: '#22222A', olho: 'branco', olhoR: 7,
      atras: sim(l('M70 70 Q30 78 14 50 Q10 34 22 22', '#8B8B95', 14)),
      frente: p('M80 64 Q100 46 120 64 Q100 74 80 64 Z', '#22222A'),
    })],
  ['Porco', '#D2F0D5', () =>
    mamifero({
      cor: '#F7A8B8', cor2: '#F58BA3', cabeca: 'larga', orelha: 'nenhuma', focinho: 'porco', nariz: '#B8526B', olhoY: 98,
      atras: sim(p('M40 96 L36 42 L88 66 Z', '#F58BA3')),
      frente: l('M88 158 Q100 166 112 158', '#B8526B', 3) + sim(c(54, 128, 9, '#F58BA3', 'opacity=".8"')),
    })],
  ['Ovelha', '#C5E8D9', () =>
    mamifero({
      cor: '#3F3F4A', cor2: '#3F3F4A', orelha: 'lateral', orelhaCor: '#3F3F4A', orelhaDentro: '#6B6B78', nariz: '#F4A7B0', olho: 'branco', olhoR: 7,
      atras: [0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => rot(c(100, 38, 26, '#FBF7F0'), a, 100, 108)).join('') + c(100, 108, 66, '#FBF7F0'),
      frente: c(82, 58, 16, '#FBF7F0') + c(100, 52, 18, '#FBF7F0') + c(118, 58, 16, '#FBF7F0'),
    })],
  ['Cabra', '#F2E2C2', () =>
    mamifero({
      cor: '#EFE6DA', cor2: '#F9F5EF', orelha: 'lateral', nariz: '#C98B95', olho: 'nenhum',
      atras: sim(l('M78 62 Q64 30 40 26', '#8B7355', 11)) + p('M88 160 H112 L100 196 Z', '#D8CBB8'),
      frente: sim(e(76, 100, 9, 7, '#F5C518') + r(70, 98, 12, 4, TINTA, 2)),
    })],
  ['Lhama', '#F8C8D8', () =>
    mamifero({
      cor: '#F3E9DC', cor2: BRANCO, cabeca: 'longa', orelha: 'alta', orelhaDentro: '#E6B8B8', nariz: '#8B6A5A',
      frente:
        c(84, 48, 14, '#FBF6EE') + c(100, 42, 16, '#FBF6EE') + c(116, 48, 14, '#FBF6EE') +
        sim(r(95, 168, 5, 8, BRANCO, 1, `stroke="${TINTA}" stroke-width="1.2"`)),
    })],
  ['Galinha', '#FBE3A1', () =>
    ave({ cor: BRANCO, bico: 'curto', bicoCor: '#F5A623', atras: cristaGalo(0.7), antesBico: barbela(0.7) })],
  ['Galo', '#BFE1F7', () =>
    ave({
      cor: '#C4501E', corpo: '#8B2E12', bico: 'curto', bicoCor: '#F5B301',
      atras:
        l('M150 190 Q196 150 172 96', '#1F7A5C', 12) + l('M160 196 Q206 176 196 124', '#2456A6', 12) +
        cristaGalo(1.25),
      antesBico: barbela(1.3),
      marcas: e(100, 164, 60, 22, '#F2A93B'),
    })],
  ['Pintinho', '#C9EDC2', () =>
    ave({
      cor: '#FFDD4A', bico: 'mini', bicoCor: '#F08A24', olho: 'padrao', k: 0.92,
      atras: l('M100 54 Q92 34 84 38 M100 54 Q100 30 104 28 M100 54 Q110 36 118 40', '#F5C518', 5),
      marcas: sim(c(62, 118, 9, '#F7A05A', 'opacity=".7"')),
    })],
  ['Pato', '#FCE1B8', () =>
    ave({
      cor: '#1F7A5C', corpo: '#8B6A4E', bico: 'pato', bicoCor: '#F5C518', olho: 'padrao', olhoCor: TINTA,
      marcas: r(40, 148, 120, 10, BRANCO),
    })],
  ['Ganso', '#C5E3F5', () =>
    ave({
      cor: BRANCO, bico: 'pato', bicoCor: '#F28C28', k: 0.72, cy: 74, pescoco: true, olho: 'padrao',
      frente: c(100, 76, 8, '#F28C28'),
    })],
  ['Peru', '#E5D5F5', () =>
    ave({
      cor: '#7FB2DD', corpo: '#5A3A28', bico: 'mini', bicoCor: '#F5C518', k: 0.62, cy: 92, pescoco: true,
      atras:
        [-75, -50, -25, 0, 25, 50, 75]
          .map((a) => rot(e(100, 50, 20, 62, '#8B5A2B') + e(100, 2, 15, 12, '#F6EBD6') + e(100, 20, 16, 8, '#C4501E'), a, 100, 150))
          .join(''),
      frente: p('M100 96 Q112 104 106 128 Q98 120 96 100 Z', '#E63946') + e(100, 134, 8, 14, '#E63946'),
    })],
  ['Pombo', '#F5D9C4', () =>
    ave({
      cor: '#9AA5B1', bico: 'mini', bicoCor: '#4A4A55', olhoCor: '#F28C28',
      marcas: r(40, 138, 120, 12, '#3FA67A') + r(40, 150, 120, 12, '#8E6BBF'),
      frente: e(100, 110, 9, 4.5, BRANCO),
    })],
  ['Papagaio', '#FFD7A8', () =>
    ave({
      cor: '#2EAD4B', bico: 'curvo', bicoCor: '#4A4A55',
      marcas: e(100, 62, 34, 20, '#FFDD4A') + sim(c(78, 96, 16, BRANCO)),
      frente: sim(e(40, 190, 18, 26, '#E63946')),
    })],
  ['Periquito', '#F7C9DD', () =>
    ave({
      cor: '#FFE96B', corpo: '#3FC1C9', bico: 'curvo', bicoCor: '#E8D2A8', olho: 'padrao', k: 0.9,
      marcas:
        [56, 68, 80].map((y) => l(`M52 ${y} Q100 ${y - 14} 148 ${y}`, '#3A3A45', 2.5)).join('') +
        sim(c(78, 136, 5, '#4A3FB5') + c(92, 142, 4, TINTA)),
      frente: e(100, 104, 12, 5, '#4DB6E8'),
    })],
  ['Calopsita', '#CDEFE0', () =>
    ave({
      cor: '#FFE96B', corpo: '#B8BDC8', bico: 'curvo', bicoCor: '#9A9AA5', olho: 'padrao', k: 0.88,
      atras: [-18, 0, 18].map((a) => rot(e(100, 30, 7, 30, '#FFE96B'), a, 100, 70)).join(''),
      marcas: sim(c(62, 118, 13, '#F28C28')),
    })],
  ['Canário', '#C9DDF7', () =>
    ave({
      cor: '#FFC21A', bico: 'mini', bicoCor: '#F7A8B8', olho: 'padrao', k: 0.86, cy: 110,
      atras: sim(p('M52 150 L16 178 L60 190 Z', '#F2A200')),
      frente: l('M158 66 V34 L176 28 V58', TINTA, 4) + c(152, 66, 7, TINTA) + c(170, 58, 7, TINTA),
    })],
  ['Peixe-dourado', '#A9DDF5', () =>
    p('M132 104 L190 62 Q176 104 190 150 Z', '#F2702F') +
    p('M70 66 Q100 26 128 66 Z', '#F2702F') + p('M86 146 Q98 176 116 146 Z', '#F2702F') +
    e(92, 106, 62, 46, '#FF9F1C') +
    recorte(e(92, 106, 62, 46, '#000'), e(70, 130, 50, 26, '#FFD08A')) +
    [[100, 92], [122, 100], [104, 116], [126, 122]].map(([x, y]) => l(`M${x} ${y - 8} Q${x + 10} ${y} ${x} ${y + 8}`, '#E07B00', 2.5)).join('') +
    c(58, 94, 13, BRANCO) + c(56, 95, 7, TINTA) + c(54, 92, 2.5, BRANCO) +
    l('M36 116 Q44 122 52 116', TINTA, 3) +
    c(30, 60, 7, 'none', 'stroke="#fff" stroke-width="3"') + c(46, 36, 5, 'none', 'stroke="#fff" stroke-width="3"')],
  ['Tartaruga', '#FFE3B0', () =>
    sim(e(40, 170, 22, 14, '#8FCB6B')) +
    e(100, 78, 34, 32, '#8FCB6B') +
    sim(c(86, 72, 6, TINTA) + c(88, 70, 2, BRANCO)) + l('M90 90 Q100 98 110 90', TINTA, 3) +
    p('M24 170 Q24 96 100 96 Q176 96 176 170 Q100 190 24 170 Z', '#3F8A4A') +
    recorte(
      p('M24 170 Q24 96 100 96 Q176 96 176 170 Q100 190 24 170 Z', '#000'),
      p('M80 116 H120 L134 142 L120 168 H80 L66 142 Z', '#6DB56A') +
        l('M80 116 L64 96 M120 116 L136 96 M66 142 H24 M134 142 H176 M80 168 L66 190 M120 168 L134 190', '#2C6636', 4) +
        l('M80 116 H120 L134 142 L120 168 H80 L66 142 Z', '#2C6636', 4),
    )],
]

const montar = (lista) => lista.map(([nome, fundo, desenho]) => ({ nome, svg: carta(fundo, desenho()) }))

export const cartasSelvagens = () => montar(selvagens)
export const cartasDomesticos = () => montar(domesticos)
