const input = document.getElementById('name');
const filterTable = document.getElementById('filter-table');
const formCandidate = document.getElementById('candidate-form');
const listPosition = document.getElementById('position');
const formPosition = document.getElementById('position-form');
const status = {1: 'Eleito', 0: 'Não Eleito', 2: 'Não Eleito'};

function template(item) {
    return `<option value="${item.nome}">${item.nome}</option>`;
};

axios.get('/electoral-position').then((response) => {
    console.log(response.data);
    const html = response.data.map((position) => {
        return template(position);
    }).join('');
    listPosition.innerHTML = html;
}).catch((error) => {
    console.log(error.message);
});

formPosition.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/candidate-position', {position: listPosition.value}).then((response) => {
        console.log(response.data);
        const candidates = response.data;
        const html = candidates.map((candidate) => {
            return `
        <tr>
            <th>Candidato</th>
            <th>Cargo</th>
            <th>Votos</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>${candidate.nome}</td>
            <td>${candidate.cargo}</td>
            <td>${candidate.votos}</td>
            <td>${status[candidate.status]}</td>
        </tr>`;
        }).join('');
        candidates.forEach((candidate) => {
            console.log(candidate);
        });

        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', html);
    }).catch((error) => {
        console.log(error.message);
    });
});

input.addEventListener('input', () => {
    axios.post('/candidate-search', {text: input.value}).then((response) => {
        const candidates = response.data;
        const dataList = document.getElementById('names');

        dataList.innerHTML = '';

        const html = candidates.map((candidate) => {
            return template(candidate);
        }).join('');

        document.getElementById('res').innerHTML = 'fazueli';
        dataList.insertAdjacentHTML('beforeend', html);
    }).catch((error) => {
        console.log(error.message);
    });
});

formCandidate.addEventListener('submit', (e) => {
    e.preventDefault()
    axios.post('candidate-query', {text: input.value}).then((response) => {
        const candidates = response.data[0];
        const html = `
        <tr>
            <th>Candidato</th>
            <th>Cargo</th>
            <th>Votos</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>${candidates.nome}</td>
            <td>${candidates.cargo}</td>
            <td>${candidates.votos}</td>
            <td>${status[candidates.status]}</td>
        </tr>`;

        filterTable.innerHTML = '';
        filterTable.insertAdjacentHTML('beforeend', html);
    }).catch((error) => {
        console.log(error.message);
    });
});
