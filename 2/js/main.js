let colbut = document.getElementsByClassName('bumton');

let delbut = document.getElementsByTagName('button')[0];

// console.log(body);

function reset() {
    for (let i=0; i < colbut.length;i++) {
        let but = colbut[i];
        but.classList.remove('selected');
    }
}

for (let i=0; i<colbut.length;i++) {
    let but = colbut[i];

    but.addEventListener('click', function (e) {
        let el = e.path;
        // console.log(el);
        let k = e.target;
        reset();
        // if (el[0].className == 'bumton button1') {
        //     el[3].style = 'background-color: red';
        // } else if (el[0].className == 'bumton button2') {
        //     el[3].style = 'background-color: green';
        // } else if (el[0].className == 'bumton button3') {
        //     el[3].style = 'background-color: blue';
        // } 
        
        
        k.classList.add('selected');
    })



}

delbut.onclick = function() {
    // console.log('bruh');
    document.body.style = 'background-color: white;';
    reset();
    
}