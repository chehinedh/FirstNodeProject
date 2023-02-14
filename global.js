// Global object

console.log(global);

setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('in the interval');
}, 1000);

console.log(__dirname);
// get the absolute path of the folder
console.log(__filename);
// get the absolute name of the folder with the added file name
console.log(document.querySelector);