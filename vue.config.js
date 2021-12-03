const path = require('path')


function resolve(dir) {
    return path.resolve(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [

                ]
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/assets/scss/var.scss";@import "@/assets/scss/mixin.scss";
                `
            }
        }
    }
}
