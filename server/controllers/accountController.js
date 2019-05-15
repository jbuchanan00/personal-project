module.exports = {
    getAccountBalance: async (req, res) => {
        const db = req.app.get("db")
        const {account_number} = req.session.user

        let accountBalance = await db.get_balances({account_number})
        accountBalance = accountBalance[0]
        res.status(200).send(accountBalance)
    },
    changeAccountBalance: async (req, res) => {
        //want to use account number to update balance
        //get the account type, db is split between them
        //only send status back

        const db = req.app.get("db")

        let {account_type, account_number, amount} = req.body
        console.log(account_number, account_type, amount)
        
        let beginningBalance = await db.get_balances({account_number})
        let {savings_balance, checkings_balance, credit_card_balance, auto_loan_balance, personal_loan_balance} = beginningBalance[0]
        if(account_type === "checkings"){ checkings_balance += +amount
        await db.update_checkings_balance({account_number, checkings_balance})
        }
        if(account_type === "savings"){savings_balance += +amount
        await db.update_savings_balance({account_number, savings_balance})
        }
        if(account_type === "credit_card"){credit_card_balance += +amount
        await db.update_cc_balance({account_number, credit_card_balance})
        }
        if(account_type === "auto_loan"){auto_loan_balance += +amount
        await db.update_auto_balance({account_number, auto_loan_balance})
        }
        if(account_type === "personal_loan"){personal_loan_balance += +amount
        await db.update_personal_balance({account_number, personal_loan_balance})
        }


        res.status(200).send(`Was completed succesfully`)
    },
    withdrawFromAccount: async (req, res) => {
        //want to use account number to update balance
        //get the account type, db is split between them
        //only send status back

        const db = req.app.get("db")

        let {account_type, account_number, amount} = req.body
        console.log(account_number, account_type, amount)
        
        let beginningBalance = await db.get_balances({account_number})
        let {savings_balance, checkings_balance, credit_card_balance, auto_loan_balance, personal_loan_balance} = beginningBalance[0]
        if(account_type === "checkings"){ checkings_balance -= +amount
        await db.update_checkings_balance({account_number, checkings_balance})
        }
        if(account_type === "savings"){savings_balance -= +amount
        await db.update_savings_balance({account_number, savings_balance})
        }
        if(account_type === "credit_card"){credit_card_balance -= +amount
        await db.update_cc_balance({account_number, credit_card_balance})
        }
        if(account_type === "auto_loan"){auto_loan_balance -= +amount
        await db.update_auto_balance({account_number, auto_loan_balance})
        }
        if(account_type === "personal_loan"){personal_loan_balance -= +amount
        await db.update_personal_balance({account_number, personal_loan_balance})
        }


        res.status(200).send(`Was completed succesfully`)
    },
    getUserInfo: async (req, res) => {
        const db = req.app.get("db")

        let {account_number} = req.body
        let results = await db.get_details_by_account({account_number})
        res.status(200).send(results[0])
    }
}