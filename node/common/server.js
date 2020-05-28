const http = require('http')
const url = require('url')

const server = http.createServer((req, res) =>{

    res.write('hellow huangmi!')
    res.end()
})

server.listen(8888, () =>{
    console.log('server is running at port 8888')
})

// 启动使用命令可监听文件变化： supervisor .\server.js