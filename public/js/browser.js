const input = document.getElementById('name');
const filterTable = document.getElementById('filter-table');
const formCandidate = document.getElementById('candidate-form');
const listPosition = document.getElementById('position');
const formPosition = document.getElementById('position-form');
const listCounty = document.getElementById('county');
const formCounty = document.getElementById('county-form');
const status = {1: 'Eleito', 0: 'Não Eleito', 2: 'Não Eleito'};

function template(item) {
    return `<option value="${item.nome}">${item.nome}</option>`;
};

function html(items) {
    return items.map((item) => {
        return template(item);
    }).join('');
};

function list(items) {
    return items.map((item) => {
        return `
        <tr>
            <td>${item.nome}</td>
            <td>${item.cargo}</td>
            <td>${item.votos}</td>
            <td>${status[item.status]}</td>
        </tr>
        `;
    }).join('');
};

const header = `
<tr>
    <th>Candidato</th>
    <th>Cargo</th>
    <th>Votos</th>
    <th>Status</th>
</tr>`

axios.get('/electoral-position').then((response) => {
    listPosition.innerHTML = html(response.data);
}).catch((error) => {
    console.log(error.message);
});

axios.get('/county').then((response) => {
    listCounty.innerHTML = html(response.data);
}).catch((error) => {
    console.log(error.message);
});

function tableRow(item) {
    return `
    <tr>
        <td>${item.nome}</td>
        <td>${item.votos}</td>
    </tr>
    `;
};

function insert(position, item) {
    document.getElementById(position).insertAdjacentHTML('beforeend', tableRow(item));
};

function clear(position) {
    document.getElementById(position).innerHTML = '';
};

function select(item, st) {
    if (item.cargo == 1 && item.status == st) {
        insert('pre', item);
    }
    if (item.cargo == 3 && item.status == st) {
        insert('gov', item);
    }
    if (item.cargo == 5 && item.status == st) {
        insert('sen', item);
    }
    if (item.cargo == 6 && item.status == st) {
        insert('fed', item);
    }
    if (item.cargo == 7 && item.status == st) {
        insert('est', item);
    }
};

const listPositions = ['pre', 'gov', 'sen', 'fed', 'est'];

/*axios.get('/general-elected').then((response) => {
    let checked = 1;
    const checkbox = document.getElementById('input-checkbox');
    checkbox.checked = true;

    if (checked) {
        response.data.forEach((candidate) => {
            select(candidate, 1);
        });
    }
    
    checkbox.addEventListener('change', () => {
        listPositions.forEach((position) => {
            clear(position);
        });

        if (checked) {
            response.data.forEach((candidate) => {
                select(candidate, 0);
            });
            checked = 0;
        } else {
            response.data.forEach((candidate) => {
                select(candidate, 1);
            });
            checked = 1;
        }
    });
}).catch((error) => {
    console.log(error.message);
});*/

formPosition.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/candidate-position', {position: listPosition.value}).then((response) => {
        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', header + list(response.data));
    }).catch((error) => {
        console.log(error.message);
    });
});

input.addEventListener('input', () => {
    axios.post('/candidate-search', {text: input.value}).then((response) => {
        const dataList = document.getElementById('names');

        dataList.innerHTML = '';
        dataList.insertAdjacentHTML('beforeend', html(response.data));
    }).catch((error) => {
        console.log(error.message);
    });
});

formCandidate.addEventListener('submit', (e) => {
    e.preventDefault()
    axios.post('candidate-query', {text: input.value}).then((response) => {
        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', header + list(response.data));
    }).catch((error) => {
        console.log(error.message);
    });
});

formCounty.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/county-query', {county: listCounty.value}).then((response) => {
        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', header + list(response.data));
    }).catch((error) => {
        console.log(error.message);
    });
});

document.getElementById('general').addEventListener('click', () => {
    return;
});
