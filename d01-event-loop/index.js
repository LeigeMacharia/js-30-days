// Building a Visual Call Stack Tracer

const callStack = [];

function logStack(action, functionName) {
    if (action === "push") {
        callStack.push(functionName);
    } else if (action === "pop") {
        callStack.pop();
    }

    console.log(`Action: ${action.toUpperCase()} ${functionName}`);
    console.log("Current Stack:", [...callStack]);
    console.log("-----------------")
}

function a() {
    logStack("push", "a");
    b();
    logStack("pop", "a");
}

function b() {
    logStack("push", "b");
    console.log("Executing function b");
    logStack("pop", "b");
}

a();


// Reproducing 3 common event loop gotchas

// 1. setTimeout(0) is not immediate
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");

// 2. microtasks beat macrotasks
console.log("Start");

setTimeout(() => {
    console.log("Macrotask");
}, 0);

Promise.resolve().then(() => {
    console.log("Microtask");
});

console.log("End");


// 3. microtask starvation
function infiniteMicrotask() {
    Promise.resolve().then(infiniteMicrotask);
}

// Uncomment to test carefully
// infinite<icrotask();

/* 
function infiniteMicrotask() {
    Promise.resolve().then(infiniteMicrotask);
}

setTImout(() => {
    console.log("This may never run")
}, 0);
*/


// Writing a custom setInterval without using setInterval
function customSetInterval(callback, delay) {
    let timerId;
    let isCancelled = false;

    function run() {
        if (isCancelled) return;

        callback();
        timerId = setTimeout(run, delay);
    }

    timerId = setTimeout(run, delay);

    return {
        cancel: function () {
            isCancelled = true;
            clearTimeout(timerId);
        }
    };
}

//Usage

const interval = customSetInterval(() => {
    console.log("Running every 1 second");
}, 0);

// Stop after 5 second
setTimeout(() => {
    interval.cancel();
    console.log("interval cancelled");
}, 5000);



