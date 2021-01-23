const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let pizacase = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/pizaarr', async (request, response) => {
    pizacase = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(pizacase);
});

app.post('/pizaarr', async (request, response) => {
    const pizaArr = request.body;
    pizacase.push(pizaArr);
    await writeData(pizacase);
    response.status(200).json({info: 'Piza succefully created!'});
});

app.post('/pizaarr/:pizaArrId/piza', async (request, response) => {
    const piza = request.body;
    const pizaArrId = Number(request.params.pizaArrId);
    pizacase[pizaArrId].pizas.push(piza);
    await writeData(pizacase);
    response.status(200).json({info: 'Boook succefully created!'});
});

app.patch('/pizaarr/:pizaArrId/piza/:pizaId', async (request, response) => {
    const { newName} = request.body;
    const pizaArrId = Number(request.params.pizaArrId);
    const pizaId = Number(request.params.pizaId);

    pizacase[pizaArrId].pizas[pizaId].name = newName;


    await writeData(pizacase);
    response.status(200).json({info: 'Piza succefully changed!'});
});

app.delete('/pizaarr/:pizaArrId/piza/:pizaId', async (request, response) => {
    const pizaArrId = Number(request.params.pizaArrId);
    const pizaId = Number(request.params.pizaId);

    pizacase[pizaArrId].pizas.splice(pizaId, 1);

    await writeData(pizacase);
    response.status(200).json({info: 'Piza succefully deleted!'});
});

app.patch('/pizaarr/:pizaArrId', async (request, response) => {
    const pizaArrId = Number(request.params.pizaArrId);
    const { pizaId, destShelfId } = request.body;

    const pizaToMove =  pizacase[pizaArrId].pizas.splice(pizaId, 1);
    pizacase[destShelfId].pizas.push(pizaToMove);

    await writeData(pizacase);
    response.status(200).json({info: 'Piza succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
