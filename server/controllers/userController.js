module.exports = {
    changeAdminStatus: async (req, res) => {
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
        
        //working on being able to update admin status.  not getting response.
        res.status(200).send(`Admin status has been changed`)
    }
}