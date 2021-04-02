module.exports = {
  publicPath: '/',
  pwa: {
    manifestOptions: {
      workboxPluginMode: 'InjectManifest',
      background_color: '#261b40',
      display: 'standalone',
      name: 'bat-magic',
      short_name: 'BM',
      start_url: '.',
      themeColor: '#261b40'
    },
    workboxOptions: {
      runtimeCaching: [
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 11
          },
          urlPattern: 'data.json'
        }
      ]
    }
  }
}
