const styles = require('./Resources/Private/JavaScript/styleConstants');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-import')(),
        require('cssnano')({
            discardComments: { removeAll: true },
        }),
        require('postcss-css-variables')({
            variables: Object.assign(styles.styles)
        }),
        require('postcss-nested')(),
        require('postcss-hexrgba')()
    ]
}