const express = require("express")
const massive = require("massive")
require("dotenv").config()
const session = require("express-session")
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env
const authCtrl = require("./controllers/authController")
const acctCtrl = require("./controllers/accountController")
const userCtrl = require("./controllers/userController")
const loanCtrl = require("./controllers/loanAppController")


const app = express()
// const path = require('path'); // Usually moved to the start of file

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });

massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance)
    console.log(`Database is connected.`)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on ${SERVER_PORT}`)
    })
})
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) );
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.get("/info/account", acctCtrl.getAccountBalance)
app.get("/usersession", authCtrl.sessionKeeper)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.post("/auth/createaccount", authCtrl.createAccount)
app.put("/update/adminstatus", userCtrl.changeAdminStatus)
app.delete("/account/delete/:email/:account_number", userCtrl.deleteAccount)
app.post("/account/teller", userCtrl.tellerAccount)
app.put("/update/balance", acctCtrl.changeAccountBalance)
app.put("/update/withdrawal", acctCtrl.withdrawFromAccount)
app.post("/teller/updateinfo", acctCtrl.getUserInfo)
app.put("/account/update", userCtrl.updateUserInfo)
app.put("/teller/updateinfoteller", userCtrl.updateUserInfoAdmin)
app.post("/apply/loansubmit", loanCtrl.submitLoanApp)
