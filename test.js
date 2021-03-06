const Cooldown = require('./cooldownSystem')

var cooldown = new Cooldown(500, true/*prevent memory leak. default true */) // 500 milliseconds of cooldown
// new Cooldown('assdasd') // throws

console.log(cooldown.check('some ID. note it should be unique and dosend change; type: any'))
// returns { pass: true, restTime: null } or { pass: false, restTime: 32489 }

setTimeout(() => {
    // check after ~300 mills
    console.log(cooldown.check('some ID. note it should be unique and dosend change; type: any'))    //{ pass: false, restTime: 194 }

    setTimeout(() => {
        //check again after ~500 mills
        console.log(cooldown.check('some ID. note it should be unique and dosend change; type: any'))//{ pass: true, restTime: null }

    }, 500);
}, 300);