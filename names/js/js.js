let form = document.getElementById('form');
let name = document.getElementById('name');
let item = document.getElementById('item');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let nama = name.value;

    if (nama.trim().length == 0) {
        name.classList.add('error');
        name.focus();
    } else {
        let element = document.createElement('div');

        let ble = document.createElement('a');
        ble.innerHTML = '<i class="material-icons text-danger">delete</i>';

        let blu = document.createElement('a');
        blu.innerHTML = '<i class="material-icons text-dark">create</i>';

        let leform = document.createElement('form');
        leform.style = 'display: none';

        let ledit = document.createElement('input');
        ledit.type = 'text';
        ledit.classList.add('form-control');
        
        leform.append(ledit);

        let opt = document.createElement('div');
        let namae = document.createElement('span');

        namae.innerText = nama;

        element.classList.add('corner');
        element.classList.add('border');
        element.classList.add('shadow-sm');
        element.classList.add('p-2');
        element.classList.add('mb-2');
        element.classList.add('radius');
        
        
        blu.addEventListener('click', function(e) {
            e.preventDefault();
            
            namae.style = 'display: none';
            leform.style = 'display: block';

            ledit.value = nama;
        })

        leform.addEventListener('submit', function(e) {
            e.preventDefault();

            if (ledit.value.trim().length == 0) {
                ledit.classList.add('error');
                ledit.focus();
            } else {

            namae.style = 'display: block';
            leform.style = 'display: none';
            namae.innerText = ledit.value;
            nama = ledit.value;
            ledit.classList.remove('error');
            }

            
        })

        ble.addEventListener('click', function(e) {
            e.preventDefault();

            e.target.parentNode.parentNode.parentNode.remove();
        })

        opt.append(blu);
        opt.append(ble);
        

        element.append(namae);
        element.append(leform);
        element.append(opt);
        

        item.prepend(element);

        name.classList.remove('error');
        name.value = '';
    }

    
})