console.log('destructuring');


// Object Destructuring

// const person = {
//     name: 'Alex',
//     age: 45,
//     location: {
//         city: 'Cardiff',
//         temp: 20
//     }
// };

// const { name: firstName = 'Anonymous', age } = person;
// // const name = person.name;
// // const age = person.age;

// console.log(`${firstName} is ${age}.`);


// const { city, temp: termperature } = person.location;
// if (city && termperature) {
//     console.log(`It's ${termperature} in ${city}.`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher ? book.publisher : 'Self-Published';

// console.log(publisherName); // default is 'Self-Published'

// Array Destructuring
const address = ['10 Shearwater Close', 'Penarth', 'South Glamorgan', 'CF645FX'];
const [, city = 'Unknown', county] = address;
console.log(`You are in ${city}, ${county}`);

const item = ['Coffee (hot)', '£2', '£2.50', '£2.75'];

const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);
