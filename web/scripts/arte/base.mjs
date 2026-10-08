// Primitivas de desenho compartilhadas por todos os temas.
// Toda carta é um SVG 200x200; o nome da carta é renderizado pelo app, não pelo SVG.

export const TINTA = '#2A1F45'

export const c = (cx, cy, r, fill, extra = '') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`

export const e = (cx, cy, rx, ry, fill, extra = '') =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`

export const p = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`

export const r = (x, y, w, h, fill, rx = 0, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`

// linha (traço sem preenchimento)
export const l = (d, stroke = TINTA, w = 4, extra = '') =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`

export const g = (s, attrs = '') => `<g ${attrs}>${s}</g>`

// espelha em torno do eixo vertical central
export const esp = (s) => `<g transform="translate(200 0) scale(-1 1)">${s}</g>`

// desenha o lado esquerdo e o reflexo dele
export const sim = (s) => s + esp(s)

export const rot = (s, ang, cx, cy) => `<g transform="rotate(${ang} ${cx} ${cy})">${s}</g>`

// escala em torno de um ponto
export const esc = (s, k, cx, cy) =>
  `<g transform="translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})">${s}</g>`

export const mover = (s, dx, dy) => `<g transform="translate(${dx} ${dy})">${s}</g>`

// recorta `conteudo` pela forma `forma` (string SVG)
let seq = 0
export const recorte = (forma, conteudo) => {
  const id = `r${seq++}`
  return `<clipPath id="${id}">${forma}</clipPath><g clip-path="url(#${id})">${conteudo}</g>`
}

// estrela de `pontas` pontas, com a primeira apontando para cima
export const estrela = (cx, cy, R, fill, pontas = 5, miolo = 0.4) => {
  const pts = []
  for (let i = 0; i < pontas * 2; i++) {
    const a = (Math.PI * i) / pontas - Math.PI / 2
    const raio = i % 2 ? R * miolo : R
    pts.push(`${(cx + raio * Math.cos(a)).toFixed(1)} ${(cy + raio * Math.sin(a)).toFixed(1)}`)
  }
  return p(`M${pts.join(' L')} Z`, fill)
}

export const carta = (fundo, conteudo) => {
  seq = 0
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<rect width="200" height="200" fill="${fundo}"/>` +
    c(100, 112, 90, '#fff', 'opacity=".25"') +
    conteudo +
    `</svg>`
  )
}

// clareia (k > 0) ou escurece (k < 0) uma cor hex
export const tom = (hex, k) => {
  const n = parseInt(hex.slice(1), 16)
  const alvo = k > 0 ? 255 : 0
  const f = Math.abs(k)
  const ch = (v) => Math.round(v + (alvo - v) * f)
  const [R, G, B] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(ch)
  return '#' + ((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)
}

export const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
