const sqlite = require('./db.js');

const candidate = function(req, res) {
    const name = req.body.text.toUpperCase();
    const query = `
    SELECT nome 
    FROM candidato 
    WHERE nome LIKE '${name}%' 
    ORDER BY nome`;
    /*console.log('---- Tables ----');
    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });*/

    // banco de dados

    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }

        res.send(JSON.stringify(rows));
    });
};

const fullCandidate = function(req, res) {
    const name = req.body.text.toUpperCase();
    const query = `
    SELECT y.nome, z.nome as cargo, SUM(x.votos) as votos, y.status
    FROM candidato y, votacao x, cargo z
    WHERE y.id = x.candidato AND y.cargo = x.cargo AND x.cargo = z.id AND y.nome LIKE '${name}%'
    GROUP BY x.candidato`;

    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }

        res.send(JSON.stringify(rows));
    });
};

const positions = function(req, res) {
    const query = `SELECT * FROM cargo ORDER BY id`;

    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }
        res.send(JSON.stringify(rows));
    });
};

const fullPositions = function(req, res) {
    const position = req.body.position;
    const query = `
    SELECT z.nome, y.nome as cargo, SUM(x.votos) as votos, z.status
    FROM votacao x, cargo y, candidato z 
    WHERE y.id = x.cargo 
    AND y.nome LIKE '${position}' 
    AND z.id = x.candidato 
    AND z.cargo = x.cargo
    GROUP BY x.candidato`;

    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }
        res.send(JSON.stringify(rows));
    });
};

const countyList = function(req, res) {
    const query = `SELECT nome FROM municipio ORDER BY nome`;

    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }
        res.send(JSON.stringify(rows));
    });
};

const fullCounty = function(req, res) {
    const county = req.body.county;
    const query = `
    SELECT z.nome, w.nome as cargo, SUM(x.votos) as votos, z.status
    FROM votacao x, municipio y, candidato z, cargo w
    WHERE x.municipio = y.id 
    AND x.candidato = z.id 
    AND w.id = x.cargo
    AND z.cargo = x.cargo 
    AND y.nome LIKE '${county}'
    GROUP BY z.nome`;
    
    sqlite.db.all(query, (error, rows) => {
        if (error) {
            throw error.message;
        }
        res.send(JSON.stringify(rows));
    });
};

module.exports = {candidate, fullCandidate, positions, fullPositions, countyList, fullCounty};
