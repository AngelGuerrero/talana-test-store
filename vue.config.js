module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_PROD
      : process.env.VUE_APP_LOCAL
}
