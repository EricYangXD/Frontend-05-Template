/*
 * @Author: Eric YangXinde
 * @Date: 2020-12-06 15:00:34
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-07 11:37:15
 * @Description:
 */
// request line/headers/body 文本型协议 传的都是字符串 「\r\n」作为换行  空行作为结尾
var http = require("http");
const server = http.createServer((req, res) => {
	console.log("request received");
	console.log(req.headers);
	let body = [];
	req.on("data", (chunk) => {
		body.push(chunk.toString());
	})
		.on("error", (e) => {
			console.error(e);
		})
		.on("end", () => {
			body = Buffer.concat(body).toString();
			console.log("body:", body);
			res.setHeader("Content-Type", "text/html");
			res.setHeader("X-Foo", "bar");
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end(
				`<html maaa="a">
					<head>
						<style>
							body div #myid {
								width: 100px;
								background-color: #ff5000;
							}
							body div img {
								width: 30px;
								background-color: #ff1111;
							}
						</style>
					</head>
					<body>
						<div>
							<img id="myid" />
							<img />
						</div>
					</body>
				</html>`
			);
		});
});

server.listen(8088);
console.log("http server started");
