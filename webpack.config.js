const { join, resolve } = require('path')
const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV ?? 'dev')
}

Encore.setOutputPath('./public/assets')
Encore.setPublicPath('/assets')
Encore.addAliases({ '@': resolve(__dirname, 'resources', 'js') })

Encore.addEntry('app', './resources/js/App.tsx')
Encore.addStyleEntry('errors', './resources/css/errors.css')
Encore.enableReactPreset()
Encore.configureBabel(config => {
  config.plugins.push('@babel/plugin-transform-runtime')
})
Encore.enableBabelTypeScriptPreset()

Encore.splitEntryChunks()
Encore.disableSingleRuntimeChunk()

Encore.cleanupOutputBeforeBuild()

Encore.enableSourceMaps(!Encore.isProduction())
Encore.enableVersioning(Encore.isProduction())

Encore.enableEslintPlugin()

Encore.configureDevServerOptions(options => {
  if (!options.static) {
    options.static = []
  } else if (!Array.isArray(options.static)) {
    options.static = [options.static]
  }

  options.liveReload = true
  options.static.push({
    directory: join(__dirname, './resources'),
    watch: true,
  })
})

const config = Encore.getWebpackConfig()
config.infrastructureLogging = {
  level: 'warn',
}
config.stats = 'errors-warnings'

module.exports = config
