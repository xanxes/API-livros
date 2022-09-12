//import da biblioteca express
const express = require('express');

//import da biblioteca cors para manipular as permissoes do protocalo http
const cors = require('cors');

//import da biblioteca body parser que irá manipular o corpo da requisicoes do protocolo http
const bodyParser = require('body-parser');
const { request, response } = require('express');

const app = express();

//import funcao
const {getTitle} = require('./modulo/livros')

app.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`)
    response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`)
    app.use(cors())
    next()
})

app.get(`/book/:bookName`, cors(), async (request, response, next) => {
    let bookName = request.params.bookName
    let book = getTitle(bookName)

    if (book) {
        response.status(200)
        response.json(book)
    } else {
        response.status(404)
    }
})

app.listen(8080, () => {
    console.log(`Aguardando requisicoes`)
})