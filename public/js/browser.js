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
    /*console.log(response.data);
    const html = response.data.map((position) => {
        return template(position);
    }).join('');*/
    listPosition.innerHTML = html(response.data);
}).catch((error) => {
    console.log(error.message);
});

axios.get('/county').then((response) => {
    listCounty.innerHTML = html(response.data);
}).catch((error) => {
    console.log(error.message);
});

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
        const candidates = response.data;
        const dataList = document.getElementById('names');

        dataList.innerHTML = '';
        dataList.insertAdjacentHTML('beforeend', html(candidates));
    }).catch((error) => {
        console.log(error.message);
    });
});

formCandidate.addEventListener('submit', (e) => {
    e.preventDefault()
    axios.post('candidate-query', {text: input.value}).then((response) => {
        const candidates = response.data;
        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', header + list(candidates));
    }).catch((error) => {
        console.log(error.message);
    });
});

formCounty.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/county-query', {county: listCounty.value}).then((response) => {
        const candidates = response.data;
        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', header + list(candidates));
    }).catch((error) => {
        console.log(error.message);
    });
});
