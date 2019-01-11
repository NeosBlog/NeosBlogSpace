const styles = require('./Resources/Private/JavaScript/styleConstants');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            discardComments: { removeAll: true },
        }),
        require('postcss-css-variables')({
            variables: Object.assign(styles.styles)
        }),
        require('postcss-import')(),
        require('postcss-nested')(),
        require('postcss-hexrgba')()
    ]
}