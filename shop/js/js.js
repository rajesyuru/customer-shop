let ikan = document.getElementById('ikan');
let ayam = document.getElementById('ayam');
let teh = document.getElementById('teh');
let totprice = document.getElementById('price');

let price = 0;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function update() {
    totprice.innerText = numberWithCommas(price);
    
}

ikan.addEventListener('change', function(e) {
    if (e.target.checked) {
        price = price + 9000;
    } else {
        price = price - 9000;
    }

    update();
})
ayam.addEventListener('change', function(e) {
    if (e.target.checked) {
        price = price + 19000;
    } else {
        price = price - 19000;
    }

    update();
})
teh.addEventListener('change', function(e) {
    if (e.target.checked) {
        price = price + 5000;
    } else {
        price = price - 5000;
    }

    update();
})