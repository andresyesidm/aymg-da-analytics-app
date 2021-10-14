const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push(
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
        test: /\.(jpg|png|gif|jpeg|svg|ttf)$/,
        loader: "url-loader"
    });


module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.svg']
    },
};
