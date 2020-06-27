const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Alex',
            age: 45
        });
        // reject('something went wrong');
    }, 1500);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);

    // this returns a new promise to the next call in the chain
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promse');
        }, 1500);
    });

}).then((data) => {
    console.log('2', data); // prints out data from first then
}).catch((error) => {
    console.log('error: ', error)
});

console.log('after');