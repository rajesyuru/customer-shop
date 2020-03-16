let input = document.getElementById('input');
let spin = document.getElementsByTagName('h1')[0];
let answer = document.getElementById('button');
let box = document.getElementsByClassName('box')[0];

answer.addEventListener('click', function(e) {
    let name = input.value;
    console.log
    if (name != 'Rajes') {
        alert('Please insert the right answer');
        
    } else {
        
        document.body.style = 'animation-name: rainbow;';
        box.style = 'display: none';
        document.body.innerHTML = '<h1> CONGRATS!!! </h1>';
        
    } 
    e.preventDefault();
})

