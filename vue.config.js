module.exports = {
  chainWebpack: config => {
    const path = require('path');
    // Aliases
    config.resolve.alias.set('~src', path.resolve(__dirname, 'src'));
    config.resolve.alias.set('~ui', path.resolve(__dirname, 'src/ui'));
    config.resolve.alias.set('~config', path.resolve(__dirname, 'src/config'));
    config.resolve.alias.set('~types', path.resolve(__dirname, 'src/types'));
    config.resolve.alias.set('~styles', path.resolve(__dirname, 'src/styles'));
    config.resolve.alias.set('~store', path.resolve(__dirname, 'src/store'));
    config.resolve.alias.set('~assets', path.resolve(__dirname, 'src/assets'));
  }
};