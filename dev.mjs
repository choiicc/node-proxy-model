const { resolve } = require('path')
const express = require('express')
const proxyMiddleWare = require('http-proxy-middleware')

const app = express()
const httpProto = 'http://'
const proxyIp = '119.11.11.11'
const port = 80

// proxy settings
app.use('/hz', proxyMiddleWare({
    target: httpProto + proxyIp,
    changeOrigoin: false
}))
app.use('/sso', proxyMiddleWare({
    target: httpProto + proxyIp,
    changeOrigoin: false
}))

// what a shit with this plugin in websocket
app.use('/socket.io', proxyMiddleWare({
    target: httpProto + proxyIp,
    ws: false,
    changeOrigoin: false,
    // logLevel: 'debug'
}))
app.use('/chatroom', proxyMiddleWare({
    target: httpProto + proxyIp,
    // pathRewrite: {
    //  '^/websocket' : '/socket',        // rewrite path.
    //  '^/removepath' : ''               // remove path.
    // },
    ws: false, // enable websocket proxy
    changeOrigoin: false, // for vhosted sites, changes host header to match to target's host
    // logLevel: 'debug'
}))

// // 静态资源
// app.use(express.static(resolve(__dirname, 'lg/'))) => 127.0.0.1:3000/index.html
app.use('/lg/',express.static(resolve(__dirname, 'lg/')))
app.use('/lgassets/',express.static(resolve(__dirname, 'lgassets/')))

// app.get('/', (req, res) => res.send('Hello World1!'))
app.listen(port, () => {
    console.log(`proxy dev sever is running on port ${port}!`)
})