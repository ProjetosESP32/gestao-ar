const { join } = require('path')
const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV ?? 'dev')
}

Encore.setOutputPath('./public/assets')
Encore.setPublicPath('/assets')

Encore.addEntry('app', './resources/js/App.tsx')
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

/*
|--------------------------------------------------------------------------
| Configure dev server
|--------------------------------------------------------------------------
|
| Here we configure the dev server to enable live reloading for edge templates.
| Remember edge templates are not processed by Webpack and hence we need
| to watch them explicitly and livereload the browser.
|
*/
Encore.configureDevServerOptions(options => {
  /**
   * Normalize "options.static" property to an array
   */
  if (!options.static) {
    options.static = []
  } else if (!Array.isArray(options.static)) {
    options.static = [options.static]
  }

  /**
   * Enable live reload and add views directory
   */
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

/*
|--------------------------------------------------------------------------
| Export config
|--------------------------------------------------------------------------
|
| Export config for webpack to do its job
|
*/
module.exports = config
