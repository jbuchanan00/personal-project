module.exports = {
    changeAdminStatus: async (req, res) => {
        //making sure there is a current user.
        //making sure user has proper credentials
        //changing the admin status by using the ssn, sending the new admin value.
        //sending back if status
        const db = req.app.get("db")
        
        if(!req.session.user){
            return res.status(401).send(`Sign In First`)
        }
        
        const {isadmin} = req.session.user
        if(!isadmin){
            return res.status(401).send(`Denied Access`)
        }
        
        const {ssn, assigningIsAdmin} = req.body
        
        await db.update_isAdmin({ssn, assigningIsAdmin})
        
        
        res.status(200).send(`Admin status has been changed`)
    },
    deleteAccount: async (req, res) => {
        //making sure there is a current user.
        //making sure user has proper credentials
        //using email to remove login information only
        //Only login info has been removed.
        const db = req.app.get("db")
        
        if(!req.session.user) {
            return res.status(401).send(`Sign In First`)
        }
        
        const {isadmin} = req.session.user
        if(!isadmin){
            return res.status(401).send(`Denied Access`)
        }
        const {email, account_number} = req.params
        await db.delete_userAuth({email})
        await db.zero_out_account({account_number})
        res.status(200).send(`Account has been closed`)
    },
    tellerAccount: async (req, res) => {
        //making sure there is a current user
        //making sure user has proper credentials
        //finding account info by the account number inputed
        const db = req.app.get("db")
        
        if(!req.session.user) {
            return res.status(401).send(`Sign In First`)
        }
        
        const {isadmin} = req.session.user
        if(!isadmin){
            return res.status(401).send(`Denied Access`)
        }
        
        const {account_number} = req.body
        const secretInfo = await db.get_secret_info({account_number})

        res.status(200).send(secretInfo)
    },
    updateUserInfo: async (req, res) => {
        const db = req.app.get("db")

        const {account_number, username} = req.session.user
        const {phone_number, email, city, state, street, zip} = req.body

        await db.update_user_info({account_number, username, phone_number, email, city, state, street, zip})

        let user = await db.get_user_by_username({username, email})
        user = user[0]
        
        delete user.password
        delete user.birthday
        delete user.ssn

        req.session.user = user

        res.status(200).send(req.session.user)
    },
    updateUserInfoAdmin: async (req, res) => {
        const db = req.app.get("db")

        const {username, first_name, last_name, phone_number, email, city, state, street, zip, isadmin} = req.body

        let user = await db.update_user_info_admin({username, first_name, last_name, phone_number, email, city, state, street, zip, isadmin})
        user = user[0]

        res.status(200).send(user)
    }
    
}