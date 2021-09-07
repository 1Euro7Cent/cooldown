module.exports =
    class Cooldown {
        /**
         * @param {number} time amount of cooldown in ms
         */
        constructor(time) {
            this.time = time;
            this.users = []
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
                if (this.users[u].id === user) {
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