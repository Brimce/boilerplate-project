/// <binding ProjectOpened='Watch - Development' />
const pathLib = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const mergeLib = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: pathLib.join(__dirname, 'app'),
  build: pathLib.join(__dirname, 'public', 'build')
};
console.log(PATHS.build);
process.env.BABEL_ENV = TARGET;

/*
compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
  htmlPluginData.html += 'The magic footer';
  callback();
});*/

const common = {
    entry: [
        //'webpack-hot-middleware/client',
        pathLib.join(PATHS.app,'client','index.jsx')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },
    module: {
        loaders: [
            //{
            //    test: /\.css$/,
            //    loaders: ['style', 'css'],
            //    include: PATHS.app
            //},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader")
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            } //,
            //{
            //    test: /\.jsx?$/,
            //    loaders: ['babel?cacheDirectory'],
            //    include: PATHS.app
            //}
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'indexTemplate.html',
            title: 'My app',
            appMountId: 'react-view',
            files : {
                css : [pathLib.join(PATHS.build,'bundle.css')]
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        }),
        new ExtractTextPlugin('[name].css')
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = mergeLib(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        })
        ]
    });
}

if (TARGET === 'build') {
    module.exports = mergeLib(common, {});
}
