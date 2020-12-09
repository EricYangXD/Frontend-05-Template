/*
 * @Author: Eric YangXinde
 * @Date: 2020-12-06 15:00:34
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-09 17:21:28
 * @Description:
 */
// request line/headers/body 文本型协议 传的都是字符串 「\r\n」作为换行  空行作为结尾
var http = require("http");
const server = http.createServer((req, res) => {
	console.log("request received");
	console.log(req.headers);
	res.setHeader("Content-Type", "text/html");
	res.setHeader("X-Foo", "bar");
	res.setHeader("referer", "qq.misic.com");
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end(
		`<html maaa="a">
	<head>
		<style>
		#container{
			width: 500px;
			height: 300px;
			display: flex;
			background-color: rgb(255,255,255); 
		}
		#container #myid {
				width: 200px;
				height: 100px;
				background-color: rgb(255,0,0);
			}
			#container .c1 {
				flex: 1;
				background-color: rgb(0,255,0);
			}
		</style>
	</head>
	<body>
		<div id="container">
			<div id="myid"></div>
			<div class=".c1"></div>
		</div>
	</body>
</html>`
	);
});

server.listen(8088);
console.log("http server started");
