let loanApps = []
let startingNumber = 10

module.exports = {
    submitLoanApp: async (req, res) => {
        const db = req.app.get("db")
        let {type_of_loan, amount, term_length, employer, work_title, income} = req.body
        let {username} = req.session.user
        let loan_number = startingNumber++
        let loan_amount = amount
        let loan_type = type_of_loan

        let submitted = await db.request_loan({loan_type, loan_amount, term_length, employer, work_title, income, username, loan_number})

        if(!submitted){
            return res.sendStatus(404)
        }

        res.status(200).send(`successfully submitted`)
    }
}