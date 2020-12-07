/*
 * @Author: Eric YangXinde
 * @Date: 2020-12-06 15:00:34
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-07 16:03:28
 * @Description:
 */
// request line/headers/body 文本型协议 传的都是字符串 「\r\n」作为换行  空行作为结尾
var http = require("http");
http.createServer((request, response) => {
	let body = [];
	request
		.on("error", (err) => {
			console.error(err);
		})
		.on("data", (chunk) => {
			body.push(chunk.toString());
		})
		.on("end", () => {
			body = Buffer.concat(body).toString();
			console.log("body:", body);
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end(" Hello world\n");
		});
}).listen(8088);
console.log("http server started");
