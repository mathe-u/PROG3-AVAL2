const sqlite = require('sqlite3');

const db = new sqlite.Database('./src/eleicoes2022pi.db', function(error) {
    if (error) {
        console.log(error.message);
    }
    console.log('start conection Database');
});

module.exports = {db};
