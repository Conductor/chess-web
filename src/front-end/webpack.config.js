const 	babel            		= require('babel-loader'),
		HtmlWebpackPlugin     	= require('html-webpack-plugin'),
		webpack               	= require('webpack'),
		path                  	= require('path'),
		WebpackNotifierPlugin 	= require('webpack-notifier'),
		ExtendedDefinePlugin	= require('extended-define-webpack-plugin'),
		CleanWebpackPlugin 		= require('clean-webpack-plugin'),
		ExtractTextPlugin 		= require('extract-text-webpack-plugin'),
		autoprefixer			= require('autoprefixer');

const BASE = process.env.BASE || '';
const DEBUG = process.env.NODE_ENV !== 'production';
const SCSS = [
	{
		loader: 'css-loader',
		options: {
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]__[local]___[hash:base64:5]',
			camelCase: true
		}
	},
	'postcss-loader',
	'sass-loader'
];
const MAIN_SCSS = ['css-loader', 'postcss-loader', 'sass-loader'];
const CSS = ['style-loader', 'css-loader', 'postcss-loader'];

const config = {
	dist     : __dirname + '/dist',
	src      : __dirname + '/src',
	app		 : __dirname + '/src/app'
};

let appEntries = [
	`${config.app}/index.tsx`
];

const webpackConfig = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', 'css']
    },
	entry  : {
		app: appEntries
	},
	output : {
		filename         : '[name].bundle-[hash:4].js',
		sourceMapFilename: '[name].bundle-[hash:4].map',
		publicPath		 : '/',
		path             : config.dist
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				enforce: 'pre',
				loader: 'tslint-loader'
			},
			{
				test   : /\.tsx?$/,
				use : DEBUG ? ['react-hot-loader/webpack', 'babel-loader', 'ts-loader'] : ['babel-loader', 'ts-loader'],
				exclude: /(node_modules)/
			},
			{
				test  : /\.html?$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/,
				use: DEBUG ? CSS : ExtractTextPlugin.extract({ use: ['css-loader'] })
			},
			{
				test: /\.scss$/,
				use: DEBUG ? [{loader: 'style-loader'}].concat(SCSS)
					: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: SCSS
				}),
				exclude: [
                    /(src\/app\/main\.scss)/
				]
			},
            {
                test: /(src\/app\/main\.scss)/,
                use: DEBUG ? [{loader: 'style-loader'}].concat(MAIN_SCSS)
                    : ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: MAIN_SCSS
                    })
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=favicon.ico'
            },
			{
				test: /\.(woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff'
					}
				}]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/octet-stream'
					}
				}]
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						hash: 'sha512',
						digest: 'hex',
						name: '[hash].[ext]'
					}
				}]
			}
		]
	},

	devtool: DEBUG ? 'source-map' : '',
	devServer: DEBUG ? {
        proxy: {"*": "http://localhost:8080", changeOrigin: true }} : {},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),

		new ExtendedDefinePlugin({
			__BASE__: BASE,
			__DEBUG__: DEBUG,
            __API__: process.env.API || 'dev'
		}),

		new HtmlWebpackPlugin({
			template: path.join(config.app, 'index.html')
		})
	]
};

if(DEBUG) {
	webpackConfig.entry.app.unshift('react-hot-loader/patch');
	webpackConfig.plugins.push(
		new WebpackNotifierPlugin({alwaysNotify: true}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					options: {
						config: ({file, options, env}) => ({
							parser: file.extname === '.sss' ? 'sugarss' : false,
							plugins: {
								'autoprefixer': env == 'production' ? options.autoprefixer : false
							}
						})
					}
				}
			}
		})
	);
} else {
	webpackConfig.plugins.push(
		new CleanWebpackPlugin([config.dist], {verbose:true}),
		new ExtractTextPlugin({filename: '[name]-[contenthash:5].css', allChunks: true, ignoreOrder: true}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.LoaderOptionsPlugin({ options: {
			context: __dirname,
			postcss: [ autoprefixer({ browsers: ['last 4 versions'] })]
		} })
	);
}

module.exports = webpackConfig;
