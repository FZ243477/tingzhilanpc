'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080
module.exports = {
    lintOnSave: true,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    // productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '_api': resolve('src/api'),
                '_a': resolve('src/assets'),
                '_c': resolve('src/components'),
                '_utils': resolve('src/utils')
            }
        }
    }
}