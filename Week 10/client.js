/*
 * @Author: Eric YangXinde
 * @Date: 2020-12-06 17:03:41
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-09 17:56:57
 * @Description:
 */
const net = require("net");
const parser = require("./parser");
const images = require("images");
const render = require("./render");
class Request {
	constructor(options) {
		this.method = options.method || "GET";
		this.host = options.host;
		this.port = options.port || 80;
		this.path = options.path || "/";
		this.body = options.body || {};
		this.headers = options.headers || {};
		if (!this.headers["Content-Type"]) {
			this.headers["Content-Type"] = "application/x-www-form-urlencoded";
		}
		if (this.headers["Content-Type"] === "application/json") {
			this.bodyText = JSON.stringify(this.body);
		} else if (
			this.headers["Content-Type"] === "application/x-www-form-urlencoded"
		) {
			this.bodyText = Object.keys(this.body)
				.map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
				.join("&");
		}
		this.headers["Content-Length"] = this.bodyText.length;
	}
	send(connection) {
		return new Promise((resolve, reject) => {
			const parser = new ResponseParser();
			if (connection) {
				connection.write(this.toString());
			} else {
				connection = net.createConnection(
					{
						host: this.host,
						port: this.port,
					},
					() => {
						connection.write(this.toString());
					}
				);
			}
			connection.on("data", (data) => {
				console.log(data.toString());
				parser.receive(data.toString());
				if (parser.isFinished) {
					resolve(parser.response);
				}
				connection.end();
			});
			connection.on("error", (err) => {
				reject(err);
				connection.end();
			});
			// resolve("");
		});
	}

	toString() {
		return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
	.map((key) => `${key}: ${this.headers[key]}`)
	.join("\r\n")}\r
\r
${this.bodyText}`;
	}
}

class ResponseParser {
	constructor() {
		this.WAITING_STATUS_LINE = 0;
		this.WAITING_STATUS_LINE_END = 1;
		this.WAITING_HEADER_NAME = 2;
		this.WAITING_HEADER_SPACE = 3;
		this.WAITING_HEADER_VALUE = 4;
		this.WAITING_HEADER_LINE_END = 5;
		this.WAITING_HEADER_BLOCK_END = 6;
		this.WAITING_BODY = 7;

		this.current = this.WAITING_STATUS_LINE;
		this.statusLine = "";
		this.headers = {};
		this.headerName = "";
		this.headerValue = "";
		this.bodyParser = null;
	}
	get isFinished() {
		return this.bodyParser && this.bodyParser.isFinished;
	}
	get response() {
		this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
		return {
			statusCode: RegExp.$1,
			statusText: RegExp.$2,
			headers: this.headers,
			body: this.bodyParser.content.join(""),
		};
	}
	receive(string) {
		for (let i = 0; i < string.length; i++) {
			this.receiveChar(string.charAt(i));
		}
	}
	receiveChar(char) {
		if (this.current === this.WAITING_STATUS_LINE) {
			if (char === "\r") {
				this.current = this.WAITING_HEADER_LINE_END;
			} else {
				this.statusLine += char;
			}
		} else if (this.current === this.WAITING_HEADER_LINE_END) {
			if (char === "\n") {
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if (this.current === this.WAITING_HEADER_NAME) {
			if (char === ":") {
				this.current = this.WAITING_HEADER_SPACE;
			} else if (char === "\r") {
				this.current = this.WAITING_HEADER_BLOCK_END;
				if (this.headers["Transfer-Encoding"] === "chunked") {
					this.bodyParser = new TrunkedBodyParser();
				}
			} else {
				this.headerName += char;
			}
		} else if (this.current === this.WAITING_HEADER_SPACE) {
			if (char === " ") {
				this.current = this.WAITING_HEADER_VALUE;
			}
		} else if (this.current === this.WAITING_HEADER_VALUE) {
			if (char === "\r") {
				this.current = this.WAITING_HEADER_LINE_END;
				this.headers[this.headerName] = this.headerValue;
				this.headerName = "";
				this.headerValue = "";
			} else {
				this.headerValue += char;
			}
		} else if (this.current === this.WAITING_HEADER_LINE_END) {
			if (char === "\n") {
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if (this.current === this.WAITING_HEADER_BLOCK_END) {
			if (char === "\n") {
				this.current = this.WAITING_BODY;
			}
		} else if (this.current === this.WAITING_BODY) {
			// console.log(char);
			// TODO 
			this.bodyParser.receiveChar(char);
		}
	}
}

class TrunkedBodyParser {
	constructor() {
		this.WAITING_LENGTH = 0;
		this.WAITING_LENGTH_LINE_END = 1;
		this.READING_TRUNK = 2;
		this.WAITING_NEW_LINE = 3;
		this.WAITING_NEW_LINE_END = 4;
		this.length = 0;
		this.content = [];
		this.isFinished = false;
		this.current = this.WAITING_LENGTH;
	}
	receiveChar(char) {
		if (this.current === this.WAITING_LENGTH) {
			if (char === "\r") {
				if (this.length === 0) {
					this.isFinished = true;
				}
				this.current = this.WAITING_LENGTH_LINE_END;
			} else {
				this.length *= 16;
				this.length += parseInt(char, 16);
			}
		} else if (this.current === this.WAITING_LENGTH_LINE_END) {
			if (char === "\n") {
				this.current = this.READING_TRUNK;
			}
		} else if (this.current === this.READING_TRUNK) {
			if (this.isFinished) {
				return;
			}
			this.content.push(char);
			this.length--;
			if (this.length === 0) {
				this.current = this.WAITING_NEW_LINE;
			}
		} else if (this.current === this.WAITING_NEW_LINE) {
			if (char === "\r") {
				this.current = this.WAITING_NEW_LINE_END;
			}
		} else if (this.current === this.WAITING_NEW_LINE_END) {
			if (char === "\n") {
				this.current = this.WAITING_LENGTH;
			}
		}
	}
}

void (async function () {
	let request = new Request({
		method: "POST",
		host: "127.0.0.1",
		port: "8088",
		path: "/",
		headers: {
			["X-Foo2"]: "customed",
		},
		body: { 
			name: "EricYangXD" 
		},
	});
	let response = await request.send();
	// console.log("response: ", response);
	// parser接收一段文本返回一棵DOM树
	let dom = parser.parseHTML(response.body);

	let viewport=images(800,600);
	render(viewport,dom);
	viewport.save("viewport.jpg");
	// console.log(JSON.stringify(dom, null, "    "));
	// console.log("dom: ",dom);
})();


/***
[Running] node "/Users/eric/workspace/geektime/Frontend-05-Template/Week 10/client.js"
HTTP/1.1 200 OK
Content-Type: text/plain
X-Foo: bar
referer: qq.misic.com
Date: Wed, 09 Dec 2020 09:55:31 GMT
Connection: keep-alive
Transfer-Encoding: chunked

1be
<html maaa="a">
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
</html>
0


(node:42440) UnhandledPromiseRejectionWarning: TypeError: state is not a function
    at Object.parseHTML (/Users/eric/workspace/geektime/Frontend-05-Template/Week 10/parser.js:401:11)
    at /Users/eric/workspace/geektime/Frontend-05-Template/Week 10/client.js:226:19
    at processTicksAndRejections (internal/process/task_queues.js:89:5)
(node:42440) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:42440) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

 ***/ 