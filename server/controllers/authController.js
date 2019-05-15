const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")


module.exports = {
    createAccount: async (req, res) => {
        //Need to take in several inputs.  First name, last name,
        //email, password, birthday, ssn, phone number, street, city, state, zip
        const db = req.app.get("db")
        const {first_name, last_name, email, password, birthday, ssn, phone_number, street, city,
        state, zip, username} = req.body
        
        const existingAccounts = await db.creating_account_number()
        
        const account_number = `10${existingAccounts[0].count}`
        console.log(111111111111, account_number)

        const existingUser = await db.get_user_by_email({email})
        if(existingUser[0]){
            return res.status(409).send(`Email already in use`)
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let response = await db.create_user({username, first_name, last_name, email, hash, birthday, ssn, phone_number, street, city,
        state, zip, account_number})

        const newUser = response[0]
        
        delete newUser.ssn
        delete newUser.birthday
        delete newUser.password 
        

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: "bankapptest1@gmail.com",
                pass: 'utahjazz45'
            }
        })

        let message = {
            from: "bankapptest1@gmail.com",
            to: `${newUser.email}`,
            subject: `Thank you ${newUser.first_name}!`,
            html: `<p>Welcome to La Banque</p><p>Your account number is ${newUser.account_number}</p><p>Your username is ${newUser.username}</p>`
        }

        transporter.sendMail(message, function (err, info) {
            if(err){
                console.log(err)
            }else{
                console.log(info)
            }
        })

        req.session.user = newUser
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get("db")
        const {usernameEmail, password} = req.body
        let username = usernameEmail
        let email = false
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
    },
    sessionKeeper: (req, res) => {
        if(req.session.user){
        res.status(200).send(req.session.user)
        }else{
            res.status(401).send("not logged in")
        }
    }
}