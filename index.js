const express = require("express");
const server = express();

var authCount = 0;
server.get('/auth', (req, res) => {
    res.send(`<a href="/return?redirect_uri=${encodeURI(req.query.redirect_uri)}&state=${req.query.state}">Click here</a>`);
    authCount++;
});

var returnCount = 0;
server.get('/return', (req, res) => {
    res.writeHead(307, { "Location": `${req.query.redirect_uri}?code=auth-${++returnCount}&state=${req.query.state}` });
    res.end();
});

var tokenCount = 0;
server.post('/token', (_, res) =>
    res.send({
        token_type: "Bearer",
        access_token: `access-${++tokenCount}`,
        refresh_token: `refresh-${tokenCount}`,
        expires_in: 3600
    }));

server.get('/', (_, res) =>
    res.send({ authCount, returnCount, tokenCount }));

const port = process.env.PORT || 1337;
server.listen(port);

console.log(`Server running at port ${port}.`);