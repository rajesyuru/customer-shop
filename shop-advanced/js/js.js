let ikan = document.getElementById('ikan');
let ayam = document.getElementById('ayam');
let teh = document.getElementById('teh');
let totprice = document.getElementById('price');

let ikanammount = document.getElementById('ikanprice');
let ayamammount = document.getElementById('ayamprice');
let tehammount = document.getElementById('tehprice');

console.log(ikanammount);

let price = 0;


document.onkeydown = function (e) {
    return false;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function update() {
    price = 0;
    if (ikan.checked) {
        price = price + 9000 * ikanammount.value;
    } if (ayam.checked) {
        price = price + 19000 * ayamammount.value;
    } if (teh.checked) {
        price = price + 5000 * tehammount.value;
    }
    totprice.innerText = numberWithCommas(price);
    
}

ikanammount.addEventListener('change', function () {
    update()
})

ayamammount.addEventListener('change', function () {
    update()
})

tehammount.addEventListener('change', function () {
    update()
})



ikan.addEventListener('change', function(e) {
    // console.log(ikanvalue);
    if (e.target.checked) {
        ikanammount.disabled = false;
    } else {
        ikanammount.disabled = true;
    }

    update();
})
ayam.addEventListener('change', function(e) {
    if (e.target.checked) {
        ayamammount.disabled = false;
        
    } else {
        ayamammount.disabled = true;
        
    }

    update();
})
teh.addEventListener('change', function(e) {
    if (e.target.checked) {
        tehammount.disabled = false;
        
    } else {
        tehammount.disabled = true;
        
    }

    update();
})