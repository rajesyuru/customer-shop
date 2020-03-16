let products = [];

let search = '';

let offeringFilter = [];
let locationFilter = [];
let CategoryFilter = 'all';
let minPrice = null;
let maxPrice = null;
let WishListPage = false;

if (localStorage.getItem('products') !== null ) {
    products = JSON.parse(localStorage.getItem('products'));
} else {
    products = [{"id":"eab592cb-2bce-4b5c-b52f-392e5ec41f89","prodname":"GTA 5","prodimg":"https://s3.bukalapak.com/img/8905661087/s-400-400/2019_03_15T15_40_15_07_00.jpg","prodloc":"jakarta-pusat","prodprice":280000,"prodcat":"gaming","prodoff":["disc"],"wishlist":false},{"id":"b2bef712-b81b-4b29-9a3d-73712eb52f71","prodname":"GTA ONLINE UNLIMITED MONEY!!!","prodimg":"https://pbs.twimg.com/profile_images/1206322630166491142/r4eDsyp9_400x400.jpg","prodloc":"jakarta-selatan","prodprice":1000000,"prodcat":"gaming","prodoff":["cashback","disc"],"wishlist":false},{"id":"6e84fcbb-ee0f-4c9f-b592-dacfbc4bf980","prodname":"John Wick Skin in Fortnite for Free!!!","prodimg":"https://pbs.twimg.com/profile_images/985173813385154560/olMYLX4I_400x400.jpg","prodloc":"jakarta-utara","prodprice":800000,"prodcat":"fashion","prodoff":["gratong","cashback"],"wishlist":false},{"id":"aea914e4-e902-4cfd-a3f6-4583b7700489","prodname":"Kipas","prodimg":"https://www.holmesproducts.com/dw/image/v2/AAMB_PRD/on/demandware.static/-/Sites-master-catalog/default/dw587e17df/images/highres/HSF1610A-BTU-2.jpg?sw=400&sh=400&sm=fit","prodloc":"jakarta-utara","prodprice":400000,"prodcat":"electronic","prodoff":["gratong","disc"],"wishlist":false},{"id":"74e8fda1-3390-4130-ab11-df73e2d8015a","prodname":"Lowongan Kerja Di Disney","prodimg":"https://pbs.twimg.com/profile_images/1130532212871442432/lVus9lux_400x400.png","prodloc":"jakarta-selatan","prodprice":28000,"prodcat":"fashion","prodoff":["cashback"],"wishlist":false},{"id":"d8eb12ec-1409-4b92-aeeb-d25be2442ae5","prodname":"Robot","prodimg":"https://i.ebayimg.com/images/g/qeEAAOSw2gxYxVJB/s-l400.jpg","prodloc":"jakarta-timur","prodprice":9000000,"prodcat":"electronic","prodoff":["gratong","disc"]},{"id":"4564cd93-3bda-49d5-9c16-8b2248464df9","prodname":"Gambar Loading Discord","prodimg":"https://thumbs.gfycat.com/AgitatedAcceptableGermanspaniel-max-1mb.gif","prodloc":"jakarta-pusat","prodprice":28000,"prodcat":"kitchen","prodoff":["cashback"],"wishlist":false},{"id":"b25acd12-5c52-47ed-885f-05141ef1bce9","prodname":"Bad Time","prodimg":"https://cdn.pixilart.com/photos/large/728fcc967b67ca8.gif","prodloc":"jakarta-selatan","prodprice":980000,"prodcat":"fashion","prodoff":["disc"],"wishlist":false}];
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/*
function parseOfferings(prodoff) {
    switch (prodoff) {
        case 'gratong':
            return 'Gratis Ongkir';
        case 'cashback':
            return 'Cashback';
        case 'disc':
            return 'Diskon';
    
        default:
            alert('Error: Offerings not found')
            break;
    }
}
*/

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
    card.style = 'position: relative;'

    
    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = product.prodimg;
    img.alt = product.prodname;
    
    card.append(img);
    
    let wishlistIcon = document.createElement('div');
    wishlistIcon.classList.add('wishlist');
    wishlistIcon.classList.add('position-absolute');
    wishlistIcon.style = 'right: 5px; top: 5px; cursor: pointer; user-select: none;';
    
    wishlistCondition(product.wishlist);

    card.append(wishlistIcon);

    wishlistIcon.addEventListener('click', function() {
        // alert('Added')
        if (product.wishlist === undefined || product.wishlist === false) {
            product.wishlist = true;
            wishlistCondition(product.wishlist);
            updateStorage();
            showContent();
            wishlistUpdate();
            console.log(`Name: ${product.prodname}, Wishlist?: ${product.wishlist}`);
        } else {
            product.wishlist = false;
            wishlistCondition(product.wishlist);
            updateStorage();
            showContent();
            wishlistUpdate();
            console.log(`Name: ${product.prodname}, Wishlist?: ${product.wishlist}`);
        }
    })

    function wishlistCondition(wishlist) {
        if (wishlist === false || wishlist === undefined) {
            wishlistIcon.innerHTML = `<i class="material-icons text-primary">favorite_border</i>`
        } else {
            wishlistIcon.innerHTML = `<i class="material-icons text-primary">favorite</i>`
        }
    }

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


    body.append(offerings);
    
    
    card.append(body);
    col.append(card);

    return col;
}

