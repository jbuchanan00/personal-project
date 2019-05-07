const express = require("express")
const massive = require("massive")
require("dotenv").config()
const session = require("express-session")
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env
const authCtrl = require("./controllers/authController")
const acctCtrl = require("./controllers/accountController")
const userCtrl = require("./controllers/userController")

const app = express()

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


app.get("/api/getusers", acctCtrl.getData)
app.get("/info/account", acctCtrl.getAccountBalance)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.post("/auth/createaccount", authCtrl.createAccount)
app.put("/update/balance", acctCtrl.updateBalance)
app.put("/update/adminstatus", userCtrl.changeAdminStatus)
