// console.log('bruh');
// console.warn('watch out for bruh moment');
// console.error('bruh moment engaged');
// console.log('%cHaroo', 'background-color: black;font-size: 200px;color: white');

// let name = 'bruh';
// const age = 0;

// console.log(`please ${name} whose age is ${age} let me go`);

// const u = {
//     name: 'bruh',
//     age: '(idk)',
//     body: {
//         height: 200,
//         weight: 200,
//     }
// }

// console.warn(`please watch out for ${u.name} whose age is ${u.age} with his height being ${u.body.height}km and weight ${u.body.weight}kg`);

let he = [5, 4, 3, 2, 1, 'lift off!!!'];
console.log(`counting down, ${he[0]}, ${he[1]}, ${he[2]}, ${he[3]}, ${he[4]}, ${he[5]}`);

const she = {
    array: ['be one', 1],
    obj: {
        number1: 1,
        obj: {
            number2: 2,
        }
    }
}

console.log(`please ${she.obj.obj.number2}`)

function prima(a) {
    for (let i=2;i<a;i++) {
        if (a % i == 0) {
            return false;
        }
    }

    return true;
} 



for (let i=2;i<=10;i++) {
    if (prima(i)) {
        console.log(`${i} adalah angka prima`);
    } else {
        console.log(`${i} bukan angka prima`);
    }
}

function urname() {
    prompt("insert ur name");
    readline();
    if (thename == undefined) {
        console.error('bruh');
    } else {
        console.log(`wuddup, ${thename}`);
    }
}

urname();