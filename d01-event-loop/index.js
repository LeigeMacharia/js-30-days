// Building a Visual Call Stack Tracer
function logStack(action) {
    console.log(action);
}

function a() {
    logStack("Enter a");
    b();
    logStack("Exit a");
}

function b() {
    logStack("Enter b");
    logStack("Exit b");
}

a();

/* 
    all functions are ignored till a() is first callled 
    a() is added to the call stack list
    the b() is called
    b() is added to the call stack list
    the code in function b() is executed 
    then b() is removed formthe task list 
    execution returned to function a() and its done till completion
    a() is removed from the call stack list and the call stack remains 
    empty

*/


// Reproducing 3 common event loop gotchas

// 1. setTimeout(0) is not immediate
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");

// 2. microtasks beat macrotasks
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));

// 3. microtask starvation
function loop() {
    Promise.resolve().then(loop);
}

loop();

setTimeout(() => console.log("Never runs"), 0);




// Writing a custom setInterval without using setInterval

function customInterval(callback, delay) {
    function run() {
        callback();
        setTimeout(run, delay);
    }
    
    setTimeout(run, delay);
}



