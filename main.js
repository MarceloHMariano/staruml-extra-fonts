const path = require('path')
const fs = require('fs')

function fontDirs() {
  const fontPath = path.join(__dirname, 'fonts')
  const files = fs.readdirSync(fontPath, 'utf8')

  const dirs = []

  for (const file of files) {
    const fullPath = path.join(fontPath, file)
    const stat = fs.statSync(fullPath)

    if (!stat.isDirectory())
      continue

    dirs.push(fullPath)
  }

  return dirs
}

function addFontsToStyleEditor() {
  const $fontSelect = app.styleEditor.$view.find('label.font-face > select')
  const fonts = Object.keys(app.fontManager.fonts).sort().map(font => font)

  for (font of fonts) {
    const $fontOption = `option[value='${font}']`
    if ($fontSelect.find($fontOption).length > 0)
      continue

    const fontOptionHtml = `<option value='${font}'>${font}</option>`
    $fontSelect.append(fontOptionHtml)
    console.log(fontOptionHtml)
  }
}

function loadFonts() {
  const dirs = fontDirs()

  for (const dir of dirs) {
    app.fontManager.loadFont(dir)
  }

  addFontsToStyleEditor()
}

function init() {
  app.on('app-ready', () => {
    loadFonts()
  })
}

exports.init = init
