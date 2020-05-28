const http = require('http')
const myObj = require('./module/tool')

const server = http.createServer((req, res) =>{
    console.log(myObj)

    res.write('hellow huangmi!')
    res.end()
})

server.listen(8080, () =>{
    console.log('server is running at port 8080')
})

