let products = [];

let currentId = null;

let navSelected = 'all';

if (localStorage.getItem('products') !== null ) {
    products = JSON.parse(localStorage.getItem('products'));
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function updateStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateNav() {
    document.querySelectorAll('.nav-item').forEach(function(navItem) {
        navItem.classList.remove('active');

        if (navItem.children[0].dataset.link === navSelected) {
            navItem.classList.add('active');
        }
    })
}

function parseCategory(prodcat) {
    switch (prodcat) {
        case 'electronic':
            return 'Elektronik';
        case 'fashion':
            return 'Fashion';
        case 'kitchen':
            return 'Dapur';
        case 'gaming':
            return 'Gaming';
    
        default:
            alert('Error: Category not found');
            break;
    }
}

function parseLocation(prodloc) {
    switch (prodloc) {
        case 'jakarta-pusat':
            return 'Jakarta Pusat';
        case 'jakarta-timur':
            return 'Jakarta Timur';
        case 'jakarta-barat':
            return 'Jakarta Barat';
        case 'jakarta-utara':
            return 'Jakarta Utara';
        case 'jakarta-selatan':
            return 'Jakarta Selatan';
    
        default:
            alert('Error: Location not found');
            break;
    }
}

function getProd(product) {
    
    let col = document.createElement('div');
    col.classList.add('col');
    col.classList.add('my-3');

    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('shadow-sm');
    card.classList.add('h-100');

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = product.prodimg;
    img.alt = product.prodname;

    let body = document.createElement('div');
    body.classList.add('card-body');
    body.classList.add('text-center');
    body.innerHTML = `
    <h5 class="card-title my-2">${product.prodname}</h5>
    <p class="card-text text-muted font-weight-light">${parseLocation(product.prodloc)}</p>
    <p class="text-success font-weight-bold">Rp. ${numberWithCommas(product.prodprice)}</p>
    <p class="font-weight-bold">${parseCategory(product.prodcat)}</p>
    `

    let offerings = document.createElement('div');
    offerings.classList.add('d-flex');
    offerings.classList.add('my-3');
    offerings.classList.add('justify-content-center');

    

    if (product.prodoff.find(offering => offering === "gratong") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://i.pinimg.com/originals/0c/2a/03/0c2a030c2d2188b0a67a54249ae6b79c.png"
                            alt="Gratis Ongkir" title="Gratis Ongkir">`
    }

    if (product.prodoff.find(offering => offering === "cashback") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://cdn1.iconfinder.com/data/icons/web-design-29/60/wallet__icon__vector__illustration-512.png"
                            alt="Cashback" title="Cashback">`
    }

    if (product.prodoff.find(offering => offering === "disc") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://i.pinimg.com/originals/ab/ed/26/abed265cd5f621820ce2457d1abc7391.png"
                            alt="Diskon" title="Diskon">`
    }

    let footer = document.createElement('div');
    footer.classList.add('card-footer');
    footer.classList.add('d-flex');
    footer.classList.add('align-items-center');
    footer.classList.add('justify-content-center');

    let btnEdit = document.createElement('a');
    btnEdit.classList.add('btn');
    btnEdit.classList.add('btn-primary');
    btnEdit.classList.add('text-white');
    btnEdit.classList.add('mr-2');
    btnEdit.innerHTML = `<i class="material-icons" style="font-size: 18px; vertical-align: text-bottom;">edit</i>`;

    let btnDelete = document.createElement('a');
    btnDelete.classList.add('btn');
    btnDelete.classList.add('btn-danger');
    btnDelete.classList.add('text-white');
    btnDelete.innerHTML = `<i class="material-icons" style="font-size: 18px; vertical-align: text-bottom;">delete</i>`;

    footer.append(btnEdit);
    footer.append(btnDelete);

    btnDelete.addEventListener('click', function(e) {
        e.preventDefault();

        let con = confirm("Are you sure you want to delete?");

        if (con === true) {
            products = products.filter(function(_product) {
                return _product.id !== product.id;
            })
        } else {
            return;
        }

        updateStorage();
        showContent();
    })

    btnEdit.addEventListener('click', function(e) {
        e.preventDefault();

        currentId = product.id;

        document.querySelector('[name="name"]').value = product.prodname;
        document.querySelector('[name="image"]').value = product.prodimg;

        document.querySelectorAll('[name="location"] option').forEach(function(option) {
            if (option.value === product.prodloc) {
                // console.log(option);
                option.selected = true;

            } else {
                option.selected = false;
            }
            
        })

        document.querySelectorAll('[name="cat"]').forEach(function(cat) {
            // console.log(cat);

            if (cat.value === product.prodcat) {
                cat.checked = true;
            } else {
                cat.checked = false;
            }
        })

        if (product.prodoff.findIndex(a => a === "gratong") >= 0) {
            document.getElementById('gratong').checked = true;
        } else {
            document.getElementById('gratong').checked = false;
        }
        
        if (product.prodoff.findIndex(a => a === "cashback") >= 0) {
            document.getElementById('cashback').checked = true;
        } else {
            document.getElementById('cashback').checked = false;
        }
        
        if (product.prodoff.findIndex(a => a === "disc") >= 0) {
            document.getElementById('disc').checked = true;
        } else {
            document.getElementById('disc').checked = false;
        }
        
        document.querySelector('[name="price"]').value = product.prodprice;

        $('#formModal').modal('show');
    })


    body.append(offerings);
    card.append(img);
    card.append(body);
    card.append(footer);
    col.append(card);

    return col;
}

function showContent() {
    let el = document.getElementById('content');

    el.innerHTML = '';

    let filter = [...products];

    document.querySelector('[data-link="all"]').innerHTML = `Semua (${products.length})`;
    document.querySelector('[data-link="electronic"]').innerHTML = `Elektronik (${products.filter(product => product.prodcat === 'electronic').length})`;
    document.querySelector('[data-link="fashion"]').innerHTML = `Fashion (${products.filter(product => product.prodcat === 'fashion').length})`;
    document.querySelector('[data-link="kitchen"]').innerHTML = `Dapur (${products.filter(product => product.prodcat === 'kitchen').length})`;
    document.querySelector('[data-link="gaming"]').innerHTML = `Gaming (${products.filter(product => product.prodcat === 'gaming').length})`;

    

    if (navSelected !== 'all' && navSelected !== 'add') {
        filter = filter.filter(product => product.prodcat === navSelected)
    }

    filter.forEach(product => {
        // console.log(filter)
        el.prepend(getProd(product));
    })

    
}

document.getElementById('add').addEventListener('click', function(e) {
    e.preventDefault();

    currentId = null;
})

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('test');

    let name = document.querySelector('[name="name"]').value;
    let image = document.querySelector('[name="image"]').value;
    let location = document.querySelector('[name="location"] option:checked').value;
    let price = document.querySelector('[name="price"]').value;

    let category = document.querySelector('[name="cat"]:checked');

    let offer = [];

    if (document.querySelector('[name="gratong"]:checked') !== null) {
        offer.push(document.querySelector('[name="gratong"]:checked').value);
    }

    if (document.querySelector('[name="cashback"]:checked') !== null) {
        offer.push(document.querySelector('[name="cashback"]:checked').value);
    }

    if (document.querySelector('[name="disc"]:checked') !== null) {
        offer.push(document.querySelector('[name="disc"]:checked').value);
    }

    if (category === null || name.length == 0 || image.length == 0 || price.length == 0) {
        alert('Fill the blanks');
        return;
    };

    let cat = category.value;

    if (currentId !== null) {
        products = products.map(function(product) {
            if (product.id === currentId) {
                return {
                    id: currentId,
                    prodname: name,
                    prodimg: image,
                    prodloc: location,
                    prodprice: parseInt(price),
                    prodcat: cat,
                    prodoff: offer,
                }                
            } else {
                return product;
            }
        })
    } else {
        let product = {
            id: uuidv4(),
            prodname: name,
            prodimg: image,
            prodloc: location,
            prodprice: parseInt(price),
            prodcat: cat,
            prodoff: offer,
        }
        
        console.log(product);
        products.push(product);
    }

    $('#formModal').modal('hide'); 

    navSelected = 'all';
    updateNav();
    updateStorage();
    showContent();
})

document.querySelectorAll('.nav-link').forEach(function(navLink) {
    navLink.addEventListener('click', function(e) {
        e.preventDefault();

        let link = navLink.dataset.link;

        navSelected = link;

        updateNav();

        showContent();

        console.log(navSelected)
    })
})

$('#formModal').on('hidden.bs.modal', function(e) {
    currentId = null;

    // $('#navbar').collapse();
    
    document.getElementById('form').reset();

    navSelected = 'all'
    updateNav();
})

updateNav();
showContent();