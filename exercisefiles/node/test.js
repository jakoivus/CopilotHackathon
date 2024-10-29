//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
        .get('http://localhost:3000/get' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });


    //add test to check get when key is equal to world
    it('should return "Hello, world!" if key is equal to "world"', (done) => {
        http
        .get('http://localhost:3000/get?key=world', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Hello world');
                done();
            });
        });
    });
});
    //add test to check DaysBetweenDates    
    describe('GET /DaysBetweenDays', () => {
      it('should return the correct number of days between two dates', (done) => {
        http.get('http://localhost:3000/DaysBetweenDates?date1=2022-01-01&date2=2022-01-10', (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            assert.strictEqual(data, 'Days between 2022-01-01 and 2022-01-10: 9');
            done();
          });
        });
      });
    });
    //add test to check ValidatephoneNumber
    describe('GET /Validatephonenumber', () => {
        it('should return "invalid" if the phoneNumber is not passed or invalid', (done) => {
          http.get('http://localhost:3000/Validatephonenumber', (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              assert.strictEqual(data, 'invalid');
              done();
            });
          });
        });
    
        it('should return "valid" if the phoneNumber is valid', (done) => {
          http.get('http://localhost:3000/Validatephonenumber?phoneNumber=%2b12345678901', (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              assert.strictEqual(data, 'valid');
              done();
            });
          });
        });
      });

    //write test to validate validateSpanishDNI
   
describe('GET /ValidateSpanishDNI', () => {
    it('should return "valid" if the Spanish DNI is valid', (done) => {
      http.get('http://localhost:3000/ValidateSpanishDNI?dni=12345678Z', (res) => { //valid DNI
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
          console.log (data)
        });
        res.on('end', () => {
          assert.strictEqual(data, 'valid');
          done();
        });
      });
    })
})
    //write test for returnColorCode red should return code #FF0000
    describe('GET /returnColorCode', () => {
      it('should return code "#FF0000" if color is "red"', (done) => {
          http.get('http://localhost:3000/ReturnColorCode?color=red', (res) => {
              let data = '';
              res.on('data', (chunk) => {
                  data += chunk;
                  console.log (data)
              });
              res.on('end', () => {
                  assert.strictEqual(data, '{"hex":"#FF0000"}');
                  done();
              });
          });
      });
  });




