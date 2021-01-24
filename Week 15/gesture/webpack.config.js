/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-24 21:56:25
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-24 21:57:02
 * @Description:
 */
module.exports = {
	mode: "development",
	entry: "./gesture.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	// devServer: {
	//   open: true,
	//   hot: true,
	//   compress: true,
	//   disableHostCheck: true, //webpack4.0 开启热更新
	// },
};
