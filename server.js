const  websocket = require('websocket').server

const http = require('http')

const httpServer = http.createServer().listen(8080, ()=>{
  console.log('nihao: ','http://localhost:8080');
})

const websocketServer = new websocket({
  httpServer: httpServer,
  autoAcceptConnections: false
})

const conArr = []

websocketServer.on('request', function(request) {
	// 这就是一次客户端发送的消息
	// websocket 需要将这个链接保存起来
	// 只要客户端和服务器没有断开，这个链接必须在
 	// 客户端与服务端的通信都是从这个链接上通信
	const connection = request.accept()

	// 每次接收一个链接，将它存放在数组里面
	conArr.push(connection)

	// 监听客户端发送的消息
	connection.on('message', function(message) {
    	console.log(message);
 		// 发送消息给客户端（广播到各个客户端）
  		// 后面加上 utf8Data 编码
 		// 要将所有的链接全部发出去，才可以让每个客户端接收到其他传来的数据
  		for(let i = 0; i < conArr.length; i++) {
   			conArr[i].send(message.utf8Data)
   		}
	})
})
