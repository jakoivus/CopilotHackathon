const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');

// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/get') {
        const key = query.key;  
        if (!key) {
            res.end('key not passed');
        } else {
            res.end(`Hello ${key}`);
        }
        
    } 
    else if (pathname === '/DaysBetweenDates') {
        const date1 = query.date1;
        const date2 = query.date2;

        if (!date1 || !date2) {
            res.end('date1 or date2 not passed');
        } else {
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const differenceInDays = Math.round((new Date(date2) - new Date(date1)) / millisecondsPerDay);
            res.end(`Days between ${date1} and ${date2}: ${differenceInDays}`);
        }
    }

    else if (pathname === '/Validatephonenumber') {
        const phoneNumber = query.phoneNumber;
        const phoneNumberRegex = /^\+\d{11}$/;

        if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
            res.end('invalid');
        } else {
            res.end('valid');
        }
    }

    else if (pathname === '/ValidateSpanishDNI') {
        const dni = query.dni;
        const dniRegex = /^\d{8}[A-Z]$/;

        if (!dni || !dniRegex.test(dni)) {
            res.end('invalid');
        } else {
            const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const letter = letters.charAt(parseInt(dni, 10) % 23);
            if (letter === dni.charAt(8)) {
                res.end('valid');
            } else {
                res.end('invalid');
            }
        }
    }
    else if (parsedUrl.pathname === '/ReturnColorCode') {
        const colorQuery = parsedUrl.query.color;
        if (!colorQuery) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Color query parameter is missing');
            return;
        }

        fs.readFile('colors.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading colors.json');
                return;
            }

            const colors = JSON.parse(data);
            const color = colors.find(c => c.color.toLowerCase() === colorQuery.toLowerCase());

            if (!color) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Color not found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ rgba: color.rgba, hex: color.code.hex }));
        });

    
    }
    else if (pathname === '/TellMeAJoke') {

        axios.get('https://official-joke-api.appspot.com/random_joke')
            .then(response => {
                const joke = response.data;
                res.end(`${joke.setup}\n${joke.punchline}`);
            })
            .catch(error => {
                res.end('Failed to fetch a joke');
            });
        }

    else if (pathname === '/ParseUrl') {
        const someurl = query.someurl;
        if (!someurl) {
            res.end('someurl not passed');
        } else {
            const parsedUrl = new URL(someurl);
            const { protocol, host, port, pathname, search, hash } = parsedUrl;
            res.end(`Host: ${host}`);
        }
    }

    else if (pathname === '/ListFiles') {
        const currentDirectory = __dirname;
        fs.readdir(currentDirectory, (err, files) => {
            if (err) {
                res.end('Error reading directory');
            } else {
                res.end(JSON.stringify(files));
            }
        });
    }
    else if (pathname === '/MoviesByTitle') {
        const director = query.director;
        if (!director) {
            res.end('director not passed');
        } else {
            axios.get(`https://api.movieapi.com/movies?director=${director}`)
                .then(response => {
                    const movies = response.data;
                    res.end(JSON.stringify(movies));
                })
                .catch(error => {
                    res.end('Failed to fetch movies');
                });
        }
    }


    else {
        res.end('method not supported');
    }
   

});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});
