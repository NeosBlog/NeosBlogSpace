module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            discardComments: { removeAll: true },
        }),
        require('postcss-css-variables')({
            variables: {}
        }),
        require('postcss-import')(),
        require('postcss-nested')(),
        require('postcss-hexrgba')()
    ]
}