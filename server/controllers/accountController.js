module.exports = {
    getData: async (req, res) => {
        const db = req.app.get("db")
        
        const users = await db.get_all_data()
        res.status(200).send(users)
    },
    getAccountBalance: async (req, res) => {
        const db = req.app.get("db")
        console.log(1111111111111111, req.session.user)
        const {first_name, last_name, account_number} = req.session.user

        let accountBalance = await db.get_balances({account_number})
        
        

        accountBalance = accountBalance[0]
        let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance


        const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
        auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
        
        res.status(200).send(welcomePage)
    },
    updateBalance: async (req, res) => {
        const db = req.app.get("db")
        const {first_name, last_name, isadmin} = req.session.user
        const {account_type, amount, account_number} = req.body
       
        if(!isadmin){
            return res.status(401).send(`Access Denied`)
        }



        if(account_type === 'savings'){
            let accountBalance = await db.update_savings_balance({account_number, amount})
            accountBalance = accountBalance[0]
            
            let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance
    
            const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
            auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
    
            return res.status(200).send(welcomePage)
            
        }
        if(account_type === 'checkings'){
            let accountBalance = await db.update_checkings_balance({account_number, amount})
            accountBalance = accountBalance[0]
            
            let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance
    
            const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
            auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
    
            return res.status(200).send(welcomePage)
        }

        if(account_type === 'auto_loan'){
            let accountBalance = await db.update_auto_balance({account_number, amount})
            accountBalance = accountBalance[0]
            
            let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance
    
            const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
            auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
    
            return res.status(200).send(welcomePage)
        }

        if(account_type === 'personal_loan'){
            let accountBalance = await db.update_personal_balance({account_number, amount})
            accountBalance = accountBalance[0]
            
            let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance
    
            const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
            auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
    
            return res.status(200).send(welcomePage)
        }

        if(account_type === 'credit_card'){
            let accountBalance = await db.update_cc_balance({account_number, amount})
            accountBalance = accountBalance[0]
            
            let {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = accountBalance
    
            const welcomePage = `Welcome ${first_name} ${last_name}.  Your balances are savings: $${savings_balance} checking: $${checkings_balance}
            auto loan: $${auto_loan_balance} personal loan: $${personal_loan_balance} credit card: $${credit_card_balance}`
    
            return res.status(200).send(welcomePage)
        }
    }
}