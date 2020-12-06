/*
 * @Author: Eric YangXinde
 * @Date: 2020-12-06 15:00:34
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-06 15:19:57
 * @Description:
 */
// request line/headers/body 文本型协议 传的都是字符串 「\r\n」作为换行  空行作为结尾
var http = require("http");
http.createServer((req, res) => {
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
			res.writeHead(200, { "Content-type": "text/html" });
			res.end(" Hello world\n");
		});
}).listen(8088);
console.log("http server started");
