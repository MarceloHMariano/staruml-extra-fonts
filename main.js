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

function loadFonts() {
  const dirs = fontDirs()

  for (const dir of dirs) {
    app.fontManager.loadFont(dir)
  }
}

function init() {
  app.on('app-ready', () => {
    loadFonts()
  })
}

exports.init = init
