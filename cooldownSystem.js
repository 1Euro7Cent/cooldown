module.exports =
    class Cooldown {
        /**
         * @param {number} time amount of cooldown in ms
         * @param {boolean} autoDel if true, removes user from array after cooldown is over in the next check. this prevents possible memory leaks. default true
         * @example
         * var cooldown = new Cooldown(500) // 500 milliseconds of cooldown
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
         */
        constructor(time, autoDel = true) {
            if (typeof time !== 'number') throw new Error('time field is required and must be a number in ms')
            this.time = time;
            this.users = []
            this.autoDel = autoDel
        }
        /**
         * 
         * @param {any} user required unique identifier 
         * @returns 
         */
        check(user) {
            if (!user) throw new Error('user field is required')

            var now = Date.now()
            var found = false
            for (let u in this.users) {
                if (this.users[u].time <= now - this.time && this.autoDel) {
                    // remove user to prevent memory leak
                    this.users.splice(u, 1)
                }
                if (this.users[u]?.id === user) {
                    found = true
                    if (this.users[u].time <= now - this.time) {
                        this.users[u].time = now
                        return {
                            pass: true,
                            restTime: null
                        }
                    }
                    else return {
                        pass: false,
                        restTime: this.users[u].time - (now - this.time)
                    }
                }
            }
            if (!found) {
                this.users.push({ id: user, time: now })
                return {
                    pass: true,
                    restTime: null
                }
            }
        }
    }