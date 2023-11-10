const http = require('http');
const axios = require('axios');

let flights = [];

const server = http.createServer((req, res) => {
    if(req.url === '/flights' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(flights));
    }else if (req.url === '/flights' && req.method === 'POST'){
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            const newFlight = JSON.parse(data);
            flights.push(newFlight);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(newFlight));
        });
    }else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);

    axios.get('http://localhost:3000/flights').then(response =>{
        console.log('\n--- List of Flights (GET) ---');
        console.log(response.data);
    }).catch(error =>{
        console.error('Error fetching flights : ', error.message);
    });

    const newFlight = {flightNumber: 'ABC456', destination: 'Tokio'};

    axios.post('http://localhost:3000/flights', newFlight).then(response =>{
        console.log('\n--- Add Flight (POST) ---');
        console.log(response.data);
    }).catch(error =>{
        console.error('Error fetching flights : ', error.message);
    })
});