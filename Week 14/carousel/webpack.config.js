/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-10 21:20:43
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-10 21:20:44
 * @Description:
 */
module.exports = {
	entry: "./main.js",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{ pragma: "createElement" },
							],
						],
					},
				},
			},
		],
	},
};