function wishlistUpdate() {
    let wishlistSize = products.filter(product => product.wishlist === true).length;
    if (wishlistSize !== 0) {
        document.getElementById('badgeWishlist').classList.remove('d-none')
        document.getElementById('badgeWishlist').innerText = `${wishlistSize}`
    } else {
        document.getElementById('badgeWishlist').classList.add('d-none');
    }
    
} 

function showContent() {
    let el = document.getElementById('content');

    el.innerHTML = '';

    let filter = [...products];

    if (WishListPage === true) {
        filter = filter.filter(product => product.wishlist === true)
    }

    if (CategoryFilter !== 'all') {
        filter = filter.filter(product => product.prodcat === CategoryFilter)
    }

    if (locationFilter.length > 0) {
        filter = filter.filter(product => locationFilter.findIndex(e => e === product.prodloc) >= 0);

    }

    if (offeringFilter.length > 0) {
        filter = filter.filter(product => (offeringFilter.findIndex(e => (product.prodoff.findIndex(c => c === e) >= 0)) >= 0));

    }

    if (minPrice !== null) {
        filter = filter.filter(product => product.prodprice >= minPrice);
    }

    if (maxPrice !== null) {
        filter = filter.filter(product => product.prodprice <= maxPrice);
    }

    

    if (search.trim().length) {
        filter = filter.filter(product => product.prodname.search(new RegExp(search.trim(), 'i')) >= 0 || parseLocation(product.prodloc).search(new RegExp(search.trim(), 'i')) >= 0);
    }
    

    filter.forEach(product => {
        // console.log(filter)
        el.prepend(getProd(product));
    })

    
}

document.getElementById('search').addEventListener('submit', function(e) {  
    e.preventDefault();
    
    search = document.querySelector('[name="search"]').value;

    // console.log(search);

    showContent();
})

document.getElementById('formFilter').addEventListener('click', function() {

    locationFilter = [];
    offeringFilter = [];
    CategoryFilter = 'all';
    // minPrice = null;
    // maxPrice = null;

    if (document.querySelector('#filterJakartaPusat:checked') !== null) {
        
        locationFilter.push(document.querySelector('#filterJakartaPusat').value); 
    }

    if (document.querySelector('#filterJakartaUtara:checked') !== null) {
        
        locationFilter.push(document.querySelector('#filterJakartaUtara').value); 
    }

    if (document.querySelector('#filterJakartaTimur:checked') !== null) {
        
        locationFilter.push(document.querySelector('#filterJakartaTimur').value); 
    }

    if (document.querySelector('#filterJakartaSelatan:checked') !== null) {
        
        locationFilter.push(document.querySelector('#filterJakartaSelatan').value); 
    }

    if (document.querySelector('#filterJakartaBarat:checked') !== null) {
        
        locationFilter.push(document.querySelector('#filterJakartaBarat').value); 
    }






    if (document.querySelector('#filterGratong:checked') !== null) {
        
        offeringFilter.push(document.querySelector('#filterGratong').value); 
    }

    if (document.querySelector('#filterCashback:checked') !== null) {
        
        offeringFilter.push(document.querySelector('#filterCashback').value); 
    }

    if (document.querySelector('#filterDisc:checked') !== null) {
        
        offeringFilter.push(document.querySelector('#filterDisc').value); 
    }


    // minPrice = document.querySelector('[name="price-min"]').value

    // maxPrice = document.querySelector('[name="price-max"]').value

    CategoryFilter = document.querySelector('[name="cat"]:checked').value;

    showContent();
    
})

document.getElementById('price-min').addEventListener('submit', function(e) {
    e.preventDefault();

    if (document.querySelector('[name="price-min"]').value.length === 0) {
        minPrice = null;
    } else {
        minPrice = parseInt(document.querySelector('[name="price-min"]').value)
    }

    showContent();

    // console.log(minPrice);
})

document.getElementById('price-max').addEventListener('submit', function(e) {
    e.preventDefault();

    if (document.querySelector('[name="price-max"]').value.length === 0) {
        maxPrice = null;
    } else {
        maxPrice = parseInt(document.querySelector('[name="price-max"]').value);
    }

    showContent();

    // console.log(maxPrice);
})

document.getElementById('btnReset').addEventListener('click', function(e) {
    e.preventDefault();

    document.getElementById('formFilter').reset();

    locationFilter = [];
    offeringFilter = [];
    CategoryFilter = 'all';

    showContent();
})

// Saat navWishlist dan home diklik, wishlist di products[0] jadi true

document.getElementById('navWishlist').addEventListener('click', function(e) {
    e.preventDefault();

    if (WishListPage !== true) {
        WishListPage = true;
        document.getElementById('navWishlist').style = 'background-color: #0069d9;'
    } else {
        return;
    }

    showContent();
})

document.getElementById('home').addEventListener('click', function(e) {
    e.preventDefault();

    if (WishListPage !== false) {
        WishListPage = false;
        document.getElementById('navWishlist').style = '';
    } else {
        return;
    }

    showContent();
})

wishlistUpdate();
showContent();