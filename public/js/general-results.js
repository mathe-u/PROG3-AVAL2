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

axios.get('/general-elected').then((response) => {
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
});
