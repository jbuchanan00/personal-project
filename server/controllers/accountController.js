module.exports = {
    getData: async (req, res) => {
        const db = req.app.get("db")
        const users = await db.get_user_details({email: req.session.user.email})
        res.status(200).send(users)
    },
    getAccountBalance: async (req, res) => {
        const db = req.app.get("db")
        const {first_name, last_name, email, phone_number, street, city, zip, 
            isAdmin, user_info_id, state, username, account_number} = req.session.user

        const accountBalance = await db.get_balances({account_number})
        
        console.log(accountBalance)

        const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are ${accountBalance}`
        
        res.status(200).send(welcomePage)
    }
}