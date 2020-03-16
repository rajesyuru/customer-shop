const form = document.getElementById('form');
const content = document.getElementById('content');
const aAdd = document.getElementById('add');
const btnSubmit = document.getElementById('submit');
const aCancel = document.getElementById('cancel');
const searchBar = document.getElementById('search');

const inputName = document.querySelector('[name="name"]');
const inputAddress = document.querySelector('[name="address"]');
const inputPhone = document.querySelector('[name="phone"]');

let search = '';


// const inputGroup = document.getElementsByTagName('label')[3];
// const inputGroup = document.getElementById('group');

let contacts = [];

let getStorage = JSON.parse(localStorage.getItem('contacts'));

let idSelected = null;
let navSelected = 'all';

if (getStorage !== null) {
    contacts = getStorage;
}

function updateData() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function updateNav() {
    document.querySelectorAll('.nav-item').forEach(function(navItem) {
        navItem.classList.remove('active');

        if (navItem.children[0].dataset.link === navSelected) {
            navItem.classList.add('active');
        }
    })
}

function showForm(id) {
    form.classList.remove('d-none');
    form.classList.add('d-block');

    content.classList.remove('d-block');
    content.classList.add('d-none');

    searchBar.classList.remove('d-block');
    searchBar.classList.add('d-none');

    form.reset();

    if (id !== undefined) {
        let contact = contacts.find(function(contact) {
            return contact.id === id;
        });

        if (contact.id !== undefined) {
            idSelected = id;

            inputName.value = contact.name;
            inputAddress.value = contact.address;
            inputPhone.value = contact.phone;
            
            if (contact.group !== undefined || contact.group.length !== 0) {
                document.querySelector(`[name="group"][value="${contact.group}"]`).checked = true;
            }

        }
    }

}

function renderCard(contact) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('shadow-sm');
    card.classList.add('mb-3');

    let header = document.createElement('div');
    header.classList.add('card-header')
    header.innerHTML = `<h4 class="my-3">${contact.name}</h4>`;
    card.append(header);

    let desc = document.createElement('ul');
    desc.classList.add('list-group');

    if (contact.group.length === 0) {
        desc.innerHTML = `
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-3 text-danger" style="user-select: none;">
            place
        </i>
        <span>${contact.address}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-3 text-success" style="user-select: none;">
        phone
        </i>
        <span>${contact.phone}</span>
    </li>
    `} else {
        desc.innerHTML = `
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-3 text-danger" style="user-select: none;">
            place
        </i>
        <span>${contact.address}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-3 text-success" style="user-select: none;">
        phone
        </i>
        <span>${contact.phone}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-3 text-primary" style="user-select: none;">
        people_alt
        </i>
        <span class="text-capitalize">${contact.group}</span>
    </li>
    `;
    }
    

    card.append(desc);

    let footer = document.createElement('div');
    footer.classList.add('card-footer');
    footer.classList.add('d-flex');
    footer.classList.add('justify-content-end');
    footer.classList.add('text-decoration-none');

    let aEdit = document.createElement('a');
    aEdit.href = '#'
    aEdit.classList.add('text-primary');
    aEdit.classList.add('nav-link');
    aEdit.innerHTML = '<i class="material-icons mr-1 md-19">create</i>Edit';
    
    let aDelete = document.createElement('a');
    aDelete.href = '#'
    aDelete.classList.add('text-danger');
    aDelete.classList.add('nav-link');
    aDelete.innerHTML = '<i class="material-icons md-19">delete</i>Delete';

    aDelete.addEventListener('click', function(e) {
        e.preventDefault();

        contacts = contacts.filter(function(_contact) {
            return _contact.id !== contact.id;
        })

        updateData();
        showContent();
    });

    aEdit.addEventListener('click', function(e) {
        e.preventDefault();

        showForm(contact.id);

    })



    footer.append(aEdit);
    footer.append(aDelete);

    

    card.append(footer);

    return card;
}

function showContent() {
    form.classList.remove('d-block');
    form.classList.add('d-none');

    content.classList.remove('d-none');
    content.classList.add('d-block');

    searchBar.classList.remove('d-none');
    searchBar.classList.add('d-block');

    content.innerHTML = '';

    let filter = [...contacts];

    if (navSelected !== 'all' && navSelected !== 'add') {
        filter = filter.filter(contact => contact.group === navSelected);
    }

    if (search.trim().length) {
        filter = filter.filter(function(contact) {
            return contact.name.search(new RegExp(search.trim(), 'i')) >= 0 || contact.address.search(new RegExp(search.trim(), 'i')) >= 0 || contact.phone.search(new RegExp(search.trim(), 'i')) >= 0
        })
    }
    
    for (let i = 0; i < filter.length; i++) {
        let contact = filter[i];

        content.prepend(renderCard(contact));
    }
}

btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();

    let inputGroup = document.querySelector('[name="group"]:checked');

    if (inputName.value.length === 0 || inputAddress.value.length === 0 || inputPhone.value.length === 0) {
        alert('Please fill the required field');
    } else {

        

        if (idSelected !== null) {
            contacts = contacts.map(function(contact) {
                if (contact.id === idSelected) {
                    if (inputGroup === null) {
                        return {
                            id: idSelected,
                            name: inputName.value,
                            address: inputAddress.value,
                            phone: inputPhone.value,
                            group: '',
                        }
                    } else {
                        return {
                            id: idSelected,
                            name: inputName.value,
                            address: inputAddress.value,
                            phone: inputPhone.value,
                            group: inputGroup.value,
                        }
                    }
                    
                } else {
                    return contact;
                }
            })
        } else {
            if (inputGroup === null) {
                let contact = {
                    id: uuidv4(),
                    name: inputName.value,
                    address: inputAddress.value,
                    phone: inputPhone.value,
                    group: '',
                }

                contacts.push(contact);

            } else {
                let contact = {
                    id: uuidv4(),
                    name: inputName.value,
                    address: inputAddress.value,
                    phone: inputPhone.value,
                    group: inputGroup.value,
                }
                
                contacts.push(contact);
            }
            

            
        }

        updateData();
    
        showContent();
    
        form.reset();

        idSelected = null;

        navSelected = 'all';
        updateNav();

    }

})

document.querySelectorAll('.nav-link').forEach(function(navLink) {
    navLink.addEventListener('click', function(e) {
        e.preventDefault();

        let link = navLink.dataset.link;

        navSelected = link;

        updateNav();

        switch (link) {
            case 'add':

                showForm(idSelected);

                idSelected = null;
    
                form.reset();

                break;
        
            default:
                showContent();
                break;
        }
    })
})

document.querySelector('[name="search"]').addEventListener('keyup', function(e) {
    search = e.target.value;

    showContent();
})

aCancel.addEventListener('click', function(e) {
    e.preventDefault();

    navSelected = 'all';
    updateNav();

    showContent();
})



showContent();
updateNav();