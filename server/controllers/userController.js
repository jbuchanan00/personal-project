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
        
        const {email} = req.params
        await db.delete_userAuth({email})
        
        
        
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
    }
}