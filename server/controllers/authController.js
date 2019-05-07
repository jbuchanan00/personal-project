const bcrypt = require("bcryptjs")


module.exports = {
    createAccount: async (req, res) => {
        //Need to take in several inputs.  First name, last name,
        //email, password, birthday, ssn, phone number, street, city, state, zip
        const db = req.app.get("db")
        const {first_name, last_name, email, password, birthday, ssn, phone_number, street, city,
        state, zip, account_number, username} = req.body
        
        const existingUser = await db.get_user_by_email({email})
        if(existingUser[0]){
            console.log(`email existing`)
            return res.status(409).send(`Email already in use`)
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let response = await db.create_user({username, first_name, last_name, email, hash, birthday, ssn, phone_number, street, city,
        state, zip, account_number})

        const newUser = response[0]
        
        
        req.session.user = newUser
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get("db")
        const {username, email, password} = req.body
        let user;
        if(email){
            user = await db.get_user_by_email({username, email, password})
            user = user[0]
            
            if(!user){
                return res.status(409).send(`Missing email/username or password`)
            }

            let isAuth = bcrypt.compareSync(password, user.password)
            
            if(!isAuth){
                return res.status(403).send(`Email/username or password is incorrect`)
            }
            let authUser = user
    
            delete authUser.ssn
            delete authUser.birthday
            delete authUser.password
            
            req.session.user = authUser
            return res.status(200).send(req.session.user)
        }
        
        if(!email && username){
            user = await db.get_user_by_username({username, email, password})
            user = user[0]
            
            
            if(!user){
                return res.status(409).send(`Missing email/username or password`)
            }
            let isAuth = bcrypt.compareSync(password, user.password)
            
            if(!isAuth){
                return res.status(403).send(`Email/username or password is incorrect`)
            }
            let authUser = user
    
            delete authUser.ssn
            delete authUser.birthday
            delete authUser.password
            
            req.session.user = authUser
            return res.status(200).send(req.session.user)
        }

    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}