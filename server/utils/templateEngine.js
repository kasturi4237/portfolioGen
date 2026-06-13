import minimal from '../templates/minimal.js'
import modern from '../templates/modern.js'
import creative from '../templates/creative.js'

const themes = { minimal, modern, creative }

export function generatePortfolio(data, theme = 'minimal') {
  const fn = themes[theme] || themes.minimal
  return fn(data)
}
