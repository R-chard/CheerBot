const express = require('express');

const PORT = 5000;
const server = express();

server.all('/', (req, res) => {
  res.send('The test bot is running...')
});

function keepAlive() {
  server.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
  });
}

module.exports = keepAlive;