let dataCovid = [];
let sortBy = null;
let sortDir = 'desc';


function getData(onSuccess) {
    let url = 'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?f=json&where=(Kasus_Posi%20%3C%3E%200)%20AND%20(Provinsi%20%3C%3E%20%27Indonesia%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Kasus_Posi%20desc&outSR=102100&resultOffset=0&resultRecordCount=34&cacheHint=true';

    fetch(url)
        .then(response => response.json())
        .then(json => {
            let data = json.features.map(feature => feature.attributes);

            if (typeof onSuccess === 'function') {
                onSuccess(data);
            }
        })

        .catch(error => console.log(error));
}

const prov = document.querySelector('.prov');
const posi = document.querySelector('.posi');
const semb = document.querySelector('.semb');
const meni = document.querySelector('.meni');

prov.addEventListener('click', function() {
    if (prov.firstElementChild.classList.contains('desc') !== true) {
        prov.firstElementChild.classList.add('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    } else {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    }
})

posi.addEventListener('click', function() {
    if (posi.firstElementChild.classList.contains('desc') !== true) {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.add('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    } else {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    }
})

semb.addEventListener('click', function() {
    if (semb.firstElementChild.classList.contains('desc') !== true) {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.add('desc');
        meni.firstElementChild.classList.remove('desc');
    } else {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    }
})

meni.addEventListener('click', function() {
    if (meni.firstElementChild.classList.contains('desc') !== true) {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.add('desc');
    } else {
        prov.firstElementChild.classList.remove('desc');
        posi.firstElementChild.classList.remove('desc');
        semb.firstElementChild.classList.remove('desc');
        meni.firstElementChild.classList.remove('desc');
    }
})



function showContent() {
    const tableData = document.querySelector('.content tbody');

    tableData.innerHTML = '';

    let sorted = [...dataCovid];

    if (sortBy === 'provinsi') {
        sorted.sort((a, b) => {
            if (sortDir === 'desc') {
                if (a.Provinsi < b.Provinsi) return -1;
                if (a.Provinsi > b.Provinsi) return 1;
            } else {
                if (a.Provinsi < b.Provinsi) return 1;
                if (a.Provinsi > b.Provinsi) return -1;
            }

            return 0;
        });
    } else if (sortBy === 'positif') {
        sorted.sort((a, b) => {
            if (sortDir === 'desc') {
                return b.Kasus_Posi - a.Kasus_Posi;
            } else {
                return a.Kasus_Posi - b.Kasus_Posi;
            }
        });
    } else if (sortBy === 'sembuh') {
        sorted.sort((a, b) => {
            if (sortDir === 'desc') {
                return b.Kasus_Semb - a.Kasus_Semb;
            } else {
                return a.Kasus_Semb - b.Kasus_Semb;
            }
        });
    } else if (sortBy === 'meninggal') {
        sorted.sort((a, b) => {
            if (sortDir === 'desc') {
                return b.Kasus_Meni - a.Kasus_Meni;
            } else {
                return a.Kasus_Meni - b.Kasus_Meni;
            }
        });
    }

    sorted.forEach(data => {
        tableData.innerHTML += `
        <tr>
            <td>${data.Provinsi}</td>
            <td class="text-center">${data.Kasus_Posi}</td>
            <td class="text-center">${data.Kasus_Semb}</td>
            <td class="text-center">${data.Kasus_Meni}</td>
        </tr>
        `
    })

    tableData.innerHTML += `
        <tr>
            <th>Total</th>
            <th class="text-center">${sorted.map(a => a.Kasus_Posi).reduce((acc, val) => acc + val)}</th>
            <th class="text-center">${sorted.map(a => a.Kasus_Semb).reduce((acc, val) => acc + val)}</th>
            <th class="text-center">${sorted.map(a => a.Kasus_Meni).reduce((acc, val) => acc + val)}</th>
        </tr>
        
    `
}

document.querySelectorAll('.content thead tr th').forEach(th => {
    th.addEventListener('click', function() {

        if (sortBy !== th.dataset.sort) {
            sortDir = 'desc';
        } else {
            if (sortDir === 'desc') {
                sortDir = 'asc';
            } else {
                sortDir = 'desc';
            }
        }

        // console.log(sortDir);
        sortBy = th.dataset.sort;
        showContent();
    })
});

getData(data => {
    dataCovid = data;
    showContent();
})