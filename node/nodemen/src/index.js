const http = require('http');
const url = require('url')
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    const query = url.parse(req.url, true).query//true表示解析为对象
    const pathname = url.parse(req.url).pathname


    if (req.url !== '/favicon.ico') {
        console.log(`querystring.parse(req.url)`, querystring.parse(req.url))

        console.log(`req.url:`, req.url)
        console.log(`query:`, query)//请求传递的参数
        console.log(`pathname:`, pathname)//请求路径
    }

    res.writeHead(200, {"Content-Type": "text/plain"});//响应头
    res.write('hellow world!')
    res.end()
})

server.listen(3000, () => {
    console.log('server start and listen port 3000')
})

// 配置nodemon: 
// 1、npm install nodemon -D
// 2、package.json配置: "start": "nodemon src/index.js"
// 3、增加一个 nodemon.json 配置文件 { "watch": ["./src/**/*.*"] } 监听src文件夹下的文件,
//    只要src目录下的文件的变化，nodemon就会自动更新node服务器

// 启动：npm start 