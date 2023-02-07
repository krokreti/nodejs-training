const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Olá</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
        //return nao é obrigatorio, é apenas para nao continuar a execuçao do metodo
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(body)
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });
        });

    }
    res.setHeader('Content-Type', "text/html")
    res.write('<html>')
    res.write('<head><title>Minha primeira página</title></head>')
    res.write('<body><h1>Olá minha primeira página!</h1></body>')
    res.write('</html>')
    res.end();
}

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler
// }

// exports.handler = requestHandler;
