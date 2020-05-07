const http = require('http');

const server = http.createServer((req, res) =>{
    res.end('hellow learn nodemon')
})

server.listen(3000, ()=>{
    console.log('server start and listen port 3000')
})

// 配置nodemon: 
// 1、npm install nodemon -D
// 2、package.json配置: "start": "nodemon src/index.js"
// 3、增加一个 nodemon.json 配置文件 { "watch": ["./src/**/*.*"] } 监听src文件夹下的文件