const path = require('path')

module.exports = {
  // set your styleguidist configuration here
  title: 'Sistema Campechano',
  // components: 'src/components/**/[A-Z]*.vue',
  // defaultExample: true,
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: 'expand',

  renderRootJsx: path.join(__dirname, 'config/styleguide.root.js')
}
