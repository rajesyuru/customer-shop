let ball = document.getElementsByClassName('ball')[0];
let border = document.getElementsByClassName('border')[0];

let left = border.getBoundingClientRect().left;
let right = border.getBoundingClientRect().right;

console.log(left);

var speed = 1;
var x = ball.getBoundingClientRect().x;
const start = x;
let sprint = 0;
// console.log(x);
let dir = 0;

let faster = document.getElementsByTagName('button')[0];
let pause = document.getElementsByTagName('button')[1];
let reset = document.getElementsByTagName('button')[2];
let reverse = document.getElementsByTagName('button')[3];


setInterval(function() {
    
    x = x + speed;
    ball.style = `transform: translateX(${x}px)`
    if (ball.getBoundingClientRect().right > right) {
        speed = speed * -1;
        
    } else if (ball.getBoundingClientRect().left < left) {
        speed = speed * -1;
        sprint = sprint + 1;
        console.log(`Lap ${sprint}`);
    }
    // let dir = speed;
    // console.log(dir);
}, 1);


// console.log(dir);

faster.addEventListener('click', function() {
    if (speed < 0) {
        speed = speed - 1;
    } else {
        speed = speed + 1;
        
    };
});



pause.addEventListener('click', function(){
    if (speed !== 0) {
        dir = speed;
        speed = 0;
    } else {
        speed = dir;
    }
    
    
});

reset.addEventListener('click', function() {
    speed = 1;
    x = start;
    sprint = 0; 
})

reverse.addEventListener('click', function() {
    speed = speed * -1;
})